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

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const experiences = await prisma.experience.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { type, template, content, status } = await req.json();

    const experience = await prisma.experience.create({
      data: {
        userId,
        type,
        template: template || "classic",
        status: status || "draft",
        content: JSON.stringify(content || {}),
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error("Create experience error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
