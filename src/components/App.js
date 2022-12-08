import Header from "./Header";
import Nav from "./Nav";
import Content from "./Content";
import Footer from "./Footer";
import { useState, createContext } from "react";
import Login from "./Login";

const defaultAppState = {
  loggedIn: false,
  userData: {},
};

const AppContext = createContext();

function App() {

  const [ appState, setAppState ] = useState(defaultAppState);
  const [ showLogin, setShowLogin ] = useState(false);

  return (
    <div className="App">
      <AppContext.Provider value={{appState, setAppState}}>
        <Login prop={{showLogin, setShowLogin}} />
        <Nav setShowLogin={setShowLogin}/>
        <Header />
        <Content />
        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export {AppContext, App, defaultAppState}
