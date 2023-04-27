import { initFirebase } from "@/firebase/clientApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import Head from "next/head";

import RestaurantCard from "@/components/RestaurantCard";
import * as DataService from "@/lib/DataService";
import Restaurant, { RestaurantHours, RestaurantHoursSchedule } from "@/models/Restaurant";
import { useState } from "react";

const app = initFirebase();
const auth = getAuth();

interface RestaurantFormInfo {
  name: string; // Name of the restaurant
  category: string; // Category of the restaurant (Mediterranean, Indian, etc.)
  address: string; // String representation of restaurant's location
  phone: string; // Phone number used by the restaurant
  website: string; // Website used by the restaurant
  description: string; // Description of the restaurant
  hours: RestaurantHoursSchedule; // Describes the restaurant's hours of operation
  price: number; // Representation of average cost ( 1 = $, 2 = $$, 3 = $$$, 4 = $$$$)
}

const initRestaurantHour: RestaurantHours = {
  open: 900,
  close: 2200,
};

export default function Restaurants() {
  /* Load user authentication hook
   - user: Once authenticated user loads, user !== null.
   - loading: If authenticated state is loading, loading !== null.
   - error: If there was an error loading authentication, error !== null.
   > If all the above == null, then it means that no user is currently signed in.
   */
  const [user, loading, error] = useAuthState(auth);

  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "", // Name of the restaurant
    category: "", // Category of the restaurant (Mediterranean, Indian, etc.)
    address: "", // String representation of restaurant's location
    phone: "", // Phone number used by the restaurant
    website: "", // Website used by the restaurant
    description: "", // Description of the restaurant
    hours: {
      sunday: initRestaurantHour,
      monday: initRestaurantHour,
      tuesday: initRestaurantHour,
      wednesday: initRestaurantHour,
      thursday: initRestaurantHour,
      friday: initRestaurantHour,
      saturday: initRestaurantHour,
    } as RestaurantHoursSchedule, // Describes the restaurant's hours of operation
    price: 2, // Representation of average cost ( 1 = $, 2 = $$, 3 = $$$, 4 = $$$$)
  } as RestaurantFormInfo);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setRestaurantInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  // Render page
  return (
    <div className="flex flex-col bg-slate-300 min-h-screen p-10 space-y-5">
      <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Add Restaurant</h1>

      <div>
        <div>
          <label>Restaurant Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={restaurantInfo.name}
          />
        </div>
        <div>
          <label>Restaurant Category:</label>
          <input
            type="text"
            name="category"
            onChange={handleChange}
            value={restaurantInfo.category}
          />
        </div>
        <div>
          <label>Restaurant Address:</label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            value={restaurantInfo.address}
          />
        </div>
        <div>
          <label>Restaurant Phone Number:</label>
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            value={restaurantInfo.phone}
          />
        </div>
        <div>
          <label>Restaurant Website:</label>
          <input
            type="text"
            name="website"
            onChange={handleChange}
            value={restaurantInfo.website}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            onChange={handleChange}
            value={restaurantInfo.description}
          />
        </div>
        <div>
          <label>Price (How many $'s, from 1 to 4?):</label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            value={restaurantInfo.price}
          />
        </div>
        <div>
          <h5>Restaurant Hours:</h5>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper method that allows authentication with the Firebase Google auth provider.
 */
const authenticate = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};
