import type { NextApiRequest } from 'next';

export const runtime = 'edge'

export async function GET(req: NextApiRequest) {
    try {
        console.log(process.env.AUTH_KEY)
        const response = await fetch('https://kes-api.kks110.workers.dev', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AUTH_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        return Response.json(data)
    } catch (error: any) {
        return new Response('Failed to fetch data: ' + error, {
            status: 500,
            headers: { 'Content-Type': 'text/plain' },
        });
    }
}
