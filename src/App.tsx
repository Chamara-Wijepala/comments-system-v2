import { Routes, Route } from "react-router-dom";
import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "components/loader";
import { LogInButton, LogOutButton } from "components/auth";
import CreateCommentForm from "components/create-comment-form";
import {
  RenderTopLevelComments,
  RenderReply,
} from "components/comment-section";

import { auth, db } from "firebase-config";

export const commentsRef = collection(db, "comments");

function App() {
  const [user, loading] = useAuthState(auth);

  return loading ? (
    <Loader />
  ) : (
    <>
      <header className="header-main | bg-primary-100">
        <div className="container container-lg">
          {user ? <LogOutButton /> : <LogInButton />}
        </div>
      </header>

      <main className="container container-md m-block-2">
        <section className="create-comment-section">
          <CreateCommentForm />
        </section>

        <hr className="divider m-block-3" />

        <Routes>
          <Route path="/" element={<RenderTopLevelComments />} />
          <Route path="/:id" element={<RenderReply />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
