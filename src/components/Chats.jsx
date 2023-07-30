import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'

import { useAuth } from '../contexts/AuthContext'

const Chats = () => {
    const navigate=useNavigate();
    const {user}=useAuth();
    console.log(user);

    const handleLogout=async()=>{
        await auth.signOut();
        navigate("/")
    }
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
            projectId="
            430405cf-961c-44bc-b15f-b276bf17f100"
            userName="."
            userSecret="."
        />
        </div>

    )
}

export default Chats