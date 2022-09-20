import useFetch from './useFetch';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 
const Login = () =>{
  const history = useHistory();
  const [userExists,setUserExists] = useState(true);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const {data: users, isPending: isLoading, error} = useFetch('http://localhost:8000/users');
  const handleSignup =()=>{
     history.push("/signup");
  }
  const handleSubmit = e =>{
       let count = 0;
       e.preventDefault();
       users.forEach((user)=>{
        if(user.username === username && user.password === password)
        {

           count += 1;
        }
       })
       console.log(count);
       if(count === 0)
       {
           setUserExists(false);
       }
 else
 {
     history.push("/home");
 }
  }
   return (
    <div className = "login-container">
    <div className = "login-form">
      <h2>Login</h2>
      {!userExists && <p className = "not-exist">Invalid username or password</p>}
     <form onSubmit = {handleSubmit}>
      <input type = "text" placeholder = "username" value = {username} onChange = {(e)=> setUsername(e.target.value)} required/>
      <input type = "password" placeholder = "password" value = {password} onChange = {(e)=>setPassword(e.target.value)} required/>
      <button className = "login-button">Login</button>
      <button className = "signup-button" onClick = {handleSignup}>sign up</button>
      <p>{username}</p>
      <p>{password}</p>
      
     </form>
    </div>
    </div>

 
   )
}
export default Login;