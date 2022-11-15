import { deleteDoc, doc } from "firebase/firestore";
import { DateTime } from "luxon";

import { auth, db } from "firebase-config";

import { IComment } from "types";

import "./style.css";

function relativeTimeFormat(timestamp: number) {
  return DateTime.fromMillis(timestamp).toRelative();
}

export default function Comment({
  comment,
  isBeingRepliedTo,
  setIsBeingRepliedTo,
}: {
  comment: IComment;
  isBeingRepliedTo: boolean;
  setIsBeingRepliedTo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const user = auth.currentUser;

  const docRef = doc(db, "comments", comment.docId);

  return (
    <div className="comment | bg-primary-100 m-block-1 flex flex-column gap-1">
      <div className="flex flex-align-center gap-1">
        <img src={comment.photo} alt="" className="comment__image" />

        <div className="flex flex-wrap gap-1">
          <p className="fw-bold">{comment.userName}</p>

          <p>{relativeTimeFormat(comment.createdAt.seconds * 1000)}</p>
        </div>
      </div>

      <p className="comment__body">{comment.body}</p>

      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => setIsBeingRepliedTo(true)}
          disabled={isBeingRepliedTo}
          className="btn-xs btn--accent border border--accent"
        >
          Reply
        </button>

        <button
          type="button"
          className="btn-xs btn--accent border border--accent"
        >
          Edit
        </button>

        {user?.uid === comment.userId && (
          <button
            type="button"
            onClick={() => deleteDoc(docRef)}
            className="comment__delete-btn | btn-xs btn--accent border border--accent"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
