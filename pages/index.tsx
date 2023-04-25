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
        <h1>Restaurants</h1>
        {restaurants?.map((restaurant) =>
          <p>{restaurant.name}</p>)
        }
      </div>
    );
  }
  return (
    <div className="App">
      <button onClick={() => authenticate()}>Sign In</button>
    </div>
  );
}

import * as DataService from '@/lib/DataService'
import Restaurant from '@/models/Restaurant';

export async function getStaticProps() {

    const restaurants = await DataService.getAllRestaurants();

    return {props: { restaurants: restaurants} }
}

const authenticate = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const uid = user.uid;

  // Add the user to Firestore if it does not currently exist (i.e., new user)
  const getUserResult = await DataService.getUser(uid)

  console.log(getUserResult);

  if(getUserResult == undefined) {
    await DataService.createUser({
      id: uid,
      favoriteCategories: [],
      favoriteRestaurants: []
    }, uid)
  }
}
