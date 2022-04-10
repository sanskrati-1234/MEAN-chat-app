import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatsPage = () => {
  const [chats, setChats] = useState([]);
  console.log("line4", chats);

  const fetchChats = async () => {
    const { data } = await axios.get("http://localhost:5000/api/chat");
    console.log(data);
    setChats(data);
    console.log(chats);
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return <div>{Array.from(JSON.stringify(chats))}</div>;
};

export default ChatsPage;
