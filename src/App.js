import "./App.css";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import NavBar from "./UI/NavBar";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
     
    </>
  );
}

export default App;
