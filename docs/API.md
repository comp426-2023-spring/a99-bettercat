# UNC Restaurant Tracker API Guide

This is the **official guide for all of the API routes** exposed by the *UNC Restaurant Tracker website*.

## Restaurant API Routes

### `GET /api/restaurants`: Retrieve All Restaurants

This API route retrieves a list of all of the restaurants from the database.

**Expected Result (Code 200):**

```
[
{
    id: string, // Restaurant Firestore document ID
    name: string, // Name of the restaurant
    category: string, // Category of the resturant (Mediterranean, Indian, etc.)
    address: string, // String representation of restaurant's location
    latitude: number, // Latitude of restaurant's location for map view
    longitude: number, // Longitude of restaurant's location for map view
    phone: string, // Phone number used by the restaurant
    website: string, // Website used by the restaurant
    description: string, // Description of the restaurant
    hours: {...}, // Describes the restaurant's hours of operation
    price: number // Representation of average cost ( 1 = $, 2 = $$, 3 = $$$, 4 = $$$$) 
},
...
]
```
*This API route will throw a 500 error if it failed to fetch the data successfully.*

---

### `GET /api/restaurants/<ID>`: Retrieve Restaurant By ID

This API route retreives the data for a specific restaurant with the given ID.

**Expected Result (Code 200):**

```
{
    id: string, // Restaurant Firestore document ID
    name: string, // Name of the restaurant
    category: string, // Category of the resturant (Mediterranean, Indian, etc.)
    address: string, // String representation of restaurant's location
    latitude: number, // Latitude of restaurant's location for map view
    longitude: number, // Longitude of restaurant's location for map view
    phone: string, // Phone number used by the restaurant
    website: string, // Website used by the restaurant
    description: string, // Description of the restaurant
    hours: {...}, // Describes the restaurant's hours of operation
    price: number // Representation of average cost ( 1 = $, 2 = $$, 3 = $$$, 4 = $$$$) 
}
```
*This API route will throw a 500 error if it failed to fetch the data successfully.*

---

## Reviews API Routes

### `GET /api/restaurant-reviews/<ID>`: Retrieve All Reviews for a Restaurant By ID

This API route retreives of the reviews left for a restaurant, based on the restaurant's ID.

**Expected Result (Code 200):**

```
[
{
  id: string; // Review Firestore document ID
  restaurantId: number; // ID of the restaurant this review is attached to
  userId: number; // ID of the user who wrote this review
  score: number; // This is the review score (stars / rams) out of 5.
  text: string; // Body of the review
  tags: string[]; // Any tags the user left on the review (TBD feature)
},
...
]
```
*This API route will throw a 500 error if it failed to fetch the data successfully.*

---

### `GET /api/user-reviews/<ID>`: Retrieve All Reviews Written By User By ID

This API route retreives of the reviews written by a user, based on that user's ID.

**Expected Result (Code 200):**

```
[
{
  id: string; // Review Firestore document ID
  restaurantId: number; // ID of the restaurant this review is attached to
  userId: number; // ID of the user who wrote this review
  score: number; // This is the review score (stars / rams) out of 5.
  text: string; // Body of the review
  tags: string[]; // Any tags the user left on the review (TBD feature)
},
...
]
```
*This API route will throw a 500 error if it failed to fetch the data successfully.*

---

## Users API Routes

### `GET /api/users/<ID>`: Retrieve User Data by ID

This API route retreives user data, based on the user's ID.

**Expected Result (Code 200):**

```
{
  /* Fields for email and name are not included.
   * This is done intentially because these values
   * come from the Firebase Authentication service
   * and is up-to-date with the most current email
   * and name values fetched from the user's
   * connect Google account. */

  id: string; // User Firestore document ID
  favoriteCategories: string[]; // User's favorite restaurant categories
  favoriteRestaurants: number[]; // User's favorite restaurants (stored by restaurant ID)

}
```
*This API route will throw a 500 error if it failed to fetch the data successfully.*

