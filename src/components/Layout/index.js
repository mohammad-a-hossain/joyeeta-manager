/* import React from 'react'
import { Header } from '../Header/index';
import {Row,Col,NavLink, Container } from 'react-bootstrap';




const Index = (props) => {
    return(
      <>
         <Header />
         {
           props.sidebar ?
           <Container fluid>
            <Row>
              <Col md={2} className="sidebar">
              <ul>
              <li>
              <NavLink to={`/`}>Home</NavLink>
            </li>
              <li>
               <NavLink to={`/Products`}>Products</NavLink>
                </li>
                <li>
                <NavLink to={`/Category`}>Category</NavLink>
                 </li>
                <li>
                <NavLink to={`/orders`}>Orders</NavLink>
                </li>
           
              </ul>
              </Col>
              <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
                {props.children}
              </Col>
            </Row>
          </Container>
          :
          props.children
         }
          
          
      </>
     )
  
   }
  
  export default Index; */

  import React from 'react'
import { Header } from './../Header/index';
import { Row,Container, Col} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';





const Layout = (props) => {
  return(
    <>
       <Header />
       {
         props.sidebar ?
         <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
            <ul>
            <li>
            <NavLink to={`/`}>home</NavLink>
          </li>
            <li>
             <NavLink to={`/products`}>products</NavLink>
              </li>
              <li>
              <NavLink to={`/category`}>Category</NavLink>
               </li>
              <li>
              <NavLink to={`/orders`}>orders</NavLink>
              </li>
         
            </ul>
            </Col>
            <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
              {props.children}
            </Col>
          </Row>
        </Container>
        :
        props.children
       }
        
        
    </>
   )

 }

export default Layout;
