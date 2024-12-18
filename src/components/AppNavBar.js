import { useState, useEffect, useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import UserContext from '../UserContext';

export default function AppNavBar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-primary" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Zuitt Blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/blogs" exact="true">Blogs</Nav.Link>
            {user && user.id !== null ? (
              user.isAdmin ? (
                <>
                  <Nav.Link as={NavLink} to="/createPost">Create Post</Nav.Link>
                  <Nav.Link as={NavLink} to="/myPost" exact="true">My Post</Nav.Link>
                  <Nav.Link as={NavLink} to="/allPosts" exact="true">All Posts</Nav.Link>
                  <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/createPost">Create Post</Nav.Link>
                  <Nav.Link as={NavLink} to="/myPost" exact="true">My Post</Nav.Link>
                  <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                </>
              )
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
