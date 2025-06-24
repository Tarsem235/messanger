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
    <div className="w-screen md:w-full lg:w-full bg-black text-white border-l border-gray-700 flex flex-col">
      {!selectedConversation ? ( 
        <NoChat /> 
      ) : (
        <div className="flex flex-col h-full px-4 pt-4">
          <Chatuser />
          <div className="flex-1 overflow-y-auto mt-2 mb-2 rounded-lg border border-gray-700 p-3 bg-gray-900" style={{ maxHeight: 'calc(80vh - 8vh)' }}>
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
    <div className="flex items-center justify-center h-full sm-hiddne lg-block">
      <div className="text-center">
        <img
          className="h-24 mx-auto opacity-80"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0UG5LYXDx2X78rDkRhREP51_FuSpyJbNoWA&s"
          alt="No chat"
        />
        <h1 className="font-semibold text-xl mt-4 text-gray-300">
          Select a chat to start messaging
        </h1>
      </div>
    </div>
  );
};
