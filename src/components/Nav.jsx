import { useEffect } from "react";
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

    const userLinks = !!appState.userData.name ? `/users/${appState.userData.name.toLowerCase()}` : "";
    
    const dropMenu =(e)=>{
        const parent = e.target.parentNode;
        if(parent.style.maxHeight){
            parent.style.maxHeight = null;
        }else{
            parent.style.maxHeight = `${parent.scrollHeight}px`;
        }
    };

    return (

        <nav>
            <Link to={`/`}>Home</Link> 
            { 
            loggedIn 
                ? 
                <div className="nav-menu-loggedin">
                    <div className="nav-menu-loggedin-content">
                        <div onClick={dropMenu}>{appState.userData.name}</div>
                        <Link onClick={dropMenu} to={userLinks}>Profile</Link> 
                        <Link onClick={dropMenu} to={`${userLinks}/posts`}>Posts</Link>
                        <Link onClick={dropMenu} to={`${userLinks}/create`}>Create</Link>
                        <button onClick={tempLogin}>Logout</button> 
                    </div>
                </div>
                : 
                <button onClick={tempLogin}>
                    {loggedIn.toString()}
                </button>
            }

        </nav>

    );

}