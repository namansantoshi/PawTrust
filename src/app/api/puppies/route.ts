import { NextRequest, NextResponse } from "next/server";
import { getAllPuppies, addPuppy, updatePuppy, deletePuppy } from "@/lib/data";

export async function GET() {
    const puppies = await getAllPuppies();
    return NextResponse.json(puppies);
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    try {
        const puppy = await addPuppy({
            breed: data.breed ?? "",
            age: data.age ?? "",
            gender: data.gender ?? "Male",
            price: Number(data.price ?? 0),
            city: data.city ?? "",
            description: data.description ?? "",
            images: Array.isArray(data.images) ? data.images : [],
            vaccinated: Boolean(data.vaccinated),
            verified: Boolean(data.verified),
            sold: Boolean(data.sold),
            published: Boolean(data.published),
            sellerContact: data.sellerContact ?? "918273848985",
        });
        return NextResponse.json(puppy, { status: 201 });
    } catch (e) {
        const msg = e instanceof Error ? e.message : "Insert failed";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const data = await request.json();
    const updated = await updatePuppy(id, {
        ...(data.breed !== undefined && { breed: data.breed }),
        ...(data.age !== undefined && { age: data.age }),
        ...(data.gender !== undefined && { gender: data.gender }),
        ...(data.price !== undefined && { price: Number(data.price) }),
        ...(data.city !== undefined && { city: data.city }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.images !== undefined && { images: data.images }),
        ...(data.vaccinated !== undefined && { vaccinated: Boolean(data.vaccinated) }),
        ...(data.verified !== undefined && { verified: Boolean(data.verified) }),
        ...(data.sold !== undefined && { sold: Boolean(data.sold) }),
        ...(data.published !== undefined && { published: Boolean(data.published) }),
        ...(data.sellerContact !== undefined && { sellerContact: data.sellerContact }),
    });
    if (!updated) return NextResponse.json({ error: "not found" }, { status: 404 });
    return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const ok = await deletePuppy(id);
    return NextResponse.json({ success: ok });
}
