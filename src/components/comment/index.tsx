import { useState } from "react";
import { doc } from "firebase/firestore";
import { DateTime } from "luxon";
import { UpdateComment } from "components/comment-forms";
import { DeleteConfirmationModal } from "components/modal";

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
  const [isBeingUpdated, setIsBeingUpdated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = auth.currentUser;

  const docRef = doc(db, "comments", comment.docId);

  return (
    <div className="comment | bg-primary-100 m-block-1 flex flex-column gap-1">
      {isModalOpen && (
        <DeleteConfirmationModal
          docRef={docRef}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      <div className="flex flex-align-center gap-1">
        <img src={comment.photo} alt="profile" className="comment__image" />

        <div className="flex flex-wrap gap-1">
          <p className="fw-bold">{comment.userName}</p>

          <p>
            {comment.updatedAt
              ? `Updated ${relativeTimeFormat(
                  comment.updatedAt.seconds * 1000
                )}`
              : relativeTimeFormat(comment.createdAt.seconds * 1000)}
          </p>
        </div>
      </div>

      {isBeingUpdated ? (
        <UpdateComment
          body={comment.body}
          docRef={docRef}
          setIsBeingUpdated={setIsBeingUpdated}
        />
      ) : (
        <p className="comment__body">{comment.body}</p>
      )}

      <div className="flex gap-1">
        {user && (
          <button
            type="button"
            onClick={() => setIsBeingRepliedTo(true)}
            disabled={isBeingRepliedTo}
            className="btn-xs btn--accent border border--accent"
          >
            Reply
          </button>
        )}

        {user?.uid === comment.userId && (
          <>
            <button
              type="button"
              disabled={isBeingUpdated}
              onClick={() => setIsBeingUpdated(true)}
              className="btn-xs btn--accent border border--accent"
            >
              Edit
            </button>

            <button
              type="button"
              disabled={isBeingRepliedTo || isBeingUpdated}
              onClick={() => setIsModalOpen(true)}
              className="comment__delete-btn | btn-xs btn--danger border border--danger"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
