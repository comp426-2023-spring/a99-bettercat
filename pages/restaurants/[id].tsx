import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import { initFirebase } from '@/firebase/clientApp'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const app = initFirebase();
const auth = getAuth();

/** Interface for the parameter of the `ProgramView` component. */
interface RestaurantProps {
    restaurant: Restaurant;
}

export default function CourseView({restaurant}: RestaurantProps) {

  /* Load user authentication hook
   - user: Once authenticated user loads, user !== null.
   - loading: If authenticated state is loading, loading !== null.
   - error: If there was an error loading authentication, error !== null.
   > If all the above == null, then it means that no user is currently signed in.
   */
   const [user, loading, error] = useAuthState(auth);

   // Render page
   return(
     <div>
         <h1>Restaurant</h1>
         <h3>{restaurant.name}</h3>
       </div>
   );
}

/**
 * Returns that paths that have to be created at build time.
 * @returns static paths.
 */
export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {

    // Return such that no pages need to be created at build time,
    // and a "blocking" fallback. 
    return {
        paths: [], fallback: "blocking"
    };
}


import * as DataService from '@/lib/DataService'
import { ParsedUrlQuery } from "querystring";
import Restaurant from "@/models/Restaurant";
import { useAuthState } from "react-firebase-hooks/auth";

interface RestaurantParams extends ParsedUrlQuery {
    slug: string
}

export async function getStaticProps(context: GetStaticPropsContext) {

    // Get router and ID from the URL.
    const { id } = context.params as RestaurantParams

    // Get restaurant data
    const restaurant = await DataService.getRestaurant(Array.isArray(id) ? id[0] : id);

    return {props: {restaurant: restaurant} }
}