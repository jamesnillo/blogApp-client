import AppNavBar from './components/AppNavBar';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout'
import Blog from './pages/Blog';
import CreatePost from './pages/CreatePost';
import MyPost from './pages/MyPost';
import AllPost from './pages/AllPost';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';

import { useState, useEffect } from 'react';

function App() {

    const [user, setUser] = useState({
      id: null,
      isAdmin: null
    })

    function unsetUser(){
      localStorage.clear();
    }

    useEffect(()=> {
      if(localStorage.getItem('token')){
          fetch('https://blogapp-server-fbcq.onrender.com/users/details', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => response.json())
          .then(data => {
            if(data.user._id === undefined){
              setUser({
                id: null,
                isAdmin: null
              })
            } else {
              setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
              })
            }
          })
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }
    },[])

    return (

        <>
          <UserProvider value = {{user, setUser, unsetUser}}>
              <Router>
                <AppNavBar/>
                <Container>
                  <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/logout" element={<Logout/>} />
                    <Route path="/blogs" element={<Blog/>} />
                    <Route path="/createPost" element={<CreatePost/>} />
                    <Route path="/myPost" element={<MyPost/>} />
                    <Route path="/allPosts" element={<AllPost/>} />
                  </Routes>
                </Container>
              </Router>
          </UserProvider>
        </>

      )
}

export default App;
