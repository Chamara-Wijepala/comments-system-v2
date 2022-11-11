import { useState } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import TextareaAutosize from "react-textarea-autosize";

import { auth } from "firebase-config";
import { commentsRef } from "App";

export default function CreateCommentForm() {
  const [textInput, setTextInput] = useState("");
  const user = auth.currentUser;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    addDoc(commentsRef, {
      userId: user?.uid,
      userName: user?.displayName,
      photo: user?.photoURL,
      body: textInput,
      parent: null,
      createdAt: serverTimestamp(),
    });

    setTextInput("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-column gap-1">
      <TextareaAutosize
        minRows={5}
        spellCheck
        required
        placeholder="Leave a comment..."
        maxLength={1000}
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        disabled={!user}
        className="text-area"
      />

      <button
        type="submit"
        disabled={!user}
        className="post-comment-btn btn-small box-shadow-92 align-self-end"
      >
        Post
      </button>
    </form>
  );
}
