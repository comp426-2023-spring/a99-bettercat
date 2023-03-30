
/** Data model to represent restaurants at or around UNC */
export default interface Restaurant {
    id: string, // Restaurant Firestore document ID
    name: string, // Name of the restaurant
    category: string, // Category of the resturant (Mediterranean, Indian, etc.)
    address: string, // String representation of restaurant's location
    latitude: number, // Latitude of restaurant's location for map view
    longitude: number, // Longitude of restaurant's location for map view
    phone: string, // Phone number used by the restaurant
    website: string, // Website used by the restaurant
    description: string, // Description of the restaurant
    hours: RestaurantHoursSchedule, // Describes the restaurant's hours of operation
    price: number // Representation of average cost ( 1 = $, 2 = $$, 3 = $$$, 4 = $$$$) 
}

/** Data model to represent the hours of operation of a restaurant over a week */
export interface  RestaurantHoursSchedule {
    sunday: RestaurantHours, // Hours of operation on Sunday
    monday: RestaurantHours, // Hours of operation on Monday
    tuesday: RestaurantHours, // Hours of operation on Tuesday
    wednesday: RestaurantHours, // Hours of operation on Wednesday
    thursday: RestaurantHours, // Hours of operation on Thursday
    friday: RestaurantHours, // Hours of operation on Friday
    saturday: RestaurantHours // Hours of operation on Saturday
}

/** Data model to hold the hours of operation of the restaurant on a given day */
export interface RestaurantHours {
    open: number // Opening time as a number in the format: hmm|hhmm
    close: number // Closing time as a number in the format: hmm|hhmm
}

