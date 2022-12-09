import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ep } from "../data/endpoints";
import { AppContext } from "./App";

export default function Post({data: dataPost, removePost}){

    const { appState } = useContext(AppContext);
    const { loggedIn, userData } = appState;

    const canEdit = ()=>{
        if(!loggedIn){
            return false;
        }
        switch(userData.role){
            case "admin":
            case "editor":
                return true;
            case "member":
            case "public":
            default:
                return false;
        } 
    };

    const canDelete = ()=>{
        if(!loggedIn){
            return false;
        }
        if(userData.name.toLowerCase() === dataPost.author.name.toLowerCase()){
            return true;
        }
        switch(userData.role){
            case "admin":
                return true;
            case "editor":
            case "member":
            case "public":
            default:
                return false;
        } 
    };

    const history = useHistory();

    const styleCss = ()=>{
        const style = {
            margin: "10px 0 20px 0"
        }
        // if(isAuthor){
        //     style.backgroundColor = "rgba(0,0,0,0.5)"
        // }
        return style;
    };

    const lowerPostUser = dataPost.author.name.toLowerCase();

    const handleDelete = ()=>{
        const headerObj = {
            "Content-Type": "application/json",
        };

        if(loggedIn){
            headerObj.token = appState.token
        }

        const requestObj = {
            method: "DELETE",
            headers: headerObj
        }

        fetch(ep.postsSingle(dataPost.id),requestObj)
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                removePost(data.results[0].id)
            }
        })

        ;
    };

    const handleEdit =()=>{
        history.push(`/posts/${dataPost.id}/edit`);
    };

    return (
        <article style={styleCss()}>
            {canDelete() ? <button onClick={handleDelete}>Delete</button> : null}
            {canEdit() ? <button onClick={handleEdit}>Edit</button> : null}
            <header>
                <Link to={`/posts/${dataPost.id}`}><h1>{dataPost.title}</h1></Link>
                {dataPost.created_at} : {dataPost.updated_at}<br />
                <Link to={`/users/${lowerPostUser}`}>{dataPost.author.name}</Link>
                
            </header>
            <div>{dataPost.body}</div>
            <hr />
        </article>
    );

}