import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { generateCharacter } from "../../../socketServer";

export const socket = io("http://localhost:3003", {
  autoConnect: false,
});

export const SocketManager = (props: {
  setCharacters: React.Dispatch<
    React.SetStateAction<ReturnType<typeof generateCharacter>[]>
  >;
}) => {
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      console.log("connected");
    };
    const onDisconnect = () => {
      console.log("disconnected");
    };
    const onMessage = data => {
      console.log(data);
    };
    const onHello = () => {
      console.log("hello");
    };

    const onCharacters = value => {
      console.log("characters", value);
      props.setCharacters([...value]);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);
    socket.on("hello", onHello);
    socket.on("characters", onCharacters);

    if (!connected) {
      socket.connect();
      setConnected(true);
    }

    return () => {
      socket.off("message");
      socket.off("hello");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("characters");
    };
  }, []);

  return <></>;
};
