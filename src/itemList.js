import { useState } from 'react';
import useFetch from './useFetch';
const ItemList = ({items,title}) =>{

    return(
        <div className = "home-content">
        <div className = "homeContent">
          <div className = "items-table">
            <table>
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Cost Price</th>
                    <th>Selling Price</th>

                </tr>
                {items.map((item)=>(
                    <tr key = {item.itemName}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.costPrice}cedis</td>
                    <td>{item.sellingPrice}cedis</td>
                   </tr>
                )
                )
                }
            </table>
          </div>
    
        </div>
        </div>
    )
}
export default ItemList;