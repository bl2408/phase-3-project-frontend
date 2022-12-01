import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./App";

export default function Post({data}){

    const { appState } = useContext(AppContext);
    const { loggedIn, userData } = appState;
    const isAuthor = userData?.name?.toLowerCase() === data.author.name.toLowerCase();

    const styleCss = ()=>{
        const style = {
            margin: "10px 0 20px 0"
        }
        if(isAuthor){
            style.backgroundColor = "rgba(0,0,0,0.5)"
        }
        return style;
    };

    const lowerPostUser = data.author.name.toLowerCase();

    return (
        <article style={styleCss()}>
            <header>
                {data.title} <br />
                {data.created_at} : {data.updated_at}<br />
                <Link to={`/users/${lowerPostUser}`}>{data.author.name}</Link>
            </header>
            <div>{data.body}</div>
            <hr />
        </article>
    );

}