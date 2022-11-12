import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "components/loader";
import { LogInButton, LogOutButton } from "components/auth";
import CreateCommentForm from "components/create-comment-form";

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
      </main>
    </>
  );
}

export default App;
