import Image from "next/image";
import React from "react";
import { MdEdit } from "react-icons/md";
import NewPost from "../HomePage/NewPost";
import Card from "../HomePage/Card";
import { getServerCredentials } from "../../../actions/sersverSession";

const MainProfile = async ({ posts }: any) => {
  const session = await getServerCredentials();

  return (
    <div className="flex-1 my-2">
      <div className="flex lg:flex-row justify-around flex-col gap-3 px-4 py-4   w-full">
        <div className="w-40 relative h-40 rounded-full  ">
          <Image
            className="object-cover w-full h-full rounded-full"
            src="https://github.com/shadcn.png"
            alt=""
            fill
          />
          <div className="absolute right-0 bottom-6">
            <button>
              {" "}
              <MdEdit size={25} className="" />
            </button>
          </div>
        </div>
        <div>
          <div>
            <h1>
              <span className="font-semibold "> Name : </span>
              {session?.user?.name}
            </h1>
            <h1>
              <span className="font-semibold "> Email : </span>
              easin@gmail.com
            </h1>
            <h1>
              <span className="font-semibold "> TotalPost : </span>
              10
            </h1>
          </div>
          <div className="mt-4">
            <button className="bg-teal-800 text-white px-4 py-2 rounded-md ">
              Update Your Profile
            </button>
          </div>
        </div>
      </div>
      <div className="border flex flex-col gap-10 items-center flex-1 py-4">
        <NewPost />
        {posts &&
          posts.length > 0 &&
          posts.map((item: any) => <Card key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default MainProfile;
