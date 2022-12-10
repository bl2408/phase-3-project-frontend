import { useContext } from "react";
import { AppContext } from "./App";
import { ep } from "../data/endpoints";
import { useRef } from "react";

export default function Login({prop}){

    const { appState, setAppState } = useContext(AppContext);
    const { loggedIn } = appState;
    const { showLogin, setShowLogin } = prop;

    const refInput = useRef();

    const handleClose =()=>{
        setShowLogin(state=>false);
    };

    const handleLogin =(e)=>{
        e.preventDefault();

        const name = refInput.current.value

        if(name.length === 0
            || name === ""
            || name === " "){
                return;
        }
        
        
        fetch(ep.login(),{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){


                setAppState(state=>{
                    const newState = {
                        ...state, 
                        userData: data.results.user, 
                        token: data.results.token, 
                        loggedIn: true
                    }
                    handleClose();
                    return newState;
                })

            }
        })
    };
    
    return (
        <>
        
            {
                showLogin ?
                <div className="popup-login" onClick={handleClose}>
                    <div onClick={e=> e.stopPropagation()}>
    
                        <div onClick={handleClose} className="btn-close">
                            <i className="fa fa-times-circle"></i>
                        </div>

                        <form onSubmit={handleLogin}>
                            <label>
                                Username:
                                <input ref={refInput} onChange={e=>refInput.current.value = e.target.value} type="text" />
                            </label>
                            <input type="submit" value="Login" />
                        </form>

                        
                    </div>
                </div>
                :
                null
            }
        
        </>
    );

}