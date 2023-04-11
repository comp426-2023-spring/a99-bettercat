import type { NextApiRequest, NextApiResponse } from 'next'
import * as DataService from '@/lib/DataService'

/**
 * API Route: /api/restaurant-reviews/:id
 * API handler to fetch reviews data for a specific restaurant ID.
 * @param req - API request object
 * @param res - API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "GET") {
    try {

      // Read ID from request
      const restaurantId = req.query.id;

      // Attempt to find reviews for ID        
      const reviews = await DataService.getReviewsForRestaurant(Array.isArray(restaurantId) ? restaurantId[0] : restaurantId!)

      // Check if reviews found
      if (reviews !== null) {
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
    catch (err) {
      res.status(500).send({ error: "Failed to fetch data" });
    }

  }
}