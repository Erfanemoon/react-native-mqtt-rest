import React from 'react';
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card'
import './UsersList.css';

const UsersList = props => {

    if (props.items.length === 0) {
        return (
            <div className='center'>
                <Card>
                    <h2> no user data was found !!!!</h2>
                </Card>
            </div>);
    }

    return (<ul className='users-list'>
        {props.items.map(user => (
            <UserItem
                key={user.id}
                userId={user.id}
                beaconId={user.beaconId}
                name={user.name}
                //image={user.image}
                floor={user.floor}
                onDelete={props.onDeleteUser}
            />
        ))}
    </ul>);
}

export default UsersList;