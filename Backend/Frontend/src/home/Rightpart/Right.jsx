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
    <div className="w-screen md:w-[100%] lg:w-[100%] bg-white text-gray-950 border-slate-100 flex flex-col ">
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

  return (
    <div className="hidden lg:flex flex-col items-center justify-center h-screen w-full bg-white mt-[40px] mr-[-30px]">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0UG5LYXDx2X78rDkRhREP51_FuSpyJbNoWA&s"
        alt="No chat"
        className="h-40 mb-3 select-none opacity-90"
      />
      <h1 className="text-gray-600 text-xl font-medium">
        Select a chat to start messaging
      </h1>
      <p className="text-sm text-gray-500 mt-2">
        Chat with your contacts in real-time
      </p>
    </div>
  );
};

