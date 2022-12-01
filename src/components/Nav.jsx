import { useContext } from "react";
import { Link } from "react-router-dom";
import { ep } from "../data/endpoints";
import { AppContext, defaultAppState } from "./App";

export default function Nav(){

    const { appState, setAppState } = useContext(AppContext);
    const { loggedIn } = appState;

    const tempLogin =()=>{

        if(loggedIn){
            setAppState(s=>defaultAppState);
            return;
        }

        fetch(ep.login(),{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "brian"
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                 setAppState(s=>({...s, userData: data.results[0], loggedIn: true}))
            }
        })
    };

    const lowerCurrentUser = !!appState.userData.name ? appState.userData.name.toLowerCase() : "";

    return (

        <nav style={{display:'flex', gap: "10px"}}>
            <Link to={`/`}>Home</Link> 
            { 
            loggedIn 
                ? 
                <>
                    <Link to={`/users/${lowerCurrentUser}`}>{appState.userData.name}</Link> 
                    <Link to={`/users/${lowerCurrentUser}/posts`}>Posts</Link>
                    <Link to={`/users/${lowerCurrentUser}/create`}>Create</Link>
                    <button onClick={tempLogin}>Logout</button> 
                </>
                : 
                <button onClick={tempLogin}>
                    {loggedIn.toString()}
                </button>
            }

        </nav>

    );

}