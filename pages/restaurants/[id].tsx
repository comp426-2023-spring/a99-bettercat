import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import { initFirebase } from '@/firebase/clientApp'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const app = initFirebase();
const auth = getAuth();

/** Interface for the parameter of the `RestaurantView` component. */
interface RestaurantProps {
    restaurant: Restaurant;
    reviews: Review[];
    average_review: Number;
}

export default function RestaurantView({restaurant, reviews, average_review}: RestaurantProps) {

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
         <h3 className ="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{restaurant.name}</h3>
         <h3 className = "mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{restaurant.description}</h3>
         <div className="content-center">
            <a href={restaurant.website} className="inline-flex items-center justify-center  px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Website
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
        </div>
        <div>
            <h3>{reviews.length} review(s)</h3>
            <h3>{average_review.toString()+ "/5 stars"}</h3>
        </div>
        
         
        
        <h2 className=" text-center font-bold">Reviews</h2>
         <div className= "outline">
         {reviews?.map((reviews) =>
          <>
            <p><strong>{reviews.score}/5</strong></p>
            <p>{reviews.text}</p>
          </>)
        }
         </div>
         
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

interface RestaurantParams extends ParsedUrlQuery {
    slug: string
}

/**
 * Loads data on the server side as the page loads.
 * @returns properties for the `index` page with the data loaded.
 */
export async function getStaticProps(context: GetStaticPropsContext) {

    // Get router and ID from the URL.
    const { id } = context.params as RestaurantParams

    // Get restaurant data
    const restaurant = await DataService.getRestaurant(Array.isArray(id) ? id[0] : id!);
    const reviews = await DataService.getReviewsForRestaurant(Array.isArray(id) ? id[0] : id!);
    var average_review
    for(let review of reviews)
        average_review = (review.score / reviews.length) * reviews.length
    return {props: {restaurant: restaurant, reviews: reviews, average_review: average_review} }
}
