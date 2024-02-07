import React, { useEffect, useState } from "react";
import { createCommentAction } from "../../../serverAction/commentAction";
import { useFormState } from "react-dom";
import CommentButton from "./CommentButton";

const AddNewComment = ({ id }: { id: string }) => {
  const [data, setData] = useState("");
  // @ts-expect-error
  const [state, action] = useFormState(createCommentAction, {
    message: null,
  });

  return (
    <form action={action} className="w-full mt-4 relative">
      <input type="hidden" name="positId" value={id} />

      <input
        className="w-full py-2 rounded-full outline-none border border-slate-400 px-4"
        type="text"
        name="comment"
        id=""
        onChange={(e) => setData(e.target.value)}
        value={data}
        placeholder="type your comment"
      />
      <div className="absolute right-2  top-2">
        <CommentButton setData={setData} />
      </div>
    </form>
  );
};

export default AddNewComment;
