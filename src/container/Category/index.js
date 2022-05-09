import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout';
import { Row, Col, Button, Modal, Container} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory,updatCategories } from '../../Actions/categoryAction';
import { Input } from './../../components/UI/input/index';
import { getAllCategory } from '../../Actions/categoryAction';
import CheckboxTree from 'react-checkbox-tree';
import {IoIosCheckbox,IoIosCheckboxOutline ,IoIosArrowForward ,IoIosArrowDown } from "react-icons/io";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';


export const Category = (props) => {

const category = useSelector(state => state.category)
console.log(category)
  
// console.log(category)
   const [categoryName, setCategoryName] = useState('')
   const [categoryParentId, setCategoryParentId] = useState('')
  // const[categoryType, setCategoryType]=useState('')
   const [ categoryImage, setCategoryImage] = useState('')
   
   //for add cate modal show and close
   const [show, setShow] = useState(false);
   const [checked,setChecked] = useState([])
   const [expanded,setExpanded ] = useState([])

   const [checkedArray, setCheckedArray] = useState([])
   const [expandedArray, setExpandedArray]= useState([])

//for edit cate modal show and close
   const [updateCategoryModal, setUpdateCategoryModal] = useState(false)
   const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)
  
   
   const dispatch = useDispatch()

   
//    useEffect(() => {

//     if (!category.loading) {
//         setShow(false);
//     }

// }, [category.loading]);


  useEffect(()=>{
        dispatch(getAllCategory())
    },[])

    // for add modal
    const handleShowAdd= () => setShow(true)
    const handleAddClose= () => setShow(false)
    // for edit modal
     const handleShowEdit = ()=>setUpdateCategoryModal(true)
     const handleEditClose = ()=>setUpdateCategoryModal(false)
    // for delete modal
    const handleDeleteClose=()=>setDeleteCategoryModal(false)
    const handleShowDelete=()=>setDeleteCategoryModal(true)


     const handleAddCategory  = () =>{
            const form = new FormData()
            form.append('name',categoryName)
            form.append('parentId',categoryParentId)
            form.append('categoryImage',categoryImage)
            // form.append('type',categoryType)
            dispatch(addCategory(form))
            setCategoryName('')
            setCategoryParentId('')
            setShow(false)
       } 

    //for update category function
      const handleUpdatecategory=()=>{
          updateCheckedAndExpandedCategories()
          setUpdateCategoryModal(true)
    } 
  // getting checked and expanded item array and single item
  const updateCheckedAndExpandedCategories = () => {

    const categories = selectCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((categoryId, index) => {
        const category = categories.find((category, _index) => categoryId == category.value);
        category && checkedArray.push(category);
    })
    expanded.length > 0 && expanded.forEach((categoryId, index) => {
        const category = categories.find((category, _index) => categoryId == category.value);
        category && expandedArray.push(category);
    })
    // now getting the updte checked and expanded array
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    //console.log({checked,expanded,categories,checkedArray, expandedArray})
}

  // catching the edit input update information 
     const handleCateInput=(key,value,index,catched)=>{
      console.log(value)
        if(catched == 'checked'){
         const updateCheckedArray=  checkedArray.map((item, _index)=> index == _index ? {...item,[key]:value}:item)
         setCheckedArray(updateCheckedArray)
        }else if(catched == 'expanded'){
          const updateExpandedArray=  expandedArray.map((item, _index)=> index == _index ? {...item,[key]:value}:item)
          setExpandedArray(updateExpandedArray)
        }
    }  

      // edit modal listen onsubmit() form data insert
    const updateCategoryForm=()=>{
      
      const form = new FormData()
      
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : "")
          // form.append('type', item.type)
            dispatch(updatCategories(form))
        })
        checkedArray.forEach((item, index) => {
          form.append('_id', item.value);
          form.append('name', item.name);
          form.append('parentId', item.parentId ? item.parentId : "");
        // form.append('type', item.type);
          dispatch(updatCategories(form));
        })
        // after submit the modal will close
         setUpdateCategoryModal(false)
    }

    //------ dekete category function----------
    const  handleDeletecategory=()=>{

      setDeleteCategoryModal(true)
    }




  const renderCategory = (categories) =>{
    let myCategories =[]
    for(let category of categories){
      myCategories.push( 
          {
            label:category.name,
            value:category._id,
            children: category.children.length > 0 && renderCategory(category.children)
          }
    
        )
    }
  //  console.log(myCategories)
    return myCategories
} 
const selectCategoryList =(categories, options=[])=>{
  for(let category of categories){
    options.push({
                  value:category._id,
                  name:category.name,
                  parentId:category.parentId
                })
                //console.log(options)
    if(category.children.length > 0){
      selectCategoryList(category.children,options)
    }

  }
  //console.log(options)
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
        <Button variant="primary" onClick={handleShowAdd}>
        Add category
      </Button>
   </div>
   
   </Col> 
   </Row>
   <hr/>
   <Row>
   <Col md={12}>
         
            {/*<ul> renderCategory(category.categories) </ul>*/}
            <CheckboxTree
            nodes={renderCategory(category.categories)}
            checked={checked}
            expanded={expanded}
            onCheck={checked =>setChecked(checked)}
            onExpand={expanded => setExpanded(expanded)}
            icons={{
              check: <IoIosCheckbox />,
              uncheck: <IoIosCheckboxOutline />,
              halfCheck: <IoIosCheckboxOutline />,
              expandClose: <IoIosArrowForward />,
              expandOpen: <IoIosArrowDown />
            }}
        />
         
   </Col>
   </Row>

   <Row>
   <Col>
    <Button onClick={handleUpdatecategory} style={{margin:'5px',color:'red',backgroundColor:'greenyellow'}}>Edit</Button>

    <Button style={{margin:'5px',color:'white',backgroundColor:'red'}}onClick={handleShowDelete}>Delete</Button>
   </Col>
   </Row>
   <hr/>
   </Container>
   



  {/* modal for adding category */}
   <Modal 
    show={show}
    onHide={handleAddClose} 
    onSubmit={handleAddCategory}
     animation={false}>
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
   {/* <Input value={categoryType} placeholder='category type' onChange={(e)=> setCategoryType(e.target.value)} /> */}
  
   <input type='file' name="categoryImage" onChange={handleCategoryImage} />
   <Modal.Footer>

     <Button variant="primary" onClick={handleAddCategory} >
       Add 
     </Button>
   </Modal.Footer>
 </Modal>






 {/* ----------------model for edit category-----------------  */}
 <Modal
 
  show={updateCategoryModal}
  onHide={handleEditClose}
  onSubmit={updateCategoryForm}
  animation={false} size='lg'
  >

   <Modal.Header closeButton>
     <Modal.Title>Edit Category </Modal.Title>
   </Modal.Header>
 
 
  <p>expanded</p>
   {
     expandedArray.length > 0 && expandedArray.map((item,index)=>
     <Row key={index}>
     <Col>
     <Input  value={item.name} placeholder='category name' onChange={(e)=> 
      handleCateInput('name',e.target.value,index,'expanded')} />
     </Col>

     
     <Col>
      <select className='form-control'
      value={item.parentId}
       onChange={(e)=>handleCateInput('parentId',e.target.value,index,'expanded')} >

     <option>select a category </option>
     {
      selectCategoryList(category.categories).map(option =>
        <option key={option.value} value={option.value}>{option.name}</option>
      )
     }
   </select>
     </Col>
     <Col>
     <select className="form-control">
     <option value="">select type</option>
     <option value="store">store</option>
     <option value="product">product</option>
     <option value="page">page</option>
     </select>
     </Col>

  </Row>
     
     )
   }
   <p>checked array</p>
   {
    checkedArray.length > 0 && checkedArray.map((item,index)=>
    <Row key={index}>
    <Col>
    <Input  value={item.name} placeholder='category name' onChange={(e)=> 
     handleCateInput('name',e.target.value,index,'checked')} />
    </Col>

    <Col>
     <select className='form-control'
     value={item.parentId}
      onChange={(e)=>handleCateInput('parentId',e.target.value,index,'checked')} >

    <option>select a category </option>
    {
     selectCategoryList(category.categories).map(option =>
       <option key={option.value} value={option.value}>{option.name}</option>
     )
    }
  </select>
    </Col>
    <Col>
    <select className="form-control">
    <option value="">select type</option>
    <option value="store">store</option>
    <option value="product">product</option>
    <option value="page">page</option>
    </select>
    </Col>

 </Row>
    )
    
  }
 
     
  
   <Modal.Footer>

     <Button variant="primary" onClick={updateCategoryForm}>
       Update/Edit
     </Button>
   </Modal.Footer>
 </Modal>





 
{/* ---------------delete modal ------------------------ */}

<Modal 
show={deleteCategoryModal}
onHide={handleDeleteClose} 
animation={false}>

<Modal.Header closeButton>
 <Modal.Title>Delete Category </Modal.Title>
</Modal.Header>


<Modal.Footer>

 
  <Button variant='info'>no</Button><Button variant='danger'>yes</Button>

</Modal.Footer>
</Modal>


  </Layout>
)
}





/* 

      // expandedArray.forEach((item, index) => {

        // const categories=  selectCategoryList(category.categories)
      //   let checkedArray= []
      //   let expandedArray=[]
      //   checked.length > 0 && checked.forEach((categoryId,index) =>{
      //     const category = categories.find((category,_index)=>categoryId === category.value)
      //    category && checkedArray.push(category)
      //   })
   
      //   expanded.length > 0 && expanded.forEach((categoryId,index) =>{
      //    const category = categories.find((category,_index)=>categoryId === category.value)
      //    expanded && expandedArray.push(category)
      //  })

      

//        setCheckedArray(checkedArray)
//        setExpandedArray(expandedArray)
//  console.log({checked,expanded,categories,checkedArray, expandedArray})

    //     const form = new FormData();
    //     form.append('_id', item.value);
    //     form.append('name', item.name);
    //     form.append('parentId', item.parentId ? item.parentId : "");
    //     form.append('type', item.type);
    //      dispatch(updatCategories(form));
    // })
    // checkedArray.forEach((item, index) => {
    //   const form = new FormData();
  
    //     form.append('_id', item.value);
    //     form.append('name', item.name);
    //     form.append('parentId', item.parentId ? item.parentId : "");
    //     form.append('type', item.type);
    //     dispatch(updatCategories(form));
    // })


*/












/* 
 /* <Row>
     <Col>
     <Input value={categoryName} placeholder='category name' onChange={(e)=> setCategoryName(e.target.value)} />
     </Col>

     <Col>
      <select className='form-control'
       value={categoryParentId}
       onChange={(e)=>setCategoryParentId(e.target.value)} >

     <option>select a category </option>
     {
      selectCategoryList(category.categories).map(option =>
        <option key={option.value} value={option.value}>{option.name}</option>
      )
     }
   </select>
     </Col>
     <Col>
     <select className="form-control">
     <option value="">select type</option>
     <option value="store">store</option>
     <option value="product">product</option>
     <option value="page">page</option>
     </select>
     </Col>

  </Row> */


/* -------------- first part before edit cate -------------------------------




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




*/