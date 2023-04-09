import type { NextApiRequest, NextApiResponse } from 'next'
import * as DataService from '@/lib/DataService'

/**
 * API Route: /api/users/:id
 * API handler to fetch user data for a specific ID.
 * @param req - API request object
 * @param res - API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {

        // Read ID from request
        const userId = req.query.id;

        // Attempt to find user for ID        
        const user = await DataService.getUser(Array.isArray(userId) ? userId[0] : userId!)

        // Check if user found
        if(user !== null) {
            // If so...

            // Return data
            res.status(200).json(user);
        } 
        else {
            // Otherwise, return 400 error
            res.status(400).send({ error: "Data for user not found" });
        }
    }
    // Handle any errors here
    catch(err) {
        res.status(500).send({ error: "Failed to fetch data"});
    }
}