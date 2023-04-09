import type { NextApiRequest, NextApiResponse } from 'next'
import * as DataService from '@/lib/DataService'

/**
 * API Route: /api/restaurants/:id
 * API handler to fetch restaurants data for a specific ID.
 * @param req - API request object
 * @param res - API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {

        // Read ID from request
        const restaurantId = req.query.id;

        // Attempt to find restarant for ID        
        const restaurant = await DataService.getRestaurant(Array.isArray(restaurantId) ? restaurantId[0] : restaurantId!)

        // Check if restaurant found
        if(restaurant !== null) {
            // If so...

            // Return data
            res.status(200).json(restaurant);
        } 
        else {
            // Otherwise, return 400 error
            res.status(400).send({ error: "Data for restaurant not found" });
        }
    }
    // Handle any errors here
    catch(err) {
        res.status(500).send({ error: "Failed to fetch data"});
    }
}