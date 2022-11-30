import { useContext } from "react";
import { AppContext } from "./App";

export default function Nav(){

    const { appState, setAppState } = useContext(AppContext);
    const { loggedIn } = appState;

    return (

        <>
        <button onClick={()=>setAppState(s=>({...s, loggedIn: !loggedIn}))}>
            {loggedIn.toString()}
        </button>
        </>

    );

}