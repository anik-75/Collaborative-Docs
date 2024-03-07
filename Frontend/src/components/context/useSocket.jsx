import { useContext } from "react";
import { SocketContext } from "./socket.context";

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    console.log("socket not found");
    return;
  }
  return socket;
};
