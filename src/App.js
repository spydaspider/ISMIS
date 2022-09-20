import HomePage from './HomePage';
import useFetch from './useFetch';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 
import Navigation from './nav';
import AddToStore from './add';
import ItemList from './itemList';
function App() {
  const {data: items, isPending: isLoading, error} = useFetch('http://localhost:8000/items');

  return (
    <Router>
      <Navigation />
    <div className="App">
    <div className = "content">
        <Switch>
          <Route exact path = "/">
            <HomePage />
            </Route>
            <Route path = "/add">
              <AddToStore />

            </Route>
            <Route path = "/store">

              {items && <ItemList items = {items} title = "All Items In the Store"/>}
            </Route>
        </Switch>
    </div>
    
    </div>
    
  </Router>
  );
}
 
export default App;
