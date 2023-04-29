
/** Data model to represent a user interaction log upon login */
export default interface UserInteractionLog {
    userId: string, // User that logged in
    timestamp: string, // String representation of when user logged in
    description: string // Description of interaction
}