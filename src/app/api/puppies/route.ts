import { NextRequest, NextResponse } from "next/server";
import { getAllPuppies, addPuppy, updatePuppy, deletePuppy } from "@/lib/data";

export function GET() {
    return NextResponse.json(getAllPuppies());
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const puppy = addPuppy(body);
    return NextResponse.json(puppy, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { id, ...data } = body;
    const updated = updatePuppy(id, data);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();
    const success = deletePuppy(id);
    if (!success) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
}
