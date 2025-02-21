import React, { useEffect } from 'react';
import Chatuser from './Chatuser';
import Messages from './Messages';
import Typesend from './Typesend.jsx'; 
import useConversation from '../../statemanage/useConversation.js';
import { useAuth } from "../../context/AuthProvider.jsx"; 

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-screen md:w-[100%] lg:w-[100%] bg-white text-gray-950 border-slate-100 flex flex-col">
      {!selectedConversation ? ( 
        <NoChat /> 
      ) : (
        <div className="flex flex-col h-full md:pl-95">
          <Chatuser />
          <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 8vh)' }}>
            <Messages />
          </div>
          <Typesend />
        </div>
      )} 
    </div>
  );
}

export default Right;

const NoChat = () => {
  const { authUser } = useAuth();
  console.log(authUser);
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='text-center absolute top-50 right-90 hidden md-block'>
        <img className='h-20 mx-auto' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0UG5LYXDx2X78rDkRhREP51_FuSpyJbNoWA&s' alt="No chat" />
        <h1 className='font-semibold text-xl '>Select a chat to start messaging</h1>
      </div>
    </div>
  );
}