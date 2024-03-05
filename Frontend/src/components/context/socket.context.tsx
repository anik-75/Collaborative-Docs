import React, { useEffect, createContext, useState, useContext } from "react";
import { io } from "socket.io-client";
import { socketProviderProps } from "./types";

const SocketContext = createContext(null);

const SocketProvider = ({ children }: socketProviderProps) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    newSocket.on("connect", () => {
      // console.log(newSocket.id);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    console.log("socket not found");
    return;
  }
  return socket;
};
