import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
const auth = getAuth();

interface HomeProps {
  restaurants: Restaurant[];
}

export default function Restaurants({ restaurants }: HomeProps) {

  const router = useRouter(); 

  const handleSignOut = () => {
    auth.signOut();
    router.push("/");
  };




  return (
    <div className="flex flex-col bg-slate-300 min-h-screen p-10 space-y-5">
      <h1 className ="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Chapel Hill Restaurants</h1>
      <Restaurant_card restaurant={restaurants[0]} />
      <Restaurant_card restaurant={restaurants[0]} />
      <Restaurant_card restaurant={restaurants[0]} />
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}

import Restaurant_card from "@/components/Restaurant_card";
import * as DataService from "@/lib/DataService";
import Restaurant from "@/models/Restaurant";

export async function getStaticProps() {
  const restaurants = await DataService.getAllRestaurants();

  return { props: { restaurants: restaurants } };
}
