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

    const arrMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const dateConversion =(utc)=>{
        const d = new Date(utc)
        const showYr = d.getFullYear() !== new Date().getFullYear() ? d.getFullYear() : ""
        return `${d.getDay()} ${arrMonths[d.getMonth()]} ${showYr}`
    };

    const displayViewType = ()=>{

        const view = appState.viewablesList.find(viewable => viewable.id === dataPost.viewable_id)
        let iconClass = "";
        let msg = "";
        if(view.name === "public"){
            iconClass = "fa fa-eye"
        }else if(view.name === "private"){
            iconClass = "fa fa-eye-slash"
        }else if(view.name === "draft"){
            iconClass = "fa fa-lock"
        }

        msg = `${view.name[0].toUpperCase()}${view.name.slice(1)}`;

        return (
            <div>
                <div title={msg}><i className={iconClass}></i></div>
            </div>
        );
    };

    return (
        <article>

            <div className="controls">
                {canEdit() ? <button onClick={handleEdit}><i className="fa fa-edit"></i></button> : null}
                {canDelete() ? <button onClick={handleDelete}><i className="fa fa-close"></i></button> : null}
            </div>


            <header className="font-code">
                {dataPost.viewMode === "single" ? 
                    <h1>{dataPost.title}</h1>
                    :
                    <Link to={`/posts/${dataPost.id}`}><h1>{dataPost.title}</h1></Link>
                }
                
                <div className="header-extras opacity60">
                    <div>
                        <div><i className="fa fa-user"></i></div>
                        <div><Link to={`/users/${lowerPostUser}`}>{dataPost.author.name}</Link></div>
                    </div>
                    <div>
                        <div><i className="fa fa-clock-o"></i></div>
                        <div>{dataPost.readTime} min read.</div>
                    </div>
                    <div>
                        <div><i className="fa fa-calendar"></i></div>
                        <div>{dateConversion(dataPost.created_at)}</div>
                    </div>
                    {displayViewType()}
                </div>
            </header>
            <div className="article-content">{dataPost.body}</div>
        </article>
    );

}