import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import { Notyf } from 'notyf';

import UserContext from '../UserContext';

export default function Login() {

    const notyf = new Notyf();

    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(true);


    function authenticate(e) {

        e.preventDefault();
        fetch('https://blogapp-server-fbcq.onrender.com/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                email: email,
                password: password

            })
        })
        .then(res => res.json())
        .then(data => {

            if(data.access){

                localStorage.setItem('token', data.access);

                retrieveUserDetails(data.access)

                setEmail('');
                setPassword('');

                notyf.success(`Successful Login`);
            
            } else if (data.message === "Email and password do not match") {

                notyf.error(`Incorrect credentials. Try again`);

            } else {

                notyf.error(`${email} does not exist`);
            }

        })

    }

    function retrieveUserDetails(token){
        fetch('https://blogapp-server-fbcq.onrender.com/users/details', 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            )
        .then(response => response.json())
        .then(data => {

            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            })
        })
    }

    useEffect(() => {
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    return ( 

        (localStorage.getItem("token") !== null)?
            <Navigate to='/blogs'/>
            :    
            <Form onSubmit={(e) => authenticate(e)}>
                <h1 className="my-5 text-center">Login</h1>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                { isActive ? 
                    <Button variant="primary" type="submit" id="loginBtn">
                        Login
                    </Button>
                    : 
                    <Button variant="danger" type="submit" id="loginBtn" disabled>
                        Login
                    </Button>
                }
            </Form>       
    )
}