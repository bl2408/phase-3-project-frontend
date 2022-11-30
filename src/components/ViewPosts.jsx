import { useContext, useEffect, useState } from 'react';
import { AppContext } from './App';

import { v4 as uuid } from 'uuid';

import Post from './Post';
import { ep } from '../data/endpoints';



export default function ViewPosts(){

    const { appState } = useContext(AppContext);
    const { loggedIn, userData } = appState;


    const [ posts, setPosts] = useState([])

    useEffect(()=>{

        const requestObj = {
            method: loggedIn ? "POST" : "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }

        if(loggedIn){
            requestObj.body = JSON.stringify(userData);

        }

        fetch(ep.postsAll(), requestObj)
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                setPosts(d=>data.results)
            }
        })
    }, [appState]);

    return (
        <>
        {posts.length === 0 ? "Loading" : posts.map((post)=> <Post key={uuid()} data={post}/>)}
        </>
    );
}