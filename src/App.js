
import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { Home } from './container/Home';
import { Signin } from './container/Signin';
import { Signup } from './container/SignUp';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isLoggedIn } from './Actions'; 
import { useDispatch, useSelector } from 'react-redux';
import { Products } from './container/Products/index';
import { Orders } from './container/Orders/index';
import {Category} from './container/Category'
//import { getAllCategory } from './Actions/categoryAction'
import { getAllData } from './Actions/getAllData.Action';





//mport 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  const dispatch = useDispatch()
  const auth =useSelector(state => state.auth)

  useEffect(()=>{
      if(!auth.authenticate){
      dispatch(isLoggedIn())
      }
     dispatch(getAllData())
     //dispatch(getAllCategory())
  }, [])

//console.log(isLoggedIn)
  return (
    <div className="App">
  
  
    <Switch>
    <PrivateRoute  path='/'  exact component={Home} />
    <PrivateRoute  path='/products' component={Products} />
    <PrivateRoute  path='/category'  component={Category} />
    <PrivateRoute  path='/orders'  component={Orders} />
    
    <Route path='/signin' component={Signin} />
    <Route path='/signup' component={Signup} />
   
    </Switch>
   
    
    </div>
  );
}

export default App;
