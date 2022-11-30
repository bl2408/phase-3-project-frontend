import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./App";

export default function Post({data}){

    const { appState } = useContext(AppContext);
    const { loggedIn, userData } = appState;
    const isAuthor = userData?.name?.toLowerCase() === data.author.name.toLowerCase();

    return (
        <article style={{margin: "10px 0 20px 0"}}>
            <header style={isAuthor ? {backgroundColor:"rgba(0,0,0,0.5)"} : {}}>
                {data.title} <br />
                {data.created_at} : {data.updated_at}<br />
                <Link to={`/users/${data.author.name}`}>{data.author.name}</Link>
            </header>
            <div>{data.body}</div>
            <hr />
        </article>
    );

}