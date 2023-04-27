import { initFirebase } from "@/firebase/clientApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Head from "next/head";

const app = initFirebase();
const auth = getAuth();

interface HomeProps {
  restaurants: Restaurant[];
}
export default function Home({ restaurants }: HomeProps) {
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
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div className="flex flex-col bg-slate-300 min-h-screen p-10 space-y-5">
        <p>Signed In User: {user.email}</p>
        <button onClick={() => auth.signOut()}>Sign out</button>
        <h1>Restaurants</h1>
        {restaurants?.map((restaurant) => (
          <p>{restaurant.name}</p>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center bg-slate-300 min-h-screen">
      <h1 className="text-4xl font-bold mb-5">Welcome to Chapel Hill Eats</h1>
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
  );
}

import * as DataService from "@/lib/DataService";
import Restaurant from "@/models/Restaurant";

export async function getStaticProps() {
  const restaurants = await DataService.getAllRestaurants();

  return { props: { restaurants: restaurants } };
}

const authenticate = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};
