import type { NextApiRequest, NextApiResponse } from 'next'
import * as DataService from '@/lib/DataService'

/**
 * API Route: /api/user-reviews/:id
 * API handler to fetch reviews data for a specific user ID.
 * @param req - API request object
 * @param res - API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {

        // Read ID from request
        const userId = req.query.id;

        // Attempt to find reviews for ID        
        const reviews = await DataService.getReviewsFromUser(Array.isArray(userId) ? userId[0] : userId!)

        // Check if reviews found
        if(reviews !== null) {
            // If so...

            // Return data
            res.status(200).json(reviews);
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