import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {io} from "socket.io-client";
//@ts-ignore
const socket=io.connect('http://localhost:3003');

interface Message{
  name:string,
  roomId:string,
  message:string

}
interface MessageResponse{
  data:Message[]
}

function App() {
  console.log("App");
  const {id}=useParams();
  const [name,setName]=useState("");
  const [text,setText]=useState("");
  const [message,setMessage]=useState<Message[]>([]);


  useEffect(()=>{


    socket.emit("join_room",{
      roomId:id
    })
    socket.on("old_chats",(data:MessageResponse)=>{
        setMessage(data?.data);
    })
    socket.on("message_received",(data:Message)=>{
      setMessage((prev)=>[...prev,data])
    })

  },[socket]);

  const sendData=()=>{
    socket.emit("message_send",{
      roomId:id,
      name:name,
      message:text
    })
  }
 

  return (
   <div>
    <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>{
      setName(e.target.value);
    }}/>
    <input type="text" placeholder="Enter your message" value={text} onChange={(e)=>{
      setText(e.target.value);
    }}/>
     <button onClick={sendData}>Send</button>
    {
      message.length>0 && message.map((m,i)=>{
        return <li key={i}>{m.message}:{m.name}</li>
      })
    }
   

   </div>
  )
}

export default App
