import { initFirebase } from "@/firebase/clientApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const app = initFirebase();
const auth = getAuth();

export interface ReviewFormInfo {
    userId: string; // id of review author
    restaurantId: string; // id of restaurant 
    score: number; // score (out of five) user leaves for restaurant
    tags: [string]; // tags for review
    text: string; // Phone number used by the restaurant
}
export default function CreateReview() {
    /* Load user authentication hook
   - user: Once authenticated user loads, user !== null.
   - loading: If authenticated state is loading, loading !== null.
   - error: If there was an error loading authentication, error !== null.
   > If all the above == null, then it means that no user is currently signed in.
   */
  const [user, loading, error] = useAuthState(auth);

  const [reviewInfo, setReviewInfo] = useState({
    userId: auth.currentUser?.uid,// id of review author
    restaurantId: "", // id of restaurant 
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
  async function handleSubmit() {
    let data = reviewInfo;
    console.log(data.score)
    console.log(data.text)
  }

  return(
    <div className="flex flex-col bg-slate-300 sm:p-8 space-y-5 h-screen">
        <div className="p-2">
            <h1 className="mb-2 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Leave a Review</h1>
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