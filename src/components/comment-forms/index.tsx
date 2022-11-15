import { useState } from "react";
import {
  addDoc,
  updateDoc,
  Timestamp,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import TextareaAutosize from "react-textarea-autosize";

import { auth } from "firebase-config";
import { commentsRef } from "App";

export function CreateComment() {
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
      createdAt: Timestamp.now(),
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
      />

      <button
        type="submit"
        disabled={!user}
        className="post-comment-btn btn-small btn--accent border border--accent align-self-end"
      >
        Post
      </button>
    </form>
  );
}

export function ReplyToComment({
  parent,
  setIsBeingRepliedTo,
}: {
  parent: string;
  setIsBeingRepliedTo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [textInput, setTextInput] = useState("");
  const user = auth.currentUser;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    addDoc(commentsRef, {
      userId: user?.uid,
      userName: user?.displayName,
      photo: user?.photoURL,
      body: textInput,
      parent,
      createdAt: Timestamp.now(),
    });

    setIsBeingRepliedTo(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-column gap-1">
      <TextareaAutosize
        minRows={5}
        spellCheck
        required
        maxLength={1000}
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />

      <div className="flex gap-1">
        <button
          type="submit"
          className="btn-xs btn--accent border border--accent align-self-start"
        >
          Reply
        </button>

        <button
          type="button"
          className="btn-xs btn--accent border border--accent align-self-start"
          onClick={() => setIsBeingRepliedTo(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export function UpdateComment({
  body,
  docRef,
  setIsBeingUpdated,
}: {
  body: string;
  docRef: DocumentReference<DocumentData>;
  setIsBeingUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [textInput, setTextInput] = useState(body);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateDoc(docRef, {
      body: textInput,
      updatedAt: Timestamp.now(),
    });

    setIsBeingUpdated(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-column gap-1">
      <TextareaAutosize
        spellCheck
        required
        maxLength={1000}
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />

      <div className="flex gap-1">
        <button
          type="submit"
          className="btn-xs btn--accent border border--accent align-self-start"
        >
          Update
        </button>

        <button
          type="button"
          className="btn-xs btn--accent border border--accent align-self-start"
          onClick={() => setIsBeingUpdated(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
