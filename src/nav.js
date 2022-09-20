import { Link } from 'react-router-dom';
const Navigation = () =>{
   return(
    <div className = "nav-bar">
        <h1>ISMIS2</h1>
        <div className = "links">
        <Link to = "/">Search</Link>
        <Link to = "/add">Add</Link>
        <Link to = "/store">Store</Link>
        </div>
        
    </div>
   )
}
export default Navigation;