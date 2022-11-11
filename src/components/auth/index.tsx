import { signInWithPopup, signOut } from "firebase/auth";

import { auth, provider } from "firebase-config";

export function LogInButton() {
  return (
    <button
      type="button"
      onClick={() => {
        signInWithPopup(auth, provider);
      }}
      className="btn box-shadow-92"
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
      className="btn box-shadow-92"
    >
      Sign Out
    </button>
  );
}
