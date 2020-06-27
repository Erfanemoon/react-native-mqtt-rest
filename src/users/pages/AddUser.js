import React, { useReducer, useCallback, useContext } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UserForm.css';

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

const NewUser = () => {

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            name: {
                value: '',
                isValid: false
            },
            beaconId: {
                value: '',
                isValid: false
            },
            floor: {
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
            await sendRequest(
                'http://localhost:5000/api/users/signup',
                'POST',
                JSON.stringify({
                    name: formState.inputs.name.value,
                    beaconId: formState.inputs.beaconId.value,
                    floor: formState.inputs.floor.value,
                }),
                { 'Content-Type': 'application/json' }
            );
            //history.push('/');
        } catch (err) { }
    };


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className='user-form' onSubmit={submitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input id='name'
                    element='input'
                    type='text'
                    label='username'
                    errorText='please enter name for user'
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]} />
                <Input
                    id='beaconId'
                    element='input'
                    type='text'
                    label='beacon_ID'
                    errorText='please enter beacon ID for user'
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]} />
                <Input id='floor'
                    element='input'
                    type='text'
                    label='floor'
                    errorText='please enter which floor user works in'
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]} />
                <Button type='submit' disabled={!formState.isValid}>ADD USER</Button>
            </form>
        </React.Fragment>
    )
}

export default NewUser;