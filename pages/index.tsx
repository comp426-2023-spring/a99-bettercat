import { initFirebase } from '@/firebase/clientApp'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import Head from 'next/head'

const app = initFirebase();
const auth = getAuth();

/** Interface for the parameter of the `Home` component. */
interface HomeProps {
  restaurants: Restaurant[];
}
export default function Home({restaurants}: HomeProps) {

  /* Load user authentication hook
   - user: Once authenticated user loads, user !== null.
   - loading: If authenticated state is loading, loading !== null.
   - error: If there was an error loading authentication, error !== null.
   > If all the above == null, then it means that no user is currently signed in.
   */
  const [user, loading, error] = useAuthState(auth);

  // Render a page when there is an error loading the authentication state
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  // Render a page when the authentication state is loading
  if (loading) {
    return <p>Loading...</p>;
  }
  // Render a page when a user is signed in and stores user data in object `user`
  if (user) {
    return (
      <div>
        <p>Signed In User: {user.email}</p>
        <button onClick={() => auth.signOut()}>Sign out</button>
        <h1>Restaurants</h1>
        {restaurants?.map((restaurant) =>
          <p>{restaurant.name}</p>)
        }
      </div>
    );
  }
  // Render a page when a user is not signed in
  return (
    <div className="App">
      <button onClick={() => authenticate()}>Sign In</button>
    </div>
  );
}

import * as DataService from '@/lib/DataService'
import Restaurant from '@/models/Restaurant';

/**
 * Loads data on the server side as the page loads.
 * @returns properties for the `index` page with the data loaded.
 */
export async function getStaticProps() {

    const restaurants = await DataService.getAllRestaurants();

    return {props: { restaurants: restaurants} }
}

const authenticate = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}
