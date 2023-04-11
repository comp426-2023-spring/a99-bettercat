import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import { initFirebase } from '@/firebase/clientApp'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const app = initFirebase();
const auth = getAuth();

/** Interface for the parameter of the `UserView` component. */
interface UserProps {
    dbUser: User;
    reviews: Review[];
}

export default function UserView({dbUser, reviews}: UserProps) {

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
         <h1>User</h1>
         <h3>{user?.displayName}</h3>
         <h2>Reviews</h2>
         {reviews?.map((reviews) =>
          <>
            <p><strong>{reviews.score}/5</strong></p>
            <p>{reviews.text}</p>
          </>)
        }
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
import Review from "@/models/Review";
import User from "@/models/User";

interface UserParams extends ParsedUrlQuery {
    slug: string
}

/**
 * Loads data on the server side as the page loads.
 * @returns properties for the `index` page with the data loaded.
 */
export async function getStaticProps(context: GetStaticPropsContext) {

    // Get router and ID from the URL.
    const { id } = context.params as UserParams

    // Get restaurant data
    const dbUser = await DataService.getUser(Array.isArray(id) ? id[0] : id!);
    const reviews = await DataService.getReviewsFromUser(Array.isArray(id) ? id[0] : id!);
    return {props: {user: dbUser, reviews: reviews} }
}
