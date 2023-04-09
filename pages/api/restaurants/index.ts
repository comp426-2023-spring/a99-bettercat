import type { NextApiRequest, NextApiResponse } from 'next'
import * as DataService from '@/lib/DataService'

/**
 * API Route: /api/restaurants/
 * API handler to fetch all restaurants data.
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {

            // Fetch data
            const restaurants = await DataService.getAllRestaurants();

            // Return courses data
            res.status(200).json(restaurants);
        }
        // Handle any errors here
        catch (err) {
            res.status(500).send({ error: "Failed to fetch data" });
        }
    }
}