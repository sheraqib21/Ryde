import { neon } from '@neondatabase/serverless';


export async function POST(request: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const { name, email, clerkId } = await request.json();

        if (!name || !email || !clerkId) {
            return Response.json(
                { error: 'Missing required parameter' },
                { status: 400 }
            )
        }
        const response = await sql`
    
    INSERT INTO users (
    name, 
    email,
    clerkId
    )
    VALUES (
    '${name}',
    '${email}',
    '${clerkId}'
    )
    `;

        return new Response(JSON.stringify({ data: response }), { status: 201 });

    }
    catch (error) {
        console.error(error);
        return Response.json({ error: error }, { status:500});
    }

}
