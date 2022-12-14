import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext, defaultAppState } from "./App";

export default function Nav({setShowLogin}){

    const { appState, setAppState } = useContext(AppContext);
    const { loggedIn, userData } = appState;
    const menu = useRef();

    const showLogin =()=>{

        if(loggedIn){
            setAppState(s=>defaultAppState);
            return;
        }

        setShowLogin(state=>true);
    };

    const userLinks = !!appState.userData.name ? `/users/${appState.userData.name.toLowerCase()}` : "";
    
    const dropMenu =(forceClose=false)=>{
        const m = menu.current;

        if(!m){
            return;
        }

        if(forceClose){
            m.style.maxHeight = null;
            m.dataset.open = false
            return;
        }

        if(m.style.maxHeight){
            m.style.maxHeight = null;
        }else{
            m.style.maxHeight = `${m.scrollHeight}px`;
        }
        m.dataset.open = !!m.style.maxHeight
    };

    const handleDocClick = e=>{
        if(!!menu.current && !!e.target.parentNode){
            if(e.target.parentNode.className === menu.current.className){
                dropMenu();
            }else{
                dropMenu(true);
            }
        }
    };

    
    const profileLinks = ()=>{
        switch(userData.role){
            case "admin":
            case "editor":
                return(
                    <>
                        <Link to={`${userLinks}/posts`}>
                            <i className="fa fa-newspaper-o"></i>
                            Posts
                        </Link>
                        <Link to={`${userLinks}/create`}>
                            <i className="fa fa-edit"></i>
                            Create
                        </Link>
                    </>
                );
            case "member":
            case "public":
            default:
                return null
        } 
    };

    useEffect(()=>{
        document.addEventListener("click", handleDocClick);
        return ()=> document.removeEventListener("click", handleDocClick);
    }, [loggedIn]);



    return (

        <nav>
            <div className="max-content">
                <Link to={`/`}>Home</Link> 
                { 
                loggedIn 
                    ? 
                    <div className="nav-menu-loggedin">
                        <div className="nav-menu-loggedin-content" ref={menu}>
                            <div>
                                <i className="fa fa-user-circle-o"></i>
                                {appState.userData.name}
                            </div>
                            {profileLinks()}
                            <button onClick={showLogin}>Logout</button> 
                        </div>
                    </div>
                    : 
                    <button onClick={showLogin}>
                        {loggedIn.toString()}
                    </button>
                }
            </div>
        </nav>

    );

}