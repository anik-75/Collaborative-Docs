import { useEffect, createContext, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://collab-docs-p4wb.onrender.com");
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
