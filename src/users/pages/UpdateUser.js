import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import './UserForm.css';


const DummyUsers = [
    {
        id: 'user_1',
        beacon_id: 'beacon_1',
        name: 'john week',
        image: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        floor: 1
    },
    {
        id: 'user_2',
        beacon_id: 'beacon_2',
        name: 'john marston',
        image: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        floor: 1
    }
];

const UpdateUser = () => {
    const [isLoading, setIsLoading] = useState(true);
    const userId = useParams().userId;

    const [formState, inputHandler, setFormData] = useForm(
        {
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
        }, false);

    let identifiedUser = DummyUsers.find(user => user.id === userId);

    useEffect(() => {
        if (identifiedUser) {
            setFormData(
                {
                    name: {
                        value: identifiedUser.name,
                        isValid: true
                    },
                    beaconId: {
                        value: identifiedUser.beaconId,
                        isValid: true
                    },
                    floor: {
                        value: identifiedUser.floor,
                        isValid: true
                    }
                }
            );
        }
        setIsLoading(false);
    }, [setFormData, identifiedUser]);



    if (!identifiedUser) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find user!</h2>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        );
    }

    const userUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (<form className='user-form' onSubmit={userUpdateSubmitHandler}>
        <Input
            id='name'
            element='input'
            type='text'
            label='name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='please enter the name'
            onInput={inputHandler}
            initialValue={formState.inputs.name.value}
            initialValid={formState.inputs.name.isValid} />

        <Input
            id='beaconId'
            element='input'
            type='text'
            label='beacon_ID'
            errorText='please enter the valid beacon_ID'
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            initialValue={formState.inputs.name.value}
            initialValid={formState.inputs.name.isValid} />
        <Input
            id='floor'
            element='input'
            type='text'
            label='floor'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='please enter which floor user works'
            onInput={inputHandler}
            initialValue={formState.inputs.floor.value}
            initialValid={formState.inputs.floor.isValid} />
        <Button type='submit' disabled={!formState.isValid}>Update User</Button>
    </form>);

};

export default UpdateUser;