import React,{useState} from 'react'
import Layout from '../../components/Layout'
import { Row, Col, Button,Modal, Container,Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../components/UI/input';
import {addProducts} from '../../Actions/productAction'
//import { generatePublicUrl } from '../../apiUrlConfig';
import {generatePublicUrl} from '../../apiUrlConfig'







export const Products = (props) => {//console.log(props)
 
  const [name, setName] = useState('')
  const [quantity,setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [categoryParentId, setCategoryParentId] = useState('')
  const [productPics,setProductPics] = useState('')
  const [show, setShow] = useState(false)
  const category = useSelector((state) => state.category)
  const [productDetails, setProductDetails] = useState(null);
  //console.log(productDetails)
  const [productDetailModal, setProductDetailModal] = useState(false)
  const product = useSelector((state) => state.product)
  console.log(product)
  const dispatch = useDispatch()



  console.log(category,product)
  const handleShow= () => setShow(true);

  const handleClose= () =>{


    const form = new FormData()
          form.append('name',name)
          form.append('price',price) 
          form.append('quantity',quantity)
          form.append('description',description)
          form.append('category',categoryParentId)
          
         for(let pic of productPics ){
           form.append('productPics',pic)
         }

          dispatch(addProducts(form))
  
    setShow(false)
  } 

  const selectCategoryList =(categories, options=[])=>{
    //console.log(category)
    for(let category of categories){
      options.push({value:category._id, name:category.name})
      if(category.children.length > 0){
        selectCategoryList(category.children, options)
      }
    }
    return options 
}
const handleProductImage =(e)=>{

  setProductPics( [...productPics,
     e.target.files[0]])
}
//console.log(productImage)

const renderProducts = ()=>{
  return(
    <div>
    <Table responsive="sm">
      <thead>
        <tr>
         
          <th>name</th>
          <th>price</th>
          <th>quantity</th>
         
          <th>category </th>
          
          <th>Show Details</th>
        </tr>
      </thead>
     
      <tbody>
     
      {
        product.products.map(product =>
          
           <tr key={product._id}>
         
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.quantity}</td>
          
          <td>{product.category.name}</td>
          <td> <button onClick={()=>showProductModalDetails(product)} >Details</button> </td>
          
        </tr>
          ) 
      }
           
       
         
      
     
      
      </tbody>
    </Table>

  </div>
   )
}
 const handleCloseBtnProductDetailModal =()=>{
   setProductDetailModal(false)
}

const showProductModalDetails =(product)=>{
  setProductDetails(product) 
  //console.log(setProductDetails(product) )
  setProductDetailModal(true)
      
}
//modal 4 product details show
const modalForProductDetails =()=>{
  if (!productDetails) {
    return null;
  }
  return(
    <Modal size="lg" show={productDetailModal} onHide={handleCloseBtnProductDetailModal}
    animation={false}
     >
    <Modal.Header closeButton>
      <Modal.Title> Product Details </Modal.Title>
    </Modal.Header>
     <Row>
     <Col md="6">
       <label className="key">Name</label>
       <p className="value"> {productDetails.name}</p>
      </Col>
      <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
     </Row>
     <Row>
     <Col md="6">
       <label className="key">Quantity</label>
       <p className="value">{productDetails.quantity}</p>
     </Col>
     <Col md="6">
       <label className="key">Category</label>
       <p className="value">{productDetails.category.name}</p>
     </Col>
   </Row>
   <Row>
   <Col md="12">
     <label className="key">Description</label>
     <p className="value">{productDetails.description}</p>
   </Col>
 </Row>
  <Row>
   <Col md="12">
   <div style={{display:'flex'}}>
      {
     productDetails.productPics.map(picture =>
      <div>
     
      <img src={`generatePublicUrl/${picture.img}`} alt='not found' />
      </div>
      )

   }
   </div>
  
   </Col>
 </Row>


    
    <Modal.Footer>
 
      <Button variant="primary" >
        edit
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

//model 4 addproduct
const modalForAddProduct =()=>{
  return(
    <Modal show={show} onHide={handleClose} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>Add Product </Modal.Title>
    </Modal.Header>
   
    <Input value={name} placeholder='product name' onChange={(e)=> setName(e.target.value)} />

    <Input value={quantity} placeholder='product quantity' onChange={(e)=> setQuantity(e.target.value)} />

    <Input value={price} placeholder='product price' onChange={(e)=> setPrice(e.target.value)} />

    <Input value={description} placeholder='product description' onChange={(e)=> setDescription(e.target.value)} />

    <select className='form-control'
     value={categoryParentId}
     onChange={(e)=>setCategoryParentId(e.target.value)}

    >console.log(categoryParentId)

    <option>select a category </option>
      {
       selectCategoryList(category.categories).map(option =>
         <option key={option.value} value={option.value}>{option.name}</option>
       )
      }
    </select>
    {productPics.length > 0 ? productPics.map((pic,index)=> <div key={index}>
      {(pic.name) }
    </div>):null
    }
    <input type='file' name="productPics" onChange={handleProductImage} />
    <Modal.Footer>
 
      <Button variant="primary" onClick={handleClose}>
        Add 
      </Button>
    </Modal.Footer>
  </Modal>
  )
}
    return (
      <Layout sidebar>
      <Container>
       <Row>
       <Col md={12}>
       <div style={{display:'flex',justifyContent:'space-around'}}>
            <p>product page</p>
            <Button variant="primary" onClick={handleShow}>
            Add Product
          </Button>
       </div>
       
       </Col> 
       </Row>
       <hr/>
       <Row>
       <Col md={12}>
          {renderProducts()}
         
       </Col>
       </Row>
       <hr/>
       </Container>
       {modalForAddProduct()}
      { modalForProductDetails()} 
      </Layout>
    )
}
 
 