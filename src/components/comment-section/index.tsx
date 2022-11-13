import { useLocation, Link } from "react-router-dom";
import {
  query,
  where,
  limit,
  doc,
  QueryDocumentSnapshot,
  DocumentData,
  FirestoreDataConverter,
  WithFieldValue,
} from "firebase/firestore";
import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import Comment from "components/comment";

import { db } from "firebase-config";

import { commentsRef } from "App";

import { IComment } from "types";

const converter: FirestoreDataConverter<IComment> = {
  toFirestore(comment: WithFieldValue<IComment>): DocumentData {
    return {
      ...comment,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): IComment {
    const data = snapshot.data();
    return {
      docId: snapshot.id,
      userId: data.userId,
      userName: data.userName,
      photo: data.photo,
      body: data.body,
      parent: data.parent,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
};

export function RenderTopLevelComments() {
  const q = query(commentsRef, where("parent", "==", null)).withConverter(
    converter
  );

  const [snapshot, loading] = useCollectionData<IComment>(q);

  return (
    <section>
      {loading ? (
        <div>Loading...</div>
      ) : (
        snapshot?.map((document) => (
          <Parent key={document.docId} comment={document} />
        ))
      )}
    </section>
  );
}

export function RenderReply() {
  // gets the id of the document to retrieve from the current url
  const docId = useLocation().pathname.split("/")[1];

  const docRef = doc(db, "comments", docId).withConverter(converter);

  const [snapshot, loading] = useDocumentData<IComment>(docRef);

  return (
    <section>
      {loading ? (
        <div>Loading...</div>
      ) : (
        snapshot && <Parent comment={snapshot} />
      )}
    </section>
  );
}

function Parent({ comment }: { comment: IComment }) {
  const q = query(
    commentsRef,
    where("parent", "==", comment.docId)
  ).withConverter(converter);

  const [snapshot, loading] = useCollectionData<IComment>(q);

  return (
    <>
      <Comment comment={comment} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        snapshot?.map((document) => (
          <FirstReply key={document.docId} comment={document} />
        ))
      )}
    </>
  );
}

function FirstReply({ comment }: { comment: IComment }) {
  const q = query(
    commentsRef,
    where("parent", "==", comment.docId)
  ).withConverter(converter);

  const [snapshot, loading] = useCollectionData<IComment>(q);

  return (
    <>
      <Comment comment={comment} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        snapshot?.map((document) => (
          <LastReply key={document.docId} comment={document} />
        ))
      )}
    </>
  );
}

function LastReply({ comment }: { comment: IComment }) {
  const q = query(
    commentsRef,
    where("parent", "==", comment.docId),
    limit(1)
  ).withConverter(converter);

  const [snapshot, loading] = useCollectionData<IComment>(q);

  return (
    <>
      <Comment comment={comment} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        snapshot &&
        snapshot.length > 0 && <Link to={comment.docId}>See more replies</Link>
      )}
    </>
  );
}
