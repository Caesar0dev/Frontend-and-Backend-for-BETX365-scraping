// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [realtimedata, setRealtimedata] = useState('This is Real time data.');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      console.log(response.data); // Token will be returned here
      // const resData = JSON.parse(response.data);
      const uname = response.data.data;
      document.getElementById("responseData").innerHTML = uname;
      // You can save the token in local storage or a cookie for authentication purposes
    } catch (error) {
      console.error(error);
    }
  };
  const realtimeFunc = async (e) => {
    try {
      const response = axios.post('http://localhost:5000/skydata');
      console.log(response);
      setRealtimedata(response.data);
      document.getElementById("realtimeData").innerHTML = realtimedata;
      
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    realtimeFunc()
  }, [])
  //   fetch('http://localhost:5000/skydata', {method:"POST"})
  //     .then((response) => response)
  //     .then((data) => {
  //       // Handle the retrieved data
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       // Handle any errors that occurred during the request
  //       console.error(error);
  //     });

  return (
    <div>
      <h1>Login</h1>
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
      <p id='responseData'>Hello world!</p>
      <p id='realtimeData'>Hello world!</p>
      
    </div>
  );
}

export default App;