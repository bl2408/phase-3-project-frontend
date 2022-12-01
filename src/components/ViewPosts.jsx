import { useContext, useEffect, useState } from 'react';
import { AppContext } from './App';

import { v4 as uuid } from 'uuid';

import Post from './Post';
import { ep } from '../data/endpoints';
import { useHistory, useParams } from 'react-router-dom';



export default function ViewPosts(){

    const { appState } = useContext(AppContext);
    const { loggedIn, userData } = appState;

    const { id, userId } = useParams();

    const history = useHistory();


    const [ posts, setPosts] = useState([])

    useEffect(()=>{

        const requestObj = {
            method: loggedIn ? "POST" : "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }

        if(loggedIn){
            requestObj.body = JSON.stringify({user: userData});

        }

        let url = ep.postsAll();

        if(id){
            url = ep.postsSingle(id);
        }else{
            if(userId){
                url = ep.userPosts(userId);
            }
        }

        fetch(url, requestObj)
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                setPosts(d=>data.results)
            }else{
                setPosts(d=>({message:"Could not find post!"}))
            }
        })
    }, [appState, id, userId]);


    const removePost = (id)=>{
        setPosts(d=>{
            const p = posts.filter(post=> post.id !== id)
            if(p.length === 0 ){
                return {message:"Could not find post!"}
            }
            return p
        })
    };


    const viewPosts = ()=>{
        if(Array.isArray(posts)){
            return posts.length === 0 ? "Loading" : posts.map((post)=> <Post key={uuid()} data={post} removePost={removePost}/>)
        }else{
            return posts.message;
        }
    };

    return (
        <section>
            { viewPosts() }
        </section>
    );
}