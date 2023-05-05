import { auth } from "@/firebase/clientApp";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Restaurant, { RestaurantHours, RestaurantHoursSchedule } from "@/models/Restaurant";
import { useState } from "react";
import RestaurantHourInput from "@/components/RestaurantHourInput";
import { createRestaurant } from "@/lib/DataService";
import { useRouter } from "next/router";

export interface RestaurantFormInfo {
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
    const result = isWeekday(name);
    if (result) {
      setRestaurantInfo((prev) => {
        return {
          ...prev,
          hours: {
            ...prev.hours,
            [result[0]]: {
              ...prev.hours[result[0]],
              [result[1]]: Number(value),
            },
          },
        };
      });
    } else {
      setRestaurantInfo((prev) => {
        return {
          ...prev,
          [name]: value,
          //[name]: name === "price" ? Number(value) : value,
        };
      });
    }
  }

  /**
   * Creates a restaurant.
   */
  const router = useRouter();
  async function handleSubmit() {
    let data = restaurantInfo;
    restaurantInfo.price = Number(restaurantInfo.price);
    await createRestaurant(restaurantInfo as Restaurant);
    await DataService.logUserAuthentication(user!.uid, "create-restaurant (for: " + data.name + ")");

    router.push("/restaurants");
  }

  // Render page
  return (
    <div className="flex flex-col bg-slate-300 sm:p-8 space-y-5">
      <div className="p-2">
        <h1 className="mb-2 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Add Restaurant</h1>

        <div className="border border-black flex flex-col items-center gap-2 bg-white rounded-3xl p-4 ">
          <div className="flex flex-col w-80 sm:w-96 md:w-[500px] lg:w-[750px]">
            <label className="block">Restaurant Name:</label>
            <input
              className="border border-black rounded-xl px-2"
              type="text"
              name="name"
              onChange={handleChange}
              value={restaurantInfo.name}
            />
          </div>
          <div className="flex flex-col w-80 sm:w-96 md:w-[500px] lg:w-[750px] ">
            <label className="block">Category:</label>
            <input
              className="border border-black rounded-xl px-2"
              type="text"
              name="category"
              onChange={handleChange}
              value={restaurantInfo.category}
            />
          </div>
          <div className="flex flex-col w-80 sm:w-96 md:w-[500px] lg:w-[750px] ">
            <label className="block">Address:</label>
            <input
              className="border border-black rounded-xl px-2"
              type="text"
              name="address"
              onChange={handleChange}
              value={restaurantInfo.address}
            />
          </div>
          <div className="flex flex-col w-80 sm:w-96 md:w-[500px] lg:w-[750px] ">
            <label className="block">Phone Number:</label>
            <input
              className="border border-black rounded-xl px-2"
              type="text"
              name="phone"
              onChange={handleChange}
              value={restaurantInfo.phone}
            />
          </div>
          <div className="flex flex-col w-80 sm:w-96 md:w-[500px] lg:w-[750px] ">
            <label className="block">Website:</label>
            <input
              className="border border-black rounded-xl px-2"
              type="text"
              name="website"
              onChange={handleChange}
              value={restaurantInfo.website}
            />
          </div>
          <div className="flex flex-col w-80 sm:w-96 md:w-[500px] lg:w-[750px] ">
            <label className="block">Description:</label>
            <textarea
              className="border border-black rounded-xl px-2"
              name="description"
              onChange={handleChange}
              value={restaurantInfo.description}
            />
          </div>
          <div className="flex flex-col w-80 sm:w-96 md:w-[500px] lg:w-[750px] ">
            <label className="block">Price (How many $'s, from 1 to 4?):</label>
            <input
              className="border border-black rounded-xl px-2"
              type="number"
              name="price"
              onChange={handleChange}
              value={restaurantInfo.price}
            />
          </div>
          <div className="w-80 sm:w-96 md:w-[500px] lg:w-[750px] flex flex-col gap-1">
            <h5>Restaurant Hours (Format hmm/hhmm): </h5>
            <RestaurantHourInput
              weekday="monday"
              handleChange={handleChange}
              restaurantInfo={restaurantInfo}
            />
            <RestaurantHourInput
              weekday="tuesday"
              handleChange={handleChange}
              restaurantInfo={restaurantInfo}
            />
            <RestaurantHourInput
              weekday="wednesday"
              handleChange={handleChange}
              restaurantInfo={restaurantInfo}
            />
            <RestaurantHourInput
              weekday="thursday"
              handleChange={handleChange}
              restaurantInfo={restaurantInfo}
            />
            <RestaurantHourInput
              weekday="friday"
              handleChange={handleChange}
              restaurantInfo={restaurantInfo}
            />
            <RestaurantHourInput
              weekday="saturday"
              handleChange={handleChange}
              restaurantInfo={restaurantInfo}
            />
            <RestaurantHourInput
              weekday="sunday"
              handleChange={handleChange}
              restaurantInfo={restaurantInfo}
            />
          </div>
          <button
            className="mt-4 border border-black rounded-2xl px-24 py-3 text-lg font-bold bg-white hover:bg-slate-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
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

// Helper method that checks if parameter is a weekday
const isWeekday = (str: string) => {
  const weekDayArr = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const strSplit = str.split(" ") as ["monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday", "open" | "close"];
  const day = strSplit[0];
  if (weekDayArr.includes(day)) {
    return strSplit;
  } else {
    return null;
  }
};
