
import { categoryConstant } from './../Actions/constant';


const initState ={
    categories:[],
    loading:false,
    error:''
}
const reBuildNewCategories=(parentId,type, categories, category)=>{
    let myCategories = []
  
// if a new category where no parent id

if(parentId === undefined){
    return [
        ...categories,
        {
            _id: category._id,
            name: category.name,
            slug: category.slug,
            children: []
        }
    ]
}


    for(let cat of categories){

        // if(cat._id == parentId){
           
        //     myCategories.push({
        //         ...cat,
        //        children:cat.children ? reBuildNewCategories(parentId,[...cat.children,{
        //            _id:category._id,
        //            name:category.name,
        //            slug:category.slug,
        //            parentId:category.parentId,
        //            type: category.type,
        //            children:category.children,
        //        }],category) :[]
        //     })
        // }else{
        //     myCategories.push({
        //         ...cat,
        //         children:cat.children ? reBuildNewCategories(parentId, cat.children, category): []
        //     })
         
        // }
        if(cat._id == parentId ){
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                children: []
            };
            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? reBuildNewCategories(parentId,cat.children, category) : []
            });
        }
    }

    console.log('find id',myCategories)
    return myCategories

}

export default (state = initState, action)=>{
    switch(action.type){
        
        case  categoryConstant.GETALLCATEGORY_SUCCESS:
            state={
                ...state,
                categories: action.payload.categories
            }
        break;
        case  categoryConstant.ADDNEW_CATEGORY_REQUEST:
            state={
                ...state,
                loading:true
               
            }
        break;
        case  categoryConstant.ADDNEW_CATEGORY_SUCCESS:
            const category = action.payload.category
            const updatedCategories = reBuildNewCategories(category.parentId,state.categories, category);
            console.log('updated categoires', updatedCategories);
            state={
                ...state,
                categories:updatedCategories,
                loading:false
               
            }
        break;
        case  categoryConstant.ADDNEW_CATEGORY_FAILURE:
            state={
                ...initState,
                loading: false,
                error: action.payload.error
                         
            }
        break;
       
    }
    return state
}