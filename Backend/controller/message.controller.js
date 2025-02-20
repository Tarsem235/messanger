const {getReceiverSocketId , io} = require('../SocketIO/server.js')
const Conversation = require('../models/conversation.model.js');
const Message = require('../models/message.model.js');  // Renamed to "Message" to follow convention

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;  // Extract message content from the request body
    const { id: receiverId } = req.params;  // Extract receiverId from the URL params
    const senderId = req.user._id;  // Get senderId from authenticated user

    // Find or create a conversation between the sender and receiver
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] }
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,  // The content of the message
    });

    // Push the message ID to the conversation's messages array
    if (newMessage) {
      conversation.messages.push(newMessage._id);  // Add the new message to conversation
    }

    // Save the conversation and new message
    await Promise.all([conversation.save(), newMessage.save()]);

    // Get receiver's socket ID and emit message
    const receiverSocketId = getReceiverSocketId(receiverId);  // Use the getReceiverSocketId function
    console.log('Receiver Socket ID:', receiverSocketId);
    
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);  // Emit the message to the receiver's socket
    } else {
      console.error(`Socket ID for receiver ${receiverId} not found.`);
    }

    // Respond with the new message
    res.status(200).json(newMessage);
  } catch (err) {
    // Log the error for better debugging
    console.error("Error in sending message:", err);
    
    // Send error response
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.getMessage = async (req , res)=>{
try{
const {id: chatuser} = req.params;
const senderId = req.user._id;
const conversation = await Conversation.findOne({
  members: {$all: [senderId , chatuser]},
}).populate("messages")
if (!conversation){
  return res.status(201).json([]);
}
const messages= conversation.messages;
res.status(201).json(messages)
}catch(error){
  console.log(error,"Internal Server error")
  res.status(500).json({message:"Error"})
}
}
