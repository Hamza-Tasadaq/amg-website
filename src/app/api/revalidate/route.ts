import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { body, isValidSignature } = await parseBody<{
            _type: string;
            slug?: string | undefined;
        }>(req, process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET);

        if (!isValidSignature) {
            return new Response("Invalid Signature", { status: 401 });
        }

        if (!body?._type) {
            return new Response("Bad Request", { status: 400 });
        }

        revalidateTag(body._type);
        return NextResponse.json({
            status: 200,
            revalidated: true,
            now: Date.now(),
            body,
        });
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}