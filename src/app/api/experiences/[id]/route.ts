import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function getUserId() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("care_session")?.value;
  if (!sessionId) return null;
  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  if (!session || session.expiresAt < new Date()) return null;
  return session.userId;
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const experience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!experience || experience.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const experience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!experience || experience.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { content, status, template } = await req.json();

    const updated = await prisma.experience.update({
      where: { id },
      data: {
        ...(content && { content: typeof content === 'string' ? content : JSON.stringify(content) }),
        ...(status && { status }),
        ...(template && { template }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const experience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!experience || experience.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.experience.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
