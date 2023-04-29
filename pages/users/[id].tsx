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
    favoriteRestaurants: Restaurant[];
}

export default function UserView({dbUser, reviews, favoriteRestaurants}: UserProps) {

    /* Load user authentication hook
     - user: Once authenticated user loads, user !== null.
     - loading: If authenticated state is loading, loading !== null.
     - error: If there was an error loading authentication, error !== null.
     > If all the above == null, then it means that no user is currently signed in.
     */
    const [user, loading, error] = useAuthState(auth);

    return (
        <div className="flex flex-col bg-orange-50 min-h-screen p-10 space-y-5">
            <h3 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{"User: " + user?.displayName}</h3>
            <div className="self-center">
                
            </div>
            <div className="flex flex-row pd- 10 space-x-5">
                <div className="bg-green-100 rounded-lg p-10 drop-shadow-lg grow">
                    <center>
                        <h1 className="font-extrabold text-3xl">My Favorite Categories</h1>
                    </center>
                    <ul>
                        <center>
                        {dbUser && dbUser.favoriteCategories && dbUser.favoriteCategories.length === 0 ? (
                            <li>You have not marked any favorite categories yet.</li>
                        ) : (
                            dbUser.favoriteCategories.map((category, index) => (
                                <li key={index}>{category}</li>
                            ))
                        )}
                        </center>
                    </ul>
                </div>
                <div className="bg-teal-100 rounded-lg p-10 drop-shadow-lg grow">
                    <center>
                        <h1 className="font-extrabold text-3xl">My Favorite Restaurants</h1>      
                    </center>
                    <ul>
                        {dbUser && dbUser.favoriteRestaurants && dbUser.favoriteRestaurants.length === 0 && favoriteRestaurants ? (
                            <li>You have not marked any favorite restaurants yet.</li>
                        ) : (
                            favoriteRestaurants.map((restaurant, index) => (
                                <li key={index}>{restaurant.name}</li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
            <div className="bg-cyan-200 rounded-lg p-10 drop-shadow-lg">
            <h1 className="font-extrabold text-3xl">Reviews</h1>
            <div className= "flex flex-row gap-10">
            {reviews?.map((reviews) =>
            <>
                <div className="p-10 rounded-lg bg-indigo-200">
                    <p className="align-middle"><strong>{reviews.score}/5</strong></p>
                    <p>{reviews.text}</p>
                </div>
                
            </>)
            }
            </div>
            </div>
            
            <div>
                <h3>{reviews.length} review(s)</h3>
            </div>

        </div>
    );
}

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

    // Get user data
    const reviews = await DataService.getReviewsFromUser(Array.isArray(id) ? id[0] : id!);
    let dbUser = await DataService.getUser(Array.isArray(id) ? id[0] : id!);

    // Get favorite restaurants of user
    const allRestaurants = await DataService.getAllRestaurants();
    const favoriteRestaurants: Restaurant[] = allRestaurants.filter((e) => dbUser.favoriteRestaurants.includes(e.id))

    return {props: {dbUser: dbUser, reviews: reviews, favoriteRestaurants: favoriteRestaurants} }
}