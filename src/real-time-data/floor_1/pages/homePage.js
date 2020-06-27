import React from 'react';
import Client from '../components/mqtt-client';
import Card from '../../../shared/components/UIElements/Card';

const BeaconData = () => {


    return (
        <ul className="beacons-list center">
            <h2>floor 1</h2>
            <Card>
                <Client />
            </Card>
        </ul>

    );

};

export default BeaconData;