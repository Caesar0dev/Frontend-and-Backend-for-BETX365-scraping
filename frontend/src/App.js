import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import axios from 'axios';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cricketrealtimedata, setCricketRealtimedata] = useState('This is Real-time data.');
  const [soccerrealtimedata, setSoccerRealtimedata] = useState('This is Real-time data.');
  const [tennisrealtimedata, setTennisRealtimedata] = useState('This is Real-time data.');
  
  let showCricket = "";
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      console.log(response.data.data);
      document.getElementById("responseData").innerHTML = response.data.data;
      // You can save the username in local storage or a cookie for authentication purposes
    } catch (error) {
      console.error(error);
    }
  };

  const [isConnected, setIsConnected] = useState(socket.connected);
  

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Initial request for real-time data
    socket.emit("get-skydata");

    // Set up a timer to send real-time data requests every 5 seconds
    const timerId = setInterval(() => {
      socket.emit("get-skydata");
    }, 5000);

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timerId);
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.on("cricket-receive-data", (data) => {
        console.log("data >>> ", data);
        // Handle the received data
        // console.log("received data >>> ", data);
        // const stringData = [];
        // for (const obj of data['name']) {
        //   stringData.push(JSON.stringify(obj));
        // }

        showCricket = showCricket + JSON.stringify(data) +"\n";
        setCricketRealtimedata(showCricket);
        // Update UI or perform other actions based on the data
      });
      socket.on("soccer-receive-data", (data) => {
        // Handle the received data
        setSoccerRealtimedata(JSON.stringify(data))
        // Update UI or perform other actions based on the data
      });
      socket.on("tennis-receive-data", (data) => {
        // Handle the received data
        setTennisRealtimedata(JSON.stringify(data))
        // Update UI or perform other actions based on the data
      });
    };
  }, []);

  return (
    <div className="App">
      {/* <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p id='responseData'>Hello world!</p> */}
      
      <h1>Cricket Real-time Data:</h1>
      <p id='cricketrealtimeData'>{cricketrealtimedata}</p>
      <h1>Soccer Real-time Data:</h1>
      <p id='soccerrealtimeData'>{soccerrealtimedata}</p>
      <h1>Tennis Real-time Data:</h1>
      <p id='tennisrealtimeData'>{tennisrealtimedata}</p>
    </div>
  );
}
