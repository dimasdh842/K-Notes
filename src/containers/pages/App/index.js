import './App.css';
import Dashboard from '../Dashboard'
import Login from '../Login'
import Register from '../Register'
import {BrowserRouter as Router,Route} from "react-router-dom";
import {store} from '../../../config/redux'
import {Provider} from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Route path="/" exact component={Dashboard}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
      </Router>
    </Provider>
  );
}

export default App;
