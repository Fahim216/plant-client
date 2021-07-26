import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "firebase/auth";
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddPlant from "./components/AddPlant/AddPlant";
import Login from './components/Login/Login';
import ProductAmount from './components/ProductAmount/ProductAmount';
import { createContext, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';



export const UserContext=createContext();

function App() {
  const [loggedInUser,setLoggedInUser]=useState({})
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
    <Router>
      <div className="bg-success">
      <Navbar bg="success" variant="dark">
    <Container>
    <Navbar.Brand className="align-self-center ms-1 text-warning fs-1">নিবেদিতা কুঞ্জ </Navbar.Brand>
    <Nav className="me-2 p-2 m-2 fs-3 text-warning  ">
      <Nav.Link><Link class="text-decoration-none text-warning " to="/">Home</Link></Nav.Link>
      <Nav.Link><Link class="text-decoration-none text-warning" to="/admin">Admin</Link></Nav.Link>
      <Nav.Link><Link class="text-decoration-none text-warning" to="/order">Order</Link></Nav.Link>
      <Nav.Link><Link class="text-decoration-none text-warning" to="/login">Login</Link></Nav.Link>
      
    </Nav>
    </Container>
  </Navbar>
        <Switch>
          {/* <PrivateRoute path="/admin">
            <AddPlant />
          </PrivateRoute> */}
          <Route path="/admin">
            <AddPlant />
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/order/:id">
            <ProductAmount />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
