import React from "react";
import Chat from "./Chat";
import { fetchAllUsers, fetchUser } from "../../../actions/fetchPost";
import { getServerCredentials } from "../../../actions/sersverSession";

const RightSideBar = async () => {
  let user;

  const my = await getServerCredentials();
  if (my?.user) {
    user = await fetchAllUsers();
  }

  return (
    <div className="max-w-64 min-w-64 py-4 lg:flex hidden flex-col gap-6 items-center border h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <div>
        <h1 className="font-semibold ms-2 text-lg text-center ">
          {my
            ? "Make Friends to start Chat"
            : "Please login to start chat with your friend"}
        </h1>
      </div>
      {my && user?.map((item) => <Chat key={item.id} items={item} />)}
    </div>
  );
};

export default RightSideBar;
