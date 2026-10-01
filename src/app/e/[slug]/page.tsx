import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PublicExperienceClient from "./components/PublicExperienceClient";

export default async function PublicExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const experience = await prisma.experience.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!experience || experience.status !== 'published') {
    notFound();
  }

  const content = JSON.parse(experience.content);

  return (
    <PublicExperienceClient 
      content={content} 
      template={experience.template} 
    />
  );
}
