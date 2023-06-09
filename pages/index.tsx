import { auth } from "@/firebase/clientApp";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

import NavBar from "./navbar";
import Restaurant from "@/models/Restaurant";

/** Interface for the parameter of the `Home` component. */
interface HomeProps {
  restaurants: Restaurant[];
}
export default function Home({ restaurants }: HomeProps) {
  /* Load user authentication hook
   - user: Once authenticated user loads, user !== null.
   - loading: If authenticated state is loading, loading !== null.
   - error: If there was an error loading authentication, error !== null.
   > If all the above == null, then it means that no user is currently signed in.
   */
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/restaurants");
    }
  }, [user]);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  // Render a page when the authentication state is loading
  if (loading) {
    return <LoadingSpinner />;
  }
  // Render a page when a user is signed in and stores user data in object `user`
  if (user) {
    return <LoadingSpinner />;
  }
  // Render a page when a user is not signed in
  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="flex flex-col items-center justify-center bg-slate-300 min-h-screen">
        <h1 className="text-4xl font-bold mb-5">Welcome to UNC Eats</h1>
        <p className="text-lg mb-10">Sign in to get started:</p>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => authenticate()}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

import * as DataService from "@/lib/DataService";
import LoadingSpinner from "@/components/LoadingSpinner";
import { UserDoesNotExistException } from "@/lib/DataService";

/**
 * Loads data on the server side as the page loads.
 * @returns properties for the `index` page with the data loaded.
 */
export async function getStaticProps() {
  const restaurants = await DataService.getAllRestaurants();
  return { props: { restaurants: restaurants } };
}

const authenticate = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const uid = user.uid;

  // Add the user to Firestore if it does not currently exist (i.e., new user)
  
  // Attempt to load the user
  try {
    const getUserResult = await DataService.getUser(uid);
    // If sucessfull, just authenticate and log.
    await DataService.logUserAuthentication(uid, "auth");

  }
  catch(e) {
    // If an error was thrown above, it means that  the user does not exist.
    if(e instanceof UserDoesNotExistException) {
      await DataService.createUser(
        {
          id: uid,
          favoriteCategories: [],
          favoriteRestaurants: [],
        },
        uid
      );
    }
    
    // Log user authentication
    await DataService.logUserAuthentication(uid, "auth");

  }

};
