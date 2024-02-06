import React from "react";
import MainProfile from "./MainProfile";
import SideBar from "../HomePage/SideBar";
import RightSideBar from "../HomePage/RightSideBar";

const ProfilePage = ({ posts }: any) => {
  return (
    <div>
      <div className="flex justify-between relative">
        <SideBar />

        <MainProfile posts={posts} />

        <RightSideBar />
      </div>
    </div>
  );
};

export default ProfilePage;