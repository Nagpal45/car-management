//user logout
export const POST = async () => {
    const response = new Response(null, {
        headers: {
            'Set-Cookie': 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict'
        }
    });
    return response;
}