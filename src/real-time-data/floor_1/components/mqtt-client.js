import React, { useState, useEffect, Fragment } from 'react';
import mqtt from 'mqtt';
import Card from '../../../shared/components/UIElements/Card';
import './mqtt-client.css';

const Client = () => {

    const options = {
        port: 8089
    }
    let [msg, setMsg] = useState(<Fragment><em>nothing heard</em></Fragment>)
    let [note, setNote] = useState({
        status: '',
        beaconIds: []
    });

    useEffect(() => {

        let subscriber = mqtt.connect('mqtt://localhost', options);
        subscriber.subscribe('/floors/1/');
        subscriber.on('message', (topic, message) => {
            //setNote(null);
            note = message.toString();
            setMsg(note);
            note = JSON.parse(note);
            setNote(note);
            console.log(note.beaconIds);
            //subscriber.end();
        });
    }, []);



    return (
        <div className="client-list center">
            <p>arrived data : {msg}</p>
            <Card>
                <header className="App-header">
                    <p> status : exist</p>
                    {note.status === 'exist' && (
                        <p>Beacon IDs: {note.beaconIds}</p>
                    )}
                </header>
            </Card>
            <Card>
                <header className="App-header">
                    <p> status : exit</p>
                    {note.status === 'exit' && (
                        <p>Beacon IDs: {note.beaconIds}</p>
                    )}
                </header>
            </Card>
        </div>
    );

}

export default Client;