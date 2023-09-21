import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import NavBar from "../public/NavBar";
import { database } from '../firebase';





const Dashboard = () => {
    const user = auth.currentUser;
    const [selectedMode, setSelectedMode] = useState('data'); // Default mode is 'data'
    const [isOn, setIsOn] = useState(false); // Initial state for On/Off button
    const [timerValue, setTimerValue] = useState(0);  //managing the timer value

   
   
    //Function for start timer and update database

    const startTimer = ()=> {
        setIsOn(true);

    }

    useEffect (()=> {
        let intervalId;

        if (selectedMode === 'control' && isOn){

            intervalId = setInterval(()=> {
                setTimerValue ((prevValue) => prevValue + 1);
            }, 1000);
        } else {
            clearInterval (intervalId);
        }

        return () => clearInterval(intervalId);

    }, [selectedMode, isOn ])
       

    // Function to toggle the state of the On/Off button
    const toggleOnOff = () => {
        setIsOn(!isOn);

        if (selectedMode === 'control') {
            if(isOn) {
                setTimerValue(0);
                database.ref('timer' ).set(timerValue); 
            } else {
                startTimer();
            }

          }
           
        };
    

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        <p>
                            Welcome <em className="text-decoration-underline">{user.email}</em>. Follow the dashboard to track and monitor your hoists with ease. We're here to make your hosting operations more efficient and convenient.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row content">
                    <div className="col-sm-3 sidenav">
                        <div className="list-group ">
                            <a
                                href="#section2"
                                className={`list-group-item ${selectedMode === 'data' ? 'active' : ''}`}
                                onClick={() => setSelectedMode('data')}
                            >
                                Data Retrieval Mode
                            </a>
                            <a
                                href="#section3"
                                className={`list-group-item ${selectedMode === 'control' ? 'active' : ''}`}
                                onClick={() => setSelectedMode('control')}
                            >
                                Remote Control Mode
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        {selectedMode === 'data' && (
                            <div>
                                {/* Content for Data Retrieval Mode */}
                                <h4><small>Content for Data Retrieval Mode</small></h4>
                            </div>
                        )}
                        {selectedMode === 'control' && (
                            <div>
                                <p> Timer Value : {timerValue}</p>
                                <h4><small>Content for Remote Control Mode</small></h4>
                                <button
                                    className={`btn ${isOn ? 'btn-danger' : 'btn-success'}`}
                                    onClick={toggleOnOff}
                                >
                                    {isOn ? 'Off' : 'On'}
                                </button>
                                <button className="btn btn-warning"> Reset</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;