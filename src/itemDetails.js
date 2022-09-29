import {useState} from 'react';
import {useParams} from 'react-router-dom';
import useFetch from './useFetch';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const ItemDetails = () =>{
    const history = useHistory();
const {id} = useParams();
const [itemName,setItemName] = useState('');
       const [quantity,setQuantity] = useState('');
       const [costPrice,setCostPrice] = useState('');
       const [sellingPrice,setSellingPrice] = useState('');
       const [fieldEmpty,setFieldEmpty] = useState(false);
       const [greaterCostPrice,setGreaterCostPrice] = useState(false);
       const [itemExists,setItemExists] = useState(false);
       const {data:items} = useFetch(' http://localhost:8000/items');
       const [invalidNumber,setInvalidNumber] = useState(false);
       const [success,setSuccess] = useState(false);
       const [addError, setAddError] = useState(false);
const {data:item, isPending: isLoading, error} = useFetch('http://localhost:8000/items/'+id);
const handleRemove = () =>{

    fetch('http://localhost:8000/items/'+item.id,{
        method: 'DELETE'

    }).then(()=>{
        history.push('/search');
    })

}
const handleSubmit = (e) =>{
    e.preventDefault();
    let searchCounter = 0;
    if((itemName === '')||(quantity === '')||(costPrice === '')||(sellingPrice === ''))
    {
         setFieldEmpty(true);
         setItemExists(false);
         setInvalidNumber(false);
         setGreaterCostPrice(false);
         setSuccess(false);

    }
    else
    {
   
       if((quantity < 0) || (costPrice < 0) || (sellingPrice < 0))
       {
       setInvalidNumber(true);
       setItemExists(false);
       setFieldEmpty(false);
       setGreaterCostPrice(false);
       setSuccess(false);




       }
       else if(costPrice > sellingPrice)
       {
           setGreaterCostPrice(true);
           setInvalidNumber(false);
           setItemExists(false);
           setFieldEmpty(false);
           setSuccess(false);

       }
       else
       {
           const newItems = {itemName,quantity,costPrice,sellingPrice};
           fetch('http://localhost:8000/items/'+item.id,{
               method: "PUT",
               headers: {"Content-type": "Application/json"},
               body: JSON.stringify(newItems)
           }).then(()=>{
            history.push('/search');
           }).catch((err)=>{
               setAddError(true);
           })
         
           setGreaterCostPrice(false);
           setInvalidNumber(false);
           setItemExists(false);
           setFieldEmpty(false);
       }
   }
}
return(
    <div className = "add-items">

              
<h2 className = "add-item-title">Edit Item</h2>

<form onSubmit = {(e) => handleSubmit(e)} className = "item-form">
            {addError && <p className = "error-message">Failed to add new items</p>}
            {success && <p className = "add-success">New item added successfully</p>}
            {invalidNumber && <p className = "error-message">Negative number detected.</p>}
            {fieldEmpty && <p className = "error-message">All fields required</p>}
            {greaterCostPrice && <p className = "error-message">Cost price is greater than selling price.</p>}
            {itemExists && <p className = "error-message">Item already exists</p>}
            <input onChange = {(e)=>setItemName(e.target.value)} type = "text" value = {itemName} placeholder = {item && item.itemName} required/>
            <input onChange = {(e)=>setQuantity(e.target.value)} type = "number" value = {quantity} placeholder = {item && item.quantity} required/>
            <input onChange = {(e)=>setCostPrice(e.target.value)} type = "number" value = {costPrice} placeholder = {item && item.costPrice+"cedis"} required/>
            <input onChange = {(e)=>setSellingPrice(e.target.value)} type = "number" value = {sellingPrice} placeholder = {item && item.sellingPrice+"cedis"} required/>
              
            
            <div className = "detail-buttons">  
           <button className = "edit">Edit</button>
            
        
            </div>
            </form>
            <button onClick = {handleRemove} className = "remove">Remove</button>
    </div>
)
}
export default ItemDetails;