import React, { useEffect } from 'react';
import Chatuser from './Chatuser';
import Messages from './Messages';
import Typesend from './TypeSend';
import useConversation from '../../statemanage/useConversation.js';
import { useAuth } from "../../context/AuthProvider.jsx"; 
import { CiMenuFries } from 'react-icons/ci';
import Message from './Message.jsx';

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
 // Get the authenticated user

  useEffect(() => {
    // Clear selected conversation when the component mounts or updates.
    setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full  md:w-[70%] bg-white text-gray-950  lg:block border-slate-100 ">
      
       {!selectedConversation ? ( 
         <NoChat /> 
       ) : (
        <div className="absolute left-0 right-0 top-0 bottom-0  md:left-[31.5%]">
      
          <Chatuser />
          <div
            className="flex-1 overflow-y-auto"
            style={{ maxHeight: 'calc(80vh - 8vh)' }}
          >
             <Messages />

          </div>
          <Typesend />
        </div>
       )} 
    </div>
  );
}

export default Right;

const NoChat = () =>{
  const {authUser}= useAuth();
  console.log (authUser)
  return(
    <>
    <div className='flex item-center justify-center  pl-[20cm]' >
    <div className='pt-[90%] sm:pt-[30%] lg:pt-[35%]'>
  <img className='h-20 ml-25' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0UG5LYXDx2X78rDkRhREP51_FuSpyJbNoWA&s'/>
  <h1 className='font-semibold text-xl'>Select a chat to start messaging</h1>
</div>

      {/* {authUser && <NoChat/>} */}
    </div>
    </>
  )
}