import { auth } from "@/firebase/clientApp";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

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
  const [favoriteCategories, setFavoriteCategories] = useState<string[] | null>(null);
  const [showFavoriteOnly, setShowFavoriteOnly] = useState(false);

  function toggleShowFavorite() {
    setShowFavoriteOnly((prev) => !prev);
  }

  useEffect(() => {
    async function getFavoriteCategories(userId: string) {
      const dbUser = await getUser(userId);
      setFavoriteCategories(dbUser ? dbUser.favoriteCategories : null);
    }
    if (user) {
      getFavoriteCategories(user.uid);
    }
  }, [user]);

  // Render page
  return (
    <div>
      <NavBar />
      <div className="flex flex-col bg-slate-300 min-h-screen p-10 space-y-5">
      <h1 className="text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Chapel Hill Restaurants</h1>
      <div className="flex justify-between">
        <button
          className="border border-black w-fit rounded-2xl py-1 px-4 bg-white hover:bg-slate-300"
          onClick={toggleShowFavorite}
        >
          Favorite Categories
        </button>
        <Link
          className="border border-black w-fit rounded-2xl py-1 px-4 bg-white hover:bg-slate-300"
          href={"/restaurants/create"}
        >
          Add Restaurant?
        </Link>
      </div>
      {showFavoriteOnly
        ? restaurants.map((restaurant) => {
            if (favoriteCategories?.includes(restaurant.category)) {
              return (
                <RestaurantCard
                  restaurant={restaurant}
                  key={restaurant.id}
                />
              );
            }
          })
        : restaurants.map((restaurant) => {
            return (
              <RestaurantCard
                restaurant={restaurant}
                key={restaurant.id}
              />
            );
          })}
    </div>
    </div>
    
    
  );
}

import RestaurantCard from "@/components/RestaurantCard";
import * as DataService from "@/lib/DataService";
import Restaurant from "@/models/Restaurant";
import Link from "next/link";
import { getUser } from "@/lib/DataService";
import { useEffect, useState } from "react";
import NavBar from "../navbar";

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
