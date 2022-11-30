import { Link } from "react-router-dom";

export default function Post({data}){

    return (
        <article style={{margin: "10px 0 20px 0"}}>
            <header>
                {data.title} <br />
                {data.created_at} : {data.updated_at}<br />
                <Link to={`/users/${data.author.name}`}>{data.author.name}</Link>
            </header>
            <div>{data.body}</div>
            <hr />
        </article>
    );

}