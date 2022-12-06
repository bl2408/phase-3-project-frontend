import Header from "./Header";
import Nav from "./Nav";
import Content from "./Content";
import Footer from "./Footer";
import { useState, createContext } from "react";

const defaultAppState = {
  loggedIn: false,
  userData: {},
};

const AppContext = createContext();

function App() {

  const [ appState, setAppState ] = useState(defaultAppState);

  return (
    <div className="App">
      <AppContext.Provider value={{appState, setAppState}}>
        <Nav />
        <Header />
        <Content />
        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export {AppContext, App, defaultAppState}
