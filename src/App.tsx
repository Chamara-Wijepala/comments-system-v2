import { useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection } from "firebase/firestore";
import { LogInButton, LogOutButton } from "components/auth";
import CreateCommentForm from "components/create-comment-form";

import { auth, db } from "firebase-config";

export const commentsRef = collection(db, "comments");

function App() {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (userObj) => setUser(userObj || null));

  return (
    <>
      <header className="box-shadow-92 bg-primary-100">
        <div className="container">
          {user ? <LogOutButton /> : <LogInButton />}
        </div>
      </header>

      <main className="container m-block-2">
        <section className="create-comment-section">
          <CreateCommentForm />
        </section>
      </main>
    </>
  );
}

export default App;
