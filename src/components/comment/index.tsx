import { IComment } from "types";

export default function Comment({ comment }: { comment: IComment }) {
  return <div>{comment.body}</div>;
}
