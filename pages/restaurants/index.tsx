import { initFirebase } from "@/firebase/clientApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import Head from "next/head";

const app = initFirebase();
const auth = getAuth();

/** Interface for the parameter of the `Restaurants` component. */
interface RestaurantsProps {
  restaurants: Restaurant[];
}
export default function Restaurants({ restaurants }: RestaurantsProps) {
  /* Load user authentication hook
   - user: Once authenticated user loads, user !== null.
   - loading: If authenticated state is loading, loading !== null.
   - error: If there was an error loading authentication, error !== null.
   > If all the above == null, then it means that no user is currently signed in.
   */
  const [user, loading, error] = useAuthState(auth);

  // Render page
  return (
    <div className="flex flex-col bg-slate-300 min-h-screen p-10 space-y-5">
      <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Chapel Hill Restaurants</h1>
      <Restaurant_card restaurant={restaurants[0]} />
      <Restaurant_card restaurant={restaurants[1]} />
    </div>
  );
}

import Restaurant_card from "@/components/Restaurant_card";
import * as DataService from "@/lib/DataService";
import Restaurant from "@/models/Restaurant";

/**
 * Loads data on the server side as the page loads.
 * @returns properties for the `index` page with the data loaded.
 */
export async function getStaticProps() {
  const restaurants = await DataService.getAllRestaurants();
  return { props: { restaurants: restaurants } };
}

/**
 * Helper method that allows authentication with the Firebase Google auth provider.
 */
const authenticate = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};
