import './App.css';
import { Notes } from './components/Notes';
import React from "react"
// import store from './auth/Store';
import Login from './components/Login';

function App() {
  const [logedin, setlogedin] = React.useState(false)
  // console.log(store.getState())
  return (
    <div>
      {
        logedin ?
        <Notes />
        :
        <Login setlogedin={setlogedin} />
      }
    </div>
  );
}

export default App;
