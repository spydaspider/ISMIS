import useFetch from './useFetch';
import {useState} from 'react';
import {useEffect} from 'react';
const RecordTable = ({fItems,recTotalCost,recProfit}) =>{
  
    
    return (
        <div className = "item-list-wrapper">
        <div className = "record-list">          
            <table className = "items-table">
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Cost Price</th>
                    <th>Selling Price</th>
                    <th>Bought</th>
                    <th>Total Cost</th>
                    <th>Date</th>
                    <th>Time</th>

                </tr>

                {fItems && fItems.map((item)=>(
                    <tr key = {item.itemName}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.costPrice}cedis</td>
                    <td>{item.sellingPrice}cedis</td>
                    <td>{item.bought}</td>
                    <td>{item.totalCost}cedis</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                   </tr>
                )
                )
                }
            </table>
           
            </div>
            <div className = "record-summary-wrapper">
            <p className="record-summary">Number Of items: {fItems && fItems.length}</p>
            <p className = "record-summary">Total Cost: {recTotalCost&&recTotalCost.toFixed(2)}cedis</p>
            <p className = "record-summary">Gross Profit: {recProfit&& recProfit.toFixed(2)}cedis</p>
    
        </div>
        </div>
    )
}
export default RecordTable;