import React, { useContext } from 'react';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UserItem.css'

const Useritem = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    let auth = useContext(AuthContext);

    const confirmDeleteHandler = async () => {
        try {
            await sendRequest(
                `http://localhost:5000/api/users/delete/${props.userId}`,
                'GET'
            );
            props.onDelete(props.id);
        } catch (err) { }
    };
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <li className='user-item'>
                <Card className='user-item__content'>
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className='user-item__image'>
                        <Avatar image={props.image} alt={props.name} />
                    </div>
                    <div className='user-item__info'>
                        <h2>name : {props.name}</h2>
                        <h2>beacon id : {props.beaconId}</h2>
                        <h2>floor : {props.floor}</h2>
                    </div>
                    <div className='user-item__action'>
                        {auth.isLoggedIn && (
                            <Button to={`/users/${props.userId}`}>Edit</Button>
                        )}

                        {auth.isLoggedIn && (
                            <Button danger onClick={confirmDeleteHandler}>Delete</Button>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
}

export default Useritem;