import { initFirebase } from "@/firebase/clientApp";
import Restaurant from "@/models/Restaurant";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import * as DataService from "@/lib/DataService";
import Review from "@/models/Review";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";

const app = initFirebase();
const auth = getAuth();

export interface ReviewFormInfo {
    userId: string; // id of review author
    restaurantId: string; // id of restaurant 
    score: number; // score (out of five) user leaves for restaurant
    tags: [string]; // tags for review
    text: string; // Phone number used by the restaurant
}

interface CreateReviewProps{
    restaurant: Restaurant;
}
export default function CreateReview({ restaurant }: CreateReviewProps) {
    /* Load user authentication hook
   - user: Once authenticated user loads, user !== null.
   - loading: If authenticated state is loading, loading !== null.
   - error: If there was an error loading authentication, error !== null.
   > If all the above == null, then it means that no user is currently signed in.
   */
  const [user, loading, error] = useAuthState(auth);

  const [reviewInfo, setReviewInfo] = useState({
    restaurantId: restaurant.id, // id of restaurant 
    score: 0, // score (out of five) user leaves for restaurant
    tags: [""], // tags for review
    text: "", 
  } as ReviewFormInfo);


  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setReviewInfo((prev) => {
        return {
          ...prev,
          [name]: value,
          //[name]: name === "price" ? Number(value) : value,
        };
      });
  }
  
  function scoreChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const { name, value } = e.target;
    setReviewInfo((prev) => {
        return{
            ...prev,
            [name]: Number(value),
        }
    })
  }

  const router = useRouter();
  async function handleSubmit() {
    let data = reviewInfo;
    console.log(data.score)
    console.log(data.text)
    let review: ReviewFormInfo = {
      userId: user!.uid,
      restaurantId: data.restaurantId,
      score: data.score,
      tags: data.tags,
      text: data.text
    }
    await DataService.createReview(review as unknown as Review)

    router.push("/restaurants/" + data.restaurantId);
  }

  return(
    <div className="flex flex-col bg-slate-300 sm:p-8 space-y-5 h-screen">
        <div className="p-2">
            <h1 className="mb-2 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Leave a Review</h1>
            <h2 className="block text-xl text-center pb-2">{restaurant.name}</h2>
            <div className="border border-black flex flex-col items-center gap-2 bg-white rounded-3xl p-4 ">
            <div className="flex flex-col w-80 sm:w-96 md:w-[500px] lg:w-[750px] space-y-5">
            <h2 className="block text-2xl">Please Rate Your Experience:</h2>
                <div className= "flex flex-row items-center space-x-20 text-lg">
                    <input 
                    type="radio" 
                    name="score" 
                   //checked ={reviewInfo.score == 1}
                    onChange={scoreChange}
                    value={1}
                    /> 1
                    <input 
                    type="radio" 
                    name="score" 
                    onChange={handleChange} 
                    value={2}
                    /> 2
                    <input 
                    type="radio" 
                    name="score" 
                    onChange={handleChange} 
                    value={3}
                    /> 3
                    <input 
                    type="radio" 
                    name="score" 
                    onChange={handleChange} 
                    value={4}
                    /> 4
                    <input 
                    id = "radio5"
                    type="radio" 
                    name="score" 
                    onChange={handleChange} 
                    value={5}
                    /> 5    
                </div>
               
                <label className="block text-2xl">Tell Us About Your Experience:</label>
                    <input
                    className="border border-black rounded-xl px-2"
                    type="text"
                    name="text"
                    onChange={handleChange}
                    value={reviewInfo.text}
                    />
                
                <button
                className="mt-4 border border-black rounded-2xl px-24 py-3 text-lg font-bold bg-white hover:bg-slate-300"
                onClick={handleSubmit}
                >
                    Submit
                </button>
          </div>
            </div>
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
    paths: [],
    fallback: "blocking",
  };
};

interface RestaurantParams extends ParsedUrlQuery {
  slug: string;
}
/**
 * Loads data on the server side as the page loads.
 * @returns properties for the `index` page with the data loaded.
 */
export async function getStaticProps(context: GetStaticPropsContext) {
  // Get router and ID from the URL.
  const { id } = context.params as RestaurantParams;

  // Get restaurant data
  const restaurant = await DataService.getRestaurant(Array.isArray(id) ? id[0] : id!);


  return { props: { restaurant: restaurant} };
}