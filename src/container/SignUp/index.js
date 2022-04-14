import React,{ useState}from 'react'
import { Container,Form,Row,Col,Button } from 'react-bootstrap'
import Layout from '../../components/Layout'
import { Input } from '../../components/UI/input'
import { useDispatch,useSelector  } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from './../../Actions/user.action';




export const Signup = (props) => {

  const dispatch = useDispatch()
  const auth = useSelector(state =>state.auth)
  const user = useSelector(state =>state.user)

  const [firstname,setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEamil] = useState('')
  const [password,setPassword] = useState('')
  const [error, setError] = useState('')
 

  

 const userSignup=(e)=>{
     e.preventDefault()
     const user={
       firstname,
       lastname,
         email,
         password
     }
    dispatch(signup(user)) 
    
 }
 
if(auth.authenticate){
  return <Redirect to={'/'} />
}
if(user.loading){
  <p>loading......</p>
}
    return (
      <Layout>
      <Container>
    {user.message}
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    value={firstname}
                    type="text"
                    onChange ={(e)=> setFirstname(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    value={lastname}
                    type="text"
                    onChange={(e)=> setLastname(e.target.value)}
                  />
                </Col>
              </Row>

              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="email"
                 onChange={(e)=> setEamil(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
               onChange={(e)=> setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
    )
}
