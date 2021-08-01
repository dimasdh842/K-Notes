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
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous"></link>
      <Router>
          <Route path="/" exact component={Dashboard}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
      </Router>
    </Provider>
  );
}

export default App;
