import { initFirebase } from "@/firebase/clientApp"
import Restaurant from "@/models/Restaurant";
import Review from "@/models/Review";
import User from "@/models/User";
import { QueryDocumentSnapshot, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";

// Connect to Firebase Firestore
const app = initFirebase();
const firestore = getFirestore(app);

// This helper function pipes your types through a firestore converter

/**
 * This helper function serves as a pipe that allows data entering and exiting
 * Firebase Firestore and converts data from Firebase's general data types
 * to data types specified in `/models`.
 */
const converter = <T>() => ({
    toFirestore: (data: T) => data,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as T
  })

/**
 * Fetches all restaurants from the database.
 * @returns the list of restaurants from the database.
 */
export const getAllRestaurants = async () => {
    const restaurantCollection = collection(firestore, "restaurants").withConverter(converter<Restaurant>());
    const querySnapshot = await getDocs(restaurantCollection);
    const restaurants: Restaurant[] = querySnapshot.docs.map((doc) => doc.data());

    return restaurants;
}

/**
 * Fetches restaurant with provided ID from the database.
 * @param number the ID of the restaurant to look up.
 * @returns the restaurant from the database.
 */
export const getRestaurant = async (id: number) => {
    const restaurantCollection = collection(firestore, "restaurants").withConverter(converter<Restaurant>());
    const docReference = doc(restaurantCollection, id.toString());
    const querySnapshot = await getDoc(docReference);
    const restaurant: Restaurant | undefined = querySnapshot.data()

    return restaurant;
}

/**
 * Fetches reviews for a restaurant from the database.
 * @param number the ID of the restaurant to look up.
 * @returns the reviews from the database.
 */
export const getReviewsForRestaurant = async (restaurantId: number) => {
    const restaurantCollection = collection(firestore, "reviews").withConverter(converter<Review>());
    const q = query(restaurantCollection, where("restaurantId", "==", restaurantId));
    const querySnapshot = await getDocs(q);
    const reviews: Review[] = querySnapshot.docs.map((review) => review.data());

    return reviews;
}

/**
 * Fetches reviews written by a user from the database.
 * @param number the ID of the user to look up.
 * @returns the reviews from the database.
 */
export const getReviewsFromUser = async (userId: number) => {
    const restaurantCollection = collection(firestore, "reviews").withConverter(converter<Review>());
    const q = query(restaurantCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const reviews: Review[] = querySnapshot.docs.map((review) => review.data());

    return reviews;
}

/**
 * Fetches user with provided ID from the database.
 * @param string the ID of the user to look up.
 * @returns the user from the database.
 */
export const getUser = async (id: string) => {
    const userCollection = collection(firestore, "users").withConverter(converter<User>());
    const docReference = doc(userCollection, id);
    const querySnapshot = await getDoc(docReference);
    const user: User | undefined = querySnapshot.data()

    return user;
}

/**
 * Creates new restaurant in the database.
 * @param Restaurant the restaurant to add.
 */
export const createRestaurant = async (restaurant: Restaurant) => {
    const restaurantCollection = collection(firestore, "restaurants").withConverter(converter<Restaurant>());
    const docReference = doc(restaurantCollection);

    await setDoc(docReference, restaurant);
}

/**
 * Creates new user in the database.
 * @param User the user to add.
 */
export const createUser = async (user: User) => {
    const userCollection = collection(firestore, "users").withConverter(converter<User>());
    const docReference = doc(userCollection);

    await setDoc(docReference, user);
}

/**
 * Creates new review in the database.
 * @param Review the review to add.
 */
export const createReview = async (review: Review) => {
    const reviewsCollection = collection(firestore, "reviews").withConverter(converter<Review>());
    const docReference = doc(reviewsCollection);

    await setDoc(docReference, review);
}
