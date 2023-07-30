import React ,{useRef , useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'
import axios from 'axios'

import { useAuth } from '../contexts/AuthContext'

const Chats = () => {
    const navigate=useNavigate();
    const {user}=useAuth();
    const [loading, setLoading] = useState(true)

    const handleLogout=async()=>{
        await auth.signOut();
        navigate("/")
    }
    
    const getFile=async(url)=>{
        const response=await fetch(url);
        const data=await response.blob();

        return new File([data] , "userPhoto.jpg" , {type:"image/jpeg"});
    }

    useEffect(()=>{
        if(!user){
            navigate("/");
            return;
        }
        //checks if user exists or not here the chatengine api is checking for the existing user.
        axios.get("https://api.chatengine.io/users/me" , {
            headers:{
                "project-id":"430405cf-961c-44bc-b15f-b276bf17f100" , 
                "user-name":user.email,
                "user-secret":user.uid,
            }
        })
        .then(()=>{
            setLoading(false);
        })
        // if there is no existing user. it creates one.
        .catch(()=>{
            let formdata=new FormData();
            formdata.append("email" , user.email);
            formdata.append("username", user.email);
            formdata.append("secret" , user.uid);

            getFile(user.photoURL)
            .then((avatar)=>{
                formdata.append("avatar" , avatar , avatar.name);
                
                axios.post("https://api.chatengine.io/users" , 
                formdata , 
                {headers:{"private-key":"82606f03-6613-40b7-902a-fafd2a340431"}}
                )
                .then(()=>setLoading(false))
                .catch((error)=>console.log(error))
            })
        })
    })


if(!user || loading) return "loading....";

  return (
        <div className='chats-page'> 
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Unichat
                </div>
                <div onClick={handleLogout} className='logout-tab'>
                    Logout
                </div>
            </div>
        <ChatEngine 
            height="calc(100vh-66px)"
            projectID="
            430405cf-961c-44bc-b15f-b276bf17f100"
            userName={user.email}
            userSecret={user.uid}
        />
        </div>

    )
}

export default Chats