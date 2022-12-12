import { useContext, useEffect, useState } from 'react';
import { AppContext } from './App';

import { v4 as uuid } from 'uuid';

import Post from './Post';
import { ep } from '../data/endpoints';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';



export default function ViewPosts(){

    const { appState } = useContext(AppContext);
    const { loggedIn } = appState;

    const { id, userId } = useParams();

    const [ posts, setPosts] = useState([])

    useEffect(()=>{

        const headerObj = {
            "Content-Type": "application/json",
        };

        if(loggedIn){
            headerObj.token = appState.token
        }

        const requestObj = {
            method: "GET",
            headers: headerObj
        }
        let postViewMode = "all";
        let url = ep.postsAll();

        if(id){
            url = ep.postsSingle(id);
            postViewMode = "single"
        }else{
            if(userId){
                url = ep.userPosts(userId);
            }
        }

        fetch(url, requestObj)
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                setPosts(d=>data.results.map(post=>{
                    const postObj = {...post};
                    postObj.readTime = wordCountTime(postObj.body);
                    postObj.viewMode = postViewMode
                    
                    if(postViewMode === "all"){
                        postObj.body = `${postObj.body.substring(0,200)}...`
                    }
                    return postObj
                }))
            }else{
                setPosts(d=>({message:"Could not find post(s)!"}))
            }
        })
    }, [appState, id, userId]);

    const wordCountTime =word=>{
        const wordCount = word.split(' ').length
        return Math.round(wordCount / 150)
    };


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

    const searchTxt = useRef();

    const handleSearch=(e)=>{
        e.preventDefault();

        const text = searchTxt.current.value;

        const headerObj = {
            "Content-Type": "application/json",
        };

        if(loggedIn){
            headerObj.token = appState.token
        }

        const requestObj = {
            method: "GET",
            headers: headerObj
        }

        fetch(`${ep.postsAll()}?search=${text}`,requestObj)
        .then(res=>res.json())
        .then(data=>{

            if(data.success){
                setPosts(d=>data.results.map(post=>{
                    const postObj = {...post};
                    postObj.readTime = wordCountTime(postObj.body);
                    postObj.viewMode = "all";
                    postObj.body = `${postObj.body.substring(0,200)}...`
                    
                    return postObj
                }))
            }else{
                setPosts(d=>({message: `No results found: ${text}`}))
            }

        });

    };

    return (
        <section>

            {!!id || !!userId ? null:
                <form onSubmit={handleSearch}>
                    <div style={{display: "grid", gridTemplateColumns:"auto max-content max-content"}}>
                        <input type="text" ref={searchTxt} onChange={e=>searchTxt.current.value = e.target.value}/>
                        <input type="submit" value="search" />
                        <input type="reset" value="x" />
                    </div>
                </form>
            }

            

            { viewPosts() }
        </section>
    );
}