import Navigation from './nav';
import { useState } from 'react';
import useFetch from './useFetch';
import { forEach } from 'lodash';
import CreateCart from './helpers/createCart';
import Store from './helpers/storage.js';
import { useEffect } from 'react';
import CreateBalance from './helpers/createBalance';
import { Link } from 'react-router-dom';
import editIcon from './images/edit-icon.png';
const HomePage = () =>{
    const {data: items, isPending: isLoading, error} = useFetch('http://localhost:8000/items');
     const [showItem, setShowItem] = useState(false);
     const [showCart, setShowCart] = useState(true);
     const [payable, setPayable] = useState(false);
     const [cumulativeTotal,setCumulativeTotal] = useState(0);
     const [fieldEmpty,setFieldEmpty] = useState(true);
     const [showAddButton, setShowAddButton] = useState(true);
     const [cartDisplay,setCartDisplay] = useState([]);
     const [allItems,setAllItems] = useState([]);
     const [finishedItemError,setFinishedItemError] = useState(false);
     const [invalidAmount, setInvalidAmount] = useState(false);
     const [emptyCart,setEmptyCart] = useState(false);
     const [amount,setAmount] = useState(0.0);
     const [lessAmount, setLessAmount] = useState(false);
     const [balance, setBalance] = useState(false);
     const [noBalance, setNoBalance] = useState(false);
          let count = 1; //track number of times a button is clicked
          //get local storage end set cart.
          let cart = Store.getLocalStorage('cart');
        
         
       
       const handleKeyUp = searchLetter =>{
        if(searchLetter === '')
        {
            setShowItem(false);
        }
        else{
        let filteredItems = items.filter((ct)=>ct.itemName.toLowerCase().indexOf(searchLetter.toLowerCase()) !== -1);
         setAllItems(filteredItems);
         setShowItem(true);
         setShowAddButton(true);
         setFinishedItemError(false);
        }
       
        
      

       }
       const ctTotal = () =>{
        let cart = Store.getLocalStorage('cart');
        let cTotal = 0;      //The variable to hold the cumulative total.
            if(cart.length !== 0)
            {
                cart.forEach((ct)=>{
                     cTotal = cTotal + ct.totalCost;  
                })
            }
           /*  setCumulativeTotal(cTotal); */
           return cTotal;
       }
    
    
       const handlePlus = (itemName) =>
        {
            
            let dateTime = new Date();
            let time = dateTime.toISOString().split('T')[1];
            let date = dateTime.toISOString().split('T')[0];

            let buyingList = []; 
            let searchCounter = 0;
            let bought = count;
            let boughtLimit;
            let quantity,costPrice,sellingPrice,itemId,quantityRemain;

            let cart = Store.getLocalStorage('cart');
            //calculate total.
            
            setCartDisplay(cart);
            setShowAddButton(true);
            setPayable(true);
            setInvalidAmount(false);
            setEmptyCart(false);
            setBalance(false);
            setNoBalance(false);
            if(items.length !== 0)
            {
                items.forEach((ct)=>{
                    if(ct.itemName === itemName)
                    {
                        sellingPrice = ct.sellingPrice;
                        costPrice = ct.costPrice;
                        quantity = ct.quantity;
                        itemId = ct.id;
                        quantityRemain = ct.quantity;
                    }
                })

            }

            let totalCost = Number(sellingPrice) * bought;
        
        
             count+=1;
                if(cart.length === 0)
                {
                    
                    setShowCart(false);
                    let cartObj = new CreateCart(itemName,Number(quantity),Number(costPrice),Number(sellingPrice),Number(bought),Number(totalCost),itemId,quantityRemain-1,date,time,false);
                    cart.push(cartObj);
                Store.addLocalStorage('cart', cart);
                setShowCart(true);
                
                
 
                }
                else if(cart.length > 0)
                {
                    setShowCart(true);
                    cart.forEach((ct)=>{
                        if(ct.itemName === itemName)
                        {
                            searchCounter += 1;
                            boughtLimit = ct.bought;
                        }
                    })
                    if(searchCounter === 0)
                    {
                    
                        
                        let cartObj = new CreateCart(itemName,Number(quantity),Number(costPrice),Number(sellingPrice),Number(bought),Number(totalCost),itemId,quantityRemain-1,date,time,false);
                        cart.push(cartObj);
                        Store.addLocalStorage('cart', cart);
                        
                         
         
                    }
                    else
                    {
                         if(boughtLimit >= quantity)
                         {
                            setFinishedItemError(true);
                            setShowAddButton(false);
                            
                         }
                         else{
                            setPayable(true);
                        cart.forEach((ct)=>{
                            if(ct.itemName === itemName)
                            {
                                setShowAddButton(true);
                                setFinishedItemError(false);

                                ct.bought = ct.bought + 1;
                                ct.quantityRemain = ct.quantityRemain - 1;
                             
                                ct.totalCost = ct.sellingPrice * ct.bought;
                                Store.addLocalStorage('cart',cart);
                            
                            }
                        }) 
                    }
                    }
                }
     
        }
        const handleBalance = () =>{
            let balance = Store.getLocalStorage('balance');
            let bal = 0.0; //The balance to return
             return balance.balance;
        }
        const handlePay = (e,total) =>{
             //get the cumulative total.

             e.preventDefault();
            
             let balance = 0.0;
              let cart = Store.getLocalStorage('cart');
             if((amount <= 0)||(amount === ''))
             {
               setInvalidAmount(true);
               setBalance(false);
               setNoBalance(false);
               setEmptyCart(false);
             }
             else if(cart.length === 0)
             {
                setInvalidAmount(false);
                setEmptyCart(true);
                setBalance(false);
                setNoBalance(false);
             }
             else{
                setInvalidAmount(false);
                setEmptyCart(false);
                if(total > amount)
                {
                    setLessAmount(true);
                    setBalance(false);
                    setNoBalance(false); 
                }
                else if(Number(total) < Number(amount))        //Calculate balance
                {
                    
                    setLessAmount(false);
                    balance = amount - total;
                    let balanceObj = new CreateBalance(balance);
                    
                     Store.addLocalStorage('balance',balanceObj);
                     setNoBalance(false);
                     setBalance(true);
                     let cart = Store.getLocalStorage('cart');
                     cart.forEach((ct)=>{
                        fetch('http://localhost:8000/sales',{
                        method: "POST",
                        headers: {"Content-type": "Application/json"},
                        body: JSON.stringify(ct)
                     })
                     
                     
                    
                     })
                      for(let i = 0; i < cart.length; i++)
                     {
                    
                     
                           fetch('http://localhost:8000/items/'+cart[i].id,{
                                   method: "PATCH",
                                   headers: {"Content-type":"Application/json"},
                                   body: JSON.stringify({"quantity": cart[i].quantityRemain})
   
   
   
                                     }) 
                     } 
                    
                     
                   localStorage.removeItem('cart');
                   setShowItem(false);
                   setShowCart(false);
                   setTimeout(()=>{
                     setBalance(false);
                     window.location.reload();
                   },8000)

                     
                      
               }
               else if(Number(total) === Number(amount))
               {
            
                  setBalance(false);
                  setNoBalance(true); 
                  setLessAmount(false);
                  let cart = Store.getLocalStorage('cart');
                  cart.forEach((ct)=>{
                     fetch('http://localhost:8000/sales',{
                     method: "POST",
                     headers: {"Content-type": "Application/json"},
                     body: JSON.stringify(ct)
                  }).then(()=>{
                    console.log("sent");
                 })
                  })
                  for(let i = 0; i < cart.length; i++)
                  {
                
                  
                            fetch('http://localhost:8000/items/'+cart[i].id,{
                                method: "PATCH",
                                headers: {"Content-type":"Application/json"},
                                body: JSON.stringify({"quantity": cart[i].quantityRemain})



                                  }) 
                  } 
                 

                  localStorage.removeItem('cart');
                    
                  localStorage.removeItem('cart');
                  setShowItem(false);
                  setShowCart(false);
                  setTimeout(()=>{
                    setNoBalance(false);
                    window.location.reload();
                  },8000)


                  
               }
               
                
             }
        }
        const handleCheckBox = (e)=>{
            let cart = Store.getLocalStorage('cart');
             if(e.checked)
            {
                
                if(cart.length !== 0)
                {
                    cart.forEach((crt)=>{
                        crt.momo = true;
                    })
                }
            
                 Store.addLocalStorage('cart',cart);
 
            }
            else
            {
                if(cart.length !== 0)
                {
                    cart.forEach((crt)=>{
                        crt.momo = false;
                    })
                }
                
                 Store.addLocalStorage('cart',cart);
            } 
        }
        const handleMinus = (itemName) =>
        {
          
           
             setFinishedItemError(false);
             let cart = Store.getLocalStorage('cart');
             let quantity,costPrice,sellingPrice,quantityRemain;
             setCartDisplay(cart); 
             if(items.length !== 0)
             {
                 items.forEach((ct)=>{
                     if(ct.itemName === itemName)
                     {
                         sellingPrice = ct.sellingPrice;
                         costPrice = ct.costPrice;
                         quantity = ct.quantity;
                         quantityRemain = ct.quantity;
                     }
                 })
 
             }
 
              let searchCounter = 0;
              if(cart.length === 0)
              {
                setPayable(false);
              }
             cart.forEach((ct) => {
                if(ct.itemName === itemName)
                {
                    searchCounter += 1;
                }
             })
             if(searchCounter !== 0)
             {
            
                cart.forEach((ct)=>{
                    if(ct.itemName === itemName)
                    {
                        if(ct.bought === 1)
                        {
                            let filteredCart = cart.filter((ct)=> ct.itemName !== itemName);
                            Store.addLocalStorage('cart',filteredCart);
                            setShowAddButton(true);
                    
                            return;
                        }
                        else{
                        ct.bought = ct.bought - 1;
                        ct.quantityRemain = ct.quantityRemain+1;
                        ct.totalCost = ct.totalCost - sellingPrice;
                        Store.addLocalStorage('cart',cart);
                        setShowAddButton(true);
                       
                        }
                    }
                }) 
             }
             else
             {
                return;
             } 
            
        }
    return(
        <div className = "home-content">

        <div className = "search-wrapper">
        {finishedItemError && <p className = "f-i-error">No more of the items can be found.</p>}

        <input type = "text" className = "search" onKeyUp = {(e)=>handleKeyUp(e.target.value)} placeholder = "Search Item"/>
        <table className = "search-table">
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Cost Price</th>
                    <th>Selling Price</th>

                </tr>
                {
                    showItem && 
                
                allItems.map((item)=>(
                   
                <tr key = {item.itemName}>
                    

                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.costPrice}cedis</td>
                    <td>{item.sellingPrice}cedis</td>
                    
                    {showAddButton && <button className = "plus" onClick = {() => handlePlus(item.itemName)}>+</button>}
                    {!showAddButton && <button className = "plus-disabled" onClick = {handlePlus}disabled>+</button>}

                  


                    <button className = "minus" onClick =  {() => handleMinus(item.itemName)}>-</button>
                   <Link to = {`/items/${item.id}`}> <img className = "edit-icon" src = {editIcon}/></Link>

                </tr>
            
                )
                )
            
               }
               
            </table>  
            <table className = "cart-table">
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Cost Price</th>
                    <th>Selling Price</th>
                    <th>Quantity Bought</th>
                    <th>Total Cost</th>

                </tr>
                {
                    showCart &&
                 cartDisplay.map((ctDp)=>(
                <tr key = {ctDp.itemName}>
                    <td>{ctDp.itemName}</td>
                    <td>{ctDp.quantity}</td>
                    <td>{ctDp.costPrice}cedis</td>
                    <td>{ctDp.sellingPrice}cedis</td>
                    <td>{ctDp.bought}</td>
                    <td>{ctDp.totalCost.toFixed(2)}cedis</td>
                </tr>
                 )
                 )
                }
            </table>
         <p className = "cumulative-total">Cumulative Total: {ctTotal().toFixed(2)}cedis</p>
            {invalidAmount && <p className = "invalid-amount-error">Please enter a valid amount</p>}
            {emptyCart && <p className = "empty-cart-error">There is nothing to pay for, click the add button</p>}
            {lessAmount && <p className = "less-amount-error">Amount is less than the total.</p>}
            {balance && <p className = "balance">Payment was successful with a balance of {handleBalance().toFixed(2)}cedis</p>}
            {noBalance && <p className = "no-balance">Payment was successful with no balance</p>}
            <form onSubmit = {(e)=>handlePay(e,ctTotal())}className = "payment-form">
            <label className = "pay-label">Pay:</label>
            <input type = "number" value = {amount} className = "pay-field" onChange = {(e)=>setAmount(e.target.value)} placeholder = "amount"/>
            {payable && <button className = "pay-button">Pay</button>}
            {!payable && <button className = "pay-button-disabled" disabled>Pay</button>}
            <label className = "momo">Mobile Money</label>
            <input type = "checkbox" onChange = {(e)=>handleCheckBox(e.target)} value = "mobile money"/>


            </form>
        </div>    
       </div>
    
    )
}
export default HomePage;