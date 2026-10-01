import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("care_session")?.value;

    if (sessionId) {
      await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
    }

    cookieStore.delete("care_session");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
