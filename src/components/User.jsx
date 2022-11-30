import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ep } from "../data/endpoints";

export default function User(){

    const { id } = useParams();
    const [display, setDisplay] = useState({message: "Loading"})

    useEffect(()=>{
        if(id){
            fetch(ep.user(id))
            .then(res=>res.json())
            .then(data=>{
                if(data.success){
                    setDisplay(dis=> data.results);
                }else{
                    setDisplay(dis=>({message: "No User found!"}));
                }
            });
        }else{
            setDisplay(dis=>({message: "No User id provided!"}));
        }
    },[]);

    return (
        <>
            {
                display.id ? display.name : display.message
            }
        </>
    );
}