import React from 'react';
import Card from '../../../shared/components/UIElements/Card';
import { Bar } from 'react-chartjs-2';

const BeaconsData = props => {

    if (props.items === null) {
        return (
            <Card>
                <h2>you should search by time for result and fetch data first</h2>
            </Card>
        )
    }

    const ChartData = {
        labels: props.items.beacon_keys,
        datasets: [
            {
                label: 'ratio-of-existance',
                data: props.items.beacon_values,
                backgroundColor: [
                    'rgba(153,102,255,0.6)',
                    'rgba(54,162,235,0.6)',
                    'rgba(255,206,86,0.6)',
                    'rgba(75,192,192,0.6)',
                    'rgba(255,159,64,0.6)',
                    'rgba(255,99,132,0.6)'
                ]
            }
        ]
    };

    return (
        //TODO check it here for class name 
        <div className='beacons'>
            <Bar
                data={ChartData} width="900" height="150"

                options={{
                    title: {
                        display: true,
                        text: 'Beacons Usage in floor1',
                        fontSize: 25
                    },
                    legend: {
                        display: true,
                        position: "right",
                        labels: { fontColor: '#000' }
                    },
                    layout: {
                        padding: {
                            left: 50,
                            right: 0,
                            bottom: 0,
                            top: 0
                        }
                    },
                    tooltips: { enabled: true },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        </div>
    );
}

export default BeaconsData;
