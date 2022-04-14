import React from 'react'
import {Navbar,Container,Nav} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {signout} from './../../Actions/Auth.Action'


export const Header = (props) => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const logout =()=>{
    dispatch(signout())
  }
        
 
      const loggedInComp = ()=>{
        return(
          <Nav>
          <li className="nav-item">
          <NavLink className='nav-link' to="/signup">
            signup
          </NavLink>
          </li>
            <li className="nav-item">
            <NavLink className='nav-link' to="/signin">
              signin
            </NavLink>
            </li>
            
          </Nav>
        )
      }
      const notLoggedInComp =()=>{
        return(
          <Nav>
            <li className="nav-item">
            <span className='nav-link' style={{cursor:"pointer"}} onClick={logout}>
              signout
            </span>
            </li>
            
          </Nav>
        )
      }

    return (
        <div>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" style={{zIndex: 1}}>
        <Container fluid>
      
        <NavLink className='navbar-brand' to='/'>
       Joyeeta Dashboard
        </NavLink>
       
      
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          {  /* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    </NavDropdown> */ }
          </Nav>
         {auth.authenticate ? notLoggedInComp(): loggedInComp() }

        </Navbar.Collapse>
        </Container>
      </Navbar>
            
        </div>
    )
}
