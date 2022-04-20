# Getting Started with Create React App
# yarn start ****************************************

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# yarn create-react-app cmd line
- yarn add react-router-dom v-5.2
- port set 4000 in start of package.json
- npm install react-bootstrap bootstrap@5.1.3
- using https://fonts.google.com/ (<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet">)
- clone for getting error
*** error DOM IS NOT CONTAINER ***
- CHANGED IN INDEX.JS IN SRC after provider <> i used , before root 
- install axios for api call centralized api

## work flow of  category edit
* for edit category use library for edit category REACT-CHECKBOX-TREE for frontend view
* install-  yarn add react-checkbox-tree
* for icon installed => yarn add react-icons and (use ionicicon)
* use iconick icon in=> import { IconName } from "react-icons/io5";

------------------------------------#
# work process of error handling in add category and sign token for middlewere
- adding try catch in add category for handling 500 error , wrapping try catch all api
- in axios errro handling 500 internal server error if jwt expired then catch the error and redirect to login page
- if existing token get expired then it will redirect to login page
use interceptors in axios