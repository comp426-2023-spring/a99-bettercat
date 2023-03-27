import { initFirebase } from '@/firebase/clientApp'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Head from 'next/head'

const app = initFirebase();
console.log(app);

const auth = getAuth();

export default function Home() {

  const [user, loading, error] = useAuthState(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User: {user.email}</p>
        <button onClick={() => auth.signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div className="App">
      <button onClick={() => authenticate()}>Sign In</button>
    </div>
  );
}

const authenticate = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}
