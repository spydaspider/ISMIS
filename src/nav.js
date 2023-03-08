import { Link } from 'react-router-dom';
import Store from './helpers/storage';
import { useHistory } from 'react-router-dom';
const Navigation = () =>{
     const history = useHistory();
 
    const handleLogin=()=>{
        let log = Store.getLocalStorage('log');
        if(log.logged === 'true')
        {
        
        }
        else
        {
        
       history.push('/');
        }
    }
    const handleLogout =()=>{
        let logData = Store.getLocalStorage('log');
        logData.logged = false;
        localStorage.setItem('log',JSON.stringify(logData));
        window.location.reload();
    }
   return(
    <div className = "nav-bar">
        <h1>ISMIS2</h1>
        <div className = "links">
        <Link to = "/search">Search</Link>
        <Link to = "/add">Add</Link>
        <Link to = "/store">Store</Link>
        <Link to = "/records">Records</Link>
        <span onClick = {handleLogin} className = "log-style">login</span>
        <span onClick = {handleLogout} className = "log-style">logout</span>
        </div>
        
    </div>
   )
}
export default Navigation;