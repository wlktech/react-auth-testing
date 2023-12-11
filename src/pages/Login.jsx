import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleLogin = (e) =>{
        e.preventDefault();
        const loginData = {
            email: email,
            password: password
        };
        
        fetch('https://delightapi.ruby2d3dslotgame.monster/api/auth/login', {
            method: 'POST',
            headers: {
              'Accept' : "application/json",
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        }).then(response => {
            if (!response.ok) {
              throw new Error('Login failed');
            }
            return response.json();
          })
          .then(data => {
            console.log('Login successful:', data);
            setData(data);
            if (data.token) {
              localStorage.setItem('token', data.token); // Save token to localStorage
              alert("Logged In Successfully.");
              navigate('/blogs');
            } else {
              throw new Error('Token not found in response');
            }
          })
          .catch(error => {
            console.error('Login error:', error);
          });
    }

  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-md-6 mx-auto">
                <div className="card p-3 shadow mt-5">
                    <h4 className='text-center'>LOGIN</h4>
                    {/* <p>{ email }</p> */}
                    {/* <p>{ password }</p> */}
                    {/* <p>{ data.token }</p> */}
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Email</label>
                            <input type="email" name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Password</label>
                            <input type="password" name='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' className="form-control" />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-outline-dark" type='reset'>RESET</button>
                            <button className="btn btn-dark ms-3" type='submit'>LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login