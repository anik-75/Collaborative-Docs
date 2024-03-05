import { useEffect, createContext, useState, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

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
