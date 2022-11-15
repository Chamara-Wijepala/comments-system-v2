import { IComment } from "types";

import "./style.css";

export default function Comment({ comment }: { comment: IComment }) {
  return (
    <div className="comment | bg-primary-100 m-block-1 flex flex-column gap-1">
      <div className="flex flex-align-center gap-1">
        <img src={comment.photo} alt="" className="comment__image" />

        <div className="flex flex-wrap gap-1">
          <p className="fw-bold">{comment.userName}</p>

          <p>{comment.createdAt.seconds}</p>
        </div>
      </div>

      <p className="comment__body">{comment.body}</p>

      <div className="flex gap-1">
        <button
          type="button"
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

        <button
          type="button"
          className="comment__delete-btn | btn-xs btn--accent border border--accent"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
