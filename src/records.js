import { useState } from 'react';
import RecordTable from './recordTable.js';
const Records = () =>{
    const [startDate,setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectValue,setSelectValue] = useState('');
    const [firstOptionEmpty,setFirstOptionEmpty] = useState('');
    const [record, setRecord] = useState(false);
    const [wrongDateFormat, setWrongDateFormat] = useState(false);
    const handleSubmit =(e)=>{

        e.preventDefault();
       if(startDate === ''||endDate === ''|| selectValue === '')
       {
        setFirstOptionEmpty(true);
       }
       else if((startDate.length !== 10)||(endDate.length !== 10))
       {
          setWrongDateFormat(true);
          setFirstOptionEmpty(false);
          setRecord(false);

       }
       else
       {
        setFirstOptionEmpty(false);
        setWrongDateFormat(false);
        setRecord(true);
    
       }

    }
    return(
        <div className = "records-wrapper">
            {wrongDateFormat && <p className = "error-message">Please enter the correct date format</p>}
            {firstOptionEmpty && <p className = "error-message">Please select a different option before the first one</p>}
            <form onSubmit = {(e)=>{handleSubmit(e)}}>
            <input type = "text" onChange = {(e) => setStartDate(e.target.value)} placeholder = "Start Date in the form year-month-day eg 2022-09-28"/>
            <input type = "text" onChange = {(e) => setEndDate(e.target.value)} placeholder = "End Date in the form year-month-day eg 2022-09-28"/>
            <select onChange = {(e)=>setSelectValue(e.target.value)} className = "transaction-media">
                <option>Mobile Money</option>
                <option>Cash</option>
                <option>Mobile Money & Cash</option>


            </select>
            <button className = "search-record">Search Record</button>
            </form>
            {record && <RecordTable startDate = {startDate} endDate = {endDate} transaction = {selectValue}/>}

        </div>
    )
}
export default Records;