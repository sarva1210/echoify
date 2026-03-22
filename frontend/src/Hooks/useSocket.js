import { useEffect } from "react";
import { socket } from "../Services/socket";

export const useSocket = (event, callback) => {
  useEffect(() => {
    socket.on(event, callback);
    return () => socket.off(event, callback);
  }, [event, callback]);
};