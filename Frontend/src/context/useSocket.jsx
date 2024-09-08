import { useContext } from "react";
import { SocketContext } from "./socket.context";

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    return;
  }
  return socket;
};
