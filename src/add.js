import { set } from 'lodash';
import {useState} from 'react';
import useFetch from './useFetch';
const AddToStore = () =>{
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
       const handleSubmit=(e)=>{
         e.preventDefault();
         let searchCounter = 0;
         if((itemName === '')||(quantity === '')||(costPrice === '')||(sellingPrice === ''))
         {
              setFieldEmpty(true);
              setItemExists(false);
              setInvalidNumber(false);
              setGreaterCostPrice(false);
         }
         else
         {
         items.forEach((item)=>{
            if(itemName.toLocaleLowerCase().trim() === item.itemName.toLocaleLowerCase().trim())
            {
              searchCounter = searchCounter + 1;
            }
           }
         )
         let itemN = itemName.toLocaleLowerCase().trim();
         console.log(itemN);
         if(searchCounter !== 0)
         {
            setItemExists(true);
            setFieldEmpty(false);
            setInvalidNumber(false);
            setGreaterCostPrice(false);
         }
            else if((quantity < 0) || (costPrice < 0) || (sellingPrice < 0))
            {
            setInvalidNumber(true);
            setItemExists(false);
            setFieldEmpty(false);
            setGreaterCostPrice(false);



            }
            else if(costPrice > sellingPrice)
            {
                setGreaterCostPrice(true);
                setInvalidNumber(false);
                setItemExists(false);
                setFieldEmpty(false);
            }
            else
            {
                setSuccess(true);
               /*  setTimeout(()=>{
                    window.location.reload();
                    setSuccess(false);
                },
                1000
                ) */
                setGreaterCostPrice(false);
                setInvalidNumber(false);
                setItemExists(false);
                setFieldEmpty(false);
            }
        }
         
       }
    return(
        <div className = "add-items">
            <h2 className = "add-item">Add New Item</h2>
            {success && <p className = "add-success">New item added successfully</p>}
            {invalidNumber && <p className = "invalid-number">Negative number detected.</p>}
            {fieldEmpty && <p className = "field-empty-error">All fields required</p>}
            {greaterCostPrice && <p className = "greater-costprice">Cost price is greater than selling price.</p>}
            {itemExists && <p className = "item-exists-error">Item already exists</p>}
            <form onSubmit = {(e)=>handleSubmit(e)} className = "item-form">
            <input onChange = {(e)=>setItemName(e.target.value)} type = "text" value = {itemName} placeholder = "Name" required/>
            <input onChange = {(e)=>setQuantity(e.target.value)} type = "number" value = {quantity} placeholder = "Quantity" required/>
            <input onChange = {(e)=>setCostPrice(e.target.value)} type = "number" value = {costPrice} placeholder = "Cost Price" required/>
            <input onChange = {(e)=>setSellingPrice(e.target.value)} type = "number" value = {sellingPrice} placeholder = "Selling Price" required/>
            <button className = "add">Add</button>
            </form>
        </div>
    )
}
export default AddToStore;