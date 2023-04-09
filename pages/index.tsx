import { initFirebase } from "@/firebase/clientApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import Head from "next/head";

const app = initFirebase();
const auth = getAuth();

<<<<<<< HEAD
export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  const [restaurants, restaurantsLoading, restaurantsError] = useCollection(collection(getFirestore(app), "restaurants"));

=======
/** Interface for the parameter of the `Home` component. */
interface HomeProps {
  restaurants: Restaurant[];
}
export default function Home({restaurants}: HomeProps) {

  const [user, loading, error] = useAuthState(auth);

>>>>>>> fce874d8ee9b18b4b33edd1f1a63f0fac4510293
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
<<<<<<< HEAD
        {restaurants?.docs.map((doc) => (
          <p>{doc.get("name")}</p>
        ))}
=======
        {restaurants?.map((restaurant) =>
          <p>{restaurant.name}</p>)
        }
>>>>>>> fce874d8ee9b18b4b33edd1f1a63f0fac4510293
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

const authenticate = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};
