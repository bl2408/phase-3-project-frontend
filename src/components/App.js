import Header from "./Header";
import Nav from "./Nav";
import Content from "./Content";
import Footer from "./Footer";
import { useState, createContext, useEffect } from "react";
import Login from "./Login";
import { useHistory } from "react-router-dom";

const defaultAppState = {
  loggedIn: false,
  userData: {},
};

const AppContext = createContext();

function App() {

  const [ appState, setAppState ] = useState(defaultAppState);
  const [ showLogin, setShowLogin ] = useState(false);
  const [ displayHeader, setDisplayHeader ] = useState(true);

  const history = useHistory() 

  useEffect(() => {

    toggleBanner(history.location)

    return history.listen((location) => { 
      toggleBanner(location)
    }) 


  },[history]) 

  const toggleBanner = ({pathname})=>{
    if(pathname === "/" || pathname === "/posts" || pathname.includes("/users")){
      setDisplayHeader(state =>true);
    }else{
      setDisplayHeader(state =>false);
    }
  }

  return (
    <div className="App">
      <AppContext.Provider value={{appState, setAppState}}>
        <Login prop={{showLogin, setShowLogin}} />
        <Nav setShowLogin={setShowLogin}/>
        {displayHeader ?  <Header /> : null}
        <Content />
        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export {AppContext, App, defaultAppState}
