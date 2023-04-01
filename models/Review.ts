
/** Data model to represent reviews written for restaurants on the site */
export default interface Review {
    id: number, // Review Firestore document ID
    restaurantId: number, // ID of the restaurant this review is attached to
    userId: number, // ID of the user who wrote this review
    score: number, // This is the review score (stars / rams) out of 5. 
    text: string, // Body of the review
    tags: string[] // Any tags the user left on the review (TBD feature)
}