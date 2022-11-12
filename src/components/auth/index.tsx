import { signInWithPopup, signOut } from "firebase/auth";

import { auth, provider } from "firebase-config";

export function LogInButton() {
  return (
    <button
      type="button"
      onClick={() => {
        signInWithPopup(auth, provider);
      }}
      className="btn btn--accent border border--accent"
    >
      Sign In With Google
    </button>
  );
}

export function LogOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut(auth)}
      className="btn btn--accent border border--accent"
    >
      Sign Out
    </button>
  );
}
