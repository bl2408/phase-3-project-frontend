import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ep } from "../data/endpoints";
import { AppContext } from "./App";

export default function Post({data: dataPost, removePost}){

    const { appState } = useContext(AppContext);
    const { loggedIn, userData } = appState;
    const isAuthor = userData?.name?.toLowerCase() === dataPost.author.name.toLowerCase();

    const history = useHistory();

    const styleCss = ()=>{
        const style = {
            margin: "10px 0 20px 0"
        }
        if(isAuthor){
            style.backgroundColor = "rgba(0,0,0,0.5)"
        }
        return style;
    };

    const lowerPostUser = dataPost.author.name.toLowerCase();

    const handleDelete = ()=>{
        fetch(ep.postsSingle(dataPost.id),{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
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
            {isAuthor ? <button onClick={handleDelete}>Delete</button> : null}
            {isAuthor ? <button onClick={handleEdit}>Edit</button> : null}
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