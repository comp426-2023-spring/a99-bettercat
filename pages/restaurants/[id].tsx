import { GetStaticPaths, GetStaticPropsContext } from "next";
import { auth } from "@/firebase/clientApp";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useMemo } from "react";
import Geocode from "react-geocode";
import { useState, useEffect } from "react";

/** Interface for the parameter of the `RestaurantView` component. */
interface RestaurantProps {
  restaurant: Restaurant;
  reviews: Review[];
  average_review: number;
}

export default function RestaurantView({ restaurant, reviews, average_review }: RestaurantProps) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  /* Load user authentication hook
   - user: Once authenticated user loads, user !== null.
   - loading: If authenticated state is loading, loading !== null.
   - error: If there was an error loading authentication, error !== null.
   > If all the above == null, then it means that no user is currently signed in.
   */
  const [user, loading, error] = useAuthState(auth);

  const [favorited, setFavorited] = useState(false);

  const toggleFavoriteState = async () => {
    await DataService.toggleFavoriteRestaurant(user!.uid, restaurant.id);
    setFavorited(!favorited);
  }

  const [dbUser, setDbUser] = useState<User | null>(null);

  useEffect(() => {
    const loadDbUser = async () => {
      const newdDbUser = await DataService.getUser(user!.uid);     
      setDbUser(newdDbUser);
      setFavorited(newdDbUser.favoriteRestaurants.includes(restaurant.id));
    }

    if(user) {
      loadDbUser();
    }
  })


  const libraries = useMemo(() => ["places"], []);

  const mapCenter = useMemo(() => ({ lat: Number(lat), lng: Number(lng) }), [lat, lng]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string);

  // Render page
  return (
    <div>
      <NavBar />
      <div className="flex flex-col bg-slate-300 min-h-screen p-10 space-y-5">
      <h3 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{restaurant.name}</h3>
      <h3 className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{restaurant.description}</h3>
      <div className="self-center">
        {
          dbUser && favorited ? (
            <a
              onClick={() => toggleFavoriteState()}
              className="inline-flex items-center justify-center  px-5 py-3 mr-1 text-base font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-900"
            >
              Unfavorite
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
        </a>
          ) : dbUser ? (
            <a
            onClick={() => toggleFavoriteState()}
              className="inline-flex items-center justify-center  px-5 py-3 mr-1 text-base font-medium text-center text-white bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
            >
              {dbUser && favorited ? "Unfavorite" : "Favorite"}
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
        </a>
          ) : (
            <a
              className="inline-flex items-center justify-center  px-5 py-3 mr-1 text-base font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-900"
            >
              Loading...
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
        </a>
          )
        }
        
        <a
          className="inline-flex items-center justify-center  px-5 py-3 ml-1 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Website
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
      <div className="flex flex-row pd- 10 space-x-5">
        <div className="bg-white rounded-lg p-10 drop-shadow-lg grow">
          <h1 className="font-extrabold text-3xl">General Info</h1>
          <div>
            <table>
              <tr>
                <th className="border-separate p-1">Day</th>
                <th className="border-separate p-1">Times</th>
              </tr>
              <tr>
                <td>Sunday</td>
                <td className="border-separate p-1">{restaurant.hours.sunday.open + " - " + restaurant.hours.sunday.close}</td>
              </tr>
              <tr>
                <td>Monday</td>
                <td className="border-separate p-1">{restaurant.hours.monday.open + " - " + restaurant.hours.monday.close}</td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td className="border-separate p-1">{restaurant.hours.tuesday.open + " - " + restaurant.hours.tuesday.close}</td>
              </tr>
              <tr>
                <td>Wednesday</td>
                <td className="border-separate p-1">{restaurant.hours.wednesday.open + " - " + restaurant.hours.wednesday.close}</td>
              </tr>
              <tr>
                <td>Thursday</td>
                <td className="border-separate p-1">{restaurant.hours.thursday.open + " - " + restaurant.hours.thursday.close}</td>
              </tr>
              <tr>
                <td>Friday</td>
                <td className="border-separate p-1">{restaurant.hours.friday.open + " - " + restaurant.hours.friday.close}</td>
              </tr>
              <tr>
                <td>Saturday</td>
                <td className="border-separate p-1">{restaurant.hours.saturday.open + " - " + restaurant.hours.saturday.close}</td>
              </tr>
            </table>
            <div className="align-middle">
              <strong>Address</strong>
              <p>{restaurant.address}</p>
              <strong>Phone</strong>
              <p>{restaurant.phone}</p>
              <strong>Price</strong>
              <p>
                {(() => {
                  switch (restaurant.price) {
                    case 1:
                      return "$";
                    case 2:
                      return "$$";
                    case 3:
                      return "$$$";
                    case 4:
                      return "$$$$";
                    default:
                      return "no price";
                  }
                })()}
              </p>
              <strong>Category</strong>
              <p>{restaurant.category}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-10 drop-shadow-lg grow">
          <h1 className="font-extrabold text-3xl">Map</h1>
          <div className="self-center">
            <GoogleMap
              options={mapOptions}
              zoom={17}
              center={mapCenter}
              mapTypeId={google.maps.MapTypeId.ROADMAP}
              mapContainerStyle={{ width: "20rem", height: "20rem" }}
              onLoad={() => {
                Geocode.fromAddress(restaurant.address).then((results) => {
                  const { lat, lng } = results.results[0].geometry.location;
                  setLat(lat);
                  setLng(lng);
                });
              }}
            >
              <MarkerF
                position={mapCenter}
                onLoad={() => console.log("Marker Loaded")}
              />
            </GoogleMap>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-10 drop-shadow-lg">
        <div className="flex flex-row w-100">
          <h1 className="font-extrabold text-3xl">Reviews</h1>
          <Link
            className="border border-black w-fit rounded-2xl py-1 px-4 bg-white hover:bg-slate-300 ml-6"
            href={"/restaurants/create-review/" + restaurant.id}
          >
            Add Review?
          </Link>
        </div>
        
        <div className="flex flex-row gap-10 mt-1">
          {reviews?.map((reviews) => (
            <>
              <div className="p-10 rounded-lg bg-slate-400">
                <p className="align-middle">
                  <strong>{reviews.score}/5</strong>
                </p>
                <p>{reviews.text}</p>
              </div>
            </>
          ))}
        </div>
      </div>
      {/* <div>
            <h3>{reviews.length} review(s)</h3>
            <h3>{average_review.toString()+ "/5 stars"}</h3>
        </div> */}
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

import * as DataService from "@/lib/DataService";
import { ParsedUrlQuery } from "querystring";
import Restaurant from "@/models/Restaurant";
import { useAuthState } from "react-firebase-hooks/auth";
import Review from "@/models/Review";
import NavBar from "../navbar";
import User from "@/models/User";
import Link from "next/link";

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
  const reviews = await DataService.getReviewsForRestaurant(Array.isArray(id) ? id[0] : id!);

  //Calculate Avg Review
  var average_review;
  for (let review of reviews ?? []) {
    average_review = (review.score / reviews!.length) * reviews!.length;
  }

  //Geocode Address to obtain latitude and longitude
  var latitude;
  var longitude;

  return { props: { restaurant: restaurant, reviews: reviews ?? [], average_review: average_review ?? 0 } };
}
