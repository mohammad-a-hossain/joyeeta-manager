import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout';
import { Row, Col, Button, Modal, Container} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../Actions/categoryAction';
import { Input } from './../../components/UI/input/index';
//import { getAllCategory } from '../../Actions/categoryAction';

export const Category = (props) => {

const category = useSelector(state => state.category)
  
 console.log(category)
   const [categoryName, setCategoryName] = useState('')
   const [categoryParentId, setCategoryParentId] = useState('')
   const [ categoryImage, setCategoryImage] = useState('')
    const [show, setShow] = useState(false);
   const dispatch = useDispatch()
    

  // useEffect(()=>{
  //       dispatch(getAllCategory())
  //   },[])

    const handleAdd= () => setShow(true);
    
    const handleShow= () => setShow(true);



     const handleClose  = () =>{
    const form = new FormData()
          form.append('name',categoryName)
          form.append('parentId',categoryParentId)
          form.append('categoryImage',categoryImage)
          dispatch(addCategory(form))
          setCategoryName('')
          setCategoryParentId('')

             
    setShow(false)
  } 
    
  const renderCategory = (categories) =>{
    let Mycategories =[]
    for(let category of categories){
        Mycategories.push( 
      
             <li style={{background:"lightBlue",textColor:'red'}} key={category.name}>

            {category.name}
            {category.children.length >0 ?( <ul style={{background:'pink',textColor:'yellow'}}>{renderCategory(category.children)}</ul> ):null}
            </li>
        )
    }
    return Mycategories
} 
const selectCategoryList =(categories, options=[])=>{
  for(let category of categories){
    options.push({value:category._id, name:category.name})
    if(category.children.length > 0){
      selectCategoryList(category.children,options)
    }
  }
  return options 
}
const handleCategoryImage =(e)=>{
  setCategoryImage(e.target.files[0])
 } 
 return (
  <Layout sidebar>
   <Container>
   <Row>
   <Col md={12}>
   <div style={{display:'flex',justifyContent:'space-around'}}>
        <p>category page</p>
        <Button variant="primary" onClick={handleShow}>
        Add category
      </Button>
   </div>
   
   </Col> 
   </Row>
   <hr/>
   <Row>
   <Col md={12}>
       <ul>
           {renderCategory(category.categories)}
        
       </ul>
   </Col>
   </Row>
   <hr/>
   </Container>
      
   <Modal show={show} onHide={handleClose} animation={false}>
   <Modal.Header closeButton>
     <Modal.Title>Add Category </Modal.Title>
   </Modal.Header>
  
   <Input value={categoryName} placeholder='category name' onChange={(e)=> setCategoryName(e.target.value)} />
   <select className='form-control'
    value={categoryParentId}
    onChange={(e)=>setCategoryParentId(e.target.value)}
   >

   <option>select a category </option>
     {
      selectCategoryList(category.categories).map(option =>
        <option key={option.value} value={option.value}>{option.name}</option>
      )
     }
   </select>
   <input type='file' name={categoryImage} onChange={handleCategoryImage} />
   <Modal.Footer>

     <Button variant="primary" onClick={handleClose}>
       Add 
     </Button>
   </Modal.Footer>
 </Modal>



   
  </Layout>
)
}