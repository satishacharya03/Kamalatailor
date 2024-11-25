import { GET, POST } from "@/lib/auth";
export { auth } from "@/lib/auth"
export { GET, POST } from "@/lib/auth";

export default async function handler(req: any, res: any) {
    // Handle GET and POST requests
    if (req.method === 'GET') {
        // Handle GET request
        return GET(req);
    } else if (req.method === 'POST') {
        // Handle POST request
        return POST(req);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

