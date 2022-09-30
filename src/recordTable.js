import useFetch from './useFetch';
import {useState} from 'react';
const RecordTable = ({startDate,endDate,transaction}) =>{
    let itemCount = 0;
    const {data: items, isPending: isLoading, error} = useFetch('http://localhost:8000/sales');
    return (
        <div className = "item-list-wrapper">
        <div className = "item-list">
            <h1 className = "item-list-title">Sales.</h1>
            <p className="item-count">Number Of items: {itemCount}</p>
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
                {items && items.map((item)=>(
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
        </div>
    )
}
export default RecordTable;