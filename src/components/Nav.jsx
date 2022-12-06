import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ep } from "../data/endpoints";
import { AppContext, defaultAppState } from "./App";

export default function Nav(){

    const { appState, setAppState } = useContext(AppContext);
    const { loggedIn } = appState;
    const menu = useRef();

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
    
    const dropMenu =(forceClose=false)=>{
        const m = menu.current;
       
        if(!m){
            return;
        }

        if(forceClose){
            m.style.maxHeight = null;
            return;
        }

        if(m.style.maxHeight){
            m.style.maxHeight = null;
        }else{
            m.style.maxHeight = `${m.scrollHeight}px`;
        }
    };

    useEffect(()=>{
        document.addEventListener("click",(e)=>{
            if(!!menu.current){
                if(e.target.parentNode.className === menu.current.className){
                    dropMenu();
                }else{
                    dropMenu(true);
                }
            }
        });
    });



    return (

        <nav>
            <Link to={`/`}>Home</Link> 
            { 
            loggedIn 
                ? 
                <div className="nav-menu-loggedin">
                    <div className="nav-menu-loggedin-content" ref={menu}>
                        <div>{appState.userData.name}</div>
                        <Link to={userLinks}>Profile</Link> 
                        <Link to={`${userLinks}/posts`}>Posts</Link>
                        <Link to={`${userLinks}/create`}>Create</Link>
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