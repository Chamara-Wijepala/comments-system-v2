import { useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { LogInButton, LogOutButton } from "components/auth";

import { auth } from "firebase-config";

function App() {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (userObj) => setUser(userObj || null));

  return (
    <header className="box-shadow-92">
      <div className="container">
        {user ? <LogOutButton /> : <LogInButton />}
      </div>
    </header>
  );
}

export default App;
