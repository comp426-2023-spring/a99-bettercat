import { initFirebase } from "@/firebase/clientApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import Head from "next/head";

const app = initFirebase();
const auth = getAuth();

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  const [restaurants, restaurantsLoading, restaurantsError] = useCollection(collection(getFirestore(app), "restaurants"));

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
        <h1>Restaurants</h1>
        {restaurants?.docs.map((doc) => (
          <p>{doc.get("name")}</p>
        ))}
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
};
