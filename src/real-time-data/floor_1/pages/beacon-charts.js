import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner'
import Button from '../../../shared/components/FormElements/Button';
import Input from '../../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../../shared/utils/validators';
import BeaconsData from '../components/beaconsData';
import Card from '../../../shared/components/UIElements/Card';
import './dateForm.css';


const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
}

const BeaconCharts = () => {

    const [loadedBeacons, setLoadedBeacons] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            entertime: {
                value: '',
                isValid: false
            },
            exittime: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        });
    }, [dispatch]);

    const submitHandler = async event => {
        event.preventDefault();
        try {
            const responseData = await sendRequest('http://localhost:5000/api/sensors/data', 'POST',
                JSON.stringify({
                    entertime: formState.inputs.entertime.value,
                    exittime: formState.inputs.exittime.value
                }),
                { 'Content-Type': 'application/json' }
            );

            //TODO: check server response here 
            setLoadedBeacons(responseData);
        } catch (err) { }
    };



    return (
        <React.Fragment>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            <Card>
                <form className='date-form' onSubmit={submitHandler}>
                    <Input
                        id='entertime'
                        element='input'
                        type='text'
                        label='enter_time'
                        errorText='please enter begin date'
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                    />
                    <Input
                        id='exittime'
                        element='input'
                        type='text'
                        label='exit_time'
                        onInput={inputHandler}
                        errorText='please enter end date'
                        validators={[VALIDATOR_REQUIRE()]}
                    />
                    <Button type='submit' disabled={!formState.isValid}>Get BeaconData</Button>
                </form>
            </Card>
            {loadedBeacons &&
                <BeaconsData items={loadedBeacons} />}

        </React.Fragment>
    );
};




export default BeaconCharts;