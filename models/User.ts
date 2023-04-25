
/** Data model to represent user data */
export default interface User {
    /* Fields for email and name are not included.
     * This is done intentially because these values
     * come from the Firebase Authentication service
     * and is up-to-date with the most current email
     * and name values fetched from the user's
     * connect Google account. */

    id: string, // User Firestore document ID
    favoriteCategories: string[], // User's favorite restaurant categories
    favoriteRestaurants: number[], // User's favorite restaurants (stored by restaurant ID)

    // TODO: Determine more user fields here
}
