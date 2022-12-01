import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ep } from "../data/endpoints";
import { AppContext } from "./App";

export default function Create(){

    const { appState } = useContext(AppContext);
    const { userData } = appState;

    const [ optionsState, setOptionsState ] = useState([]);

    const history = useHistory();

    const refs = {
        textTitle: useRef(""),
        textAreaMain: useRef(""),
        selectPublish: useRef("0")
    };

    useEffect(()=>{
        fetch(ep.viewablesList())
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                setOptionsState(state=>data.results)
            }
        })
    },[]);

    const handleFormSubmit =(e)=>{
        e.preventDefault();

        if(refs.textTitle.current.value.length === 0 
            || refs.textTitle.current.value === ""
            || refs.textAreaMain.current.value.length === 0
            || refs.textAreaMain.current.value === ""
            || refs.selectPublish.current.value === ""
            || refs.selectPublish.current.value === "0"
            ){
                return;
        }

        const submitObj = {
            title: refs.textTitle.current.value,
            body: refs.textAreaMain.current.value,
            viewable: refs.selectPublish.current.value,
            user: userData
        }

        fetch(ep.postsNew(),{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submitObj)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                refs.textTitle.current.value = ""
                refs.textAreaMain.current.value = ""
                refs.selectPublish.current.value= "0"
                history.push(`/posts/${data.results.id}`)
            }
        });
    };

    return (
        <article>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Title:
                    <input 
                        ref={refs.textTitle} 
                        type="text" 
                        onChange={(e)=>refs.textTitle.current.value = e.target.value}
                    />
                </label>

                <label>
                    Post:
                    <textarea 
                        ref={refs.textAreaMain} 
                        type="text" 
                        onChange={(e)=>refs.textAreaMain.current.value = e.target.value}
                    ></textarea>
                </label>
                <label>
                    Publish:
                    <select 
                        ref={refs.selectPublish}
                        onChange={(e)=>refs.selectPublish.current.value = e.target.value}
                    >
                        <option value="0">Select</option>
                        {optionsState.map((option)=><option key={option.id} value={option.value}>{option.name}</option>)}
                    </select>
                </label>
                <input type="submit" value="Post" />
            </form>
        </article>
    );

}