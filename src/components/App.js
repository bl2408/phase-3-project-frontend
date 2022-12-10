import Header from "./Header";
import Nav from "./Nav";
import Content from "./Content";
import { useState, createContext, useEffect } from "react";
import Login from "./Login";
import { useHistory } from "react-router-dom";
import { ep } from "../data/endpoints";

const defaultAppState = {
  loggedIn: false,
  userData: {},
};

const AppContext = createContext();

function App() {

  const [ appState, setAppState ] = useState(defaultAppState);
  const [ showLogin, setShowLogin ] = useState(false);
  const [ displayHeader, setDisplayHeader ] = useState(true);

  useEffect(()=>{
    fetch(ep.viewablesList())
    .then(res=>res.json())
    .then(data=>setAppState(state=> ({...state, viewablesList: data.results})))
  }, []);

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
      </AppContext.Provider>
    </div>
  );
}

export {AppContext, App, defaultAppState}
