import React, { useEffect, useRef, useState } from "react";
import MessageNavbar from "./MessageNavbar";

import Sender from "./Sender";
import Receiver from "./Receiver";
import { findAllMessageAction } from "../../../serverAction/findConversationAction";
import toast from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
import { useSession } from "next-auth/react";
import { createNewMessageAction } from "../../../serverAction/createNewMessageAction";
import { pusherClient } from "@/lib/pusher";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const MessengerChatBox = ({ open, setOpen }: { open: any; setOpen: any }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const converId = searchParams.get("converId");
  const receiverId = searchParams.get("userId");

  const scrollRef = useRef<HTMLDivElement>(null);
  const [allMessage, setAllMessages] = useState<any>([]);
  const [message, setMessage] = useState<string>("");

  const { data: session } = useSession();

  const fetchData = async () => {
    setOpen(true);

    const result = await findAllMessageAction({ converId: converId });

    if (result.message) {
      setAllMessages(result.message);
    } else {
      toast.error(result.error);
    }
  };

  useEffect(() => {
    if (converId) {
      fetchData();
    }
  }, [converId]);

  useEffect(() => {
    //@ts-ignore
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessage]);

  const onSendMessageHandler = async (e: any) => {
    e.preventDefault();
    const sendData = {
      senderId: session?.user.id,
      receiverId: receiverId,
      conversationId: converId,
      text: message,
    };

    //setAllMessages((prevData: any) => [...prevData, sendData]);
    await createNewMessageAction(sendData);

    setMessage("");
  };

  useEffect(() => {
    const channel = pusherClient.subscribe(`${converId}`);
    channel.bind("messenger", function (data: any) {
      setAllMessages((prevData: any) => [...prevData, data]);
    });

    return () => {
      pusherClient.unsubscribe(`${converId}`);
    };
  }, [converId, allMessage]);

  return (
    <div
      className={`flex-1 border relative ${!open ? "sm:block hidden " : ""}`}
    >
      <MessageNavbar open={open} setOpen={setOpen} />
      <div className="flex flex-col h-full esm:max-h-[468px] max-h-[658px] overflow-y-auto ">
        {allMessage.length > 0 &&
          allMessage.map((item: any, i: any) => (
            <div key={i} ref={scrollRef}>
              {item.senderId === session?.user.id ? (
                <Sender item={item} />
              ) : (
                <Receiver item={item} />
              )}
            </div>
          ))}
      </div>
      <div className="absolute bottom-0 w-full left-0">
        <form
          onSubmit={onSendMessageHandler}
          className="flex flex-row justify-between  relative  "
        >
          <input
            disabled={!converId}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            name=""
            placeholder="type your message"
            id=""
            className="border border-slate-600 py-2 w-full px-2 rounded-md outline-none"
          />
          <button
            disabled={!converId}
            type="submit"
            className="absolute right-2 top-0 bottom-0 m-auto"
          >
            <IoMdSend size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessengerChatBox;
