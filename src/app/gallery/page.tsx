import GalleryCourseCard from "@/components/GalleryCourseCard";
import { prisma } from "@/lib/db";
import React from "react";
import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"

type Props = {}

const GalleryPage = async (props: Props) => {
  const session = await getAuthSession()
  if (!session?.user) {
    return redirect("../")
  }
  const courses = await prisma.course.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      units: {
        include: { chapters: true },
      },
    },
  });
  return (
    <div className="py-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {courses.map((course) => {
          return <GalleryCourseCard course={course} key={course.id} />;
        })}
      </div>
    </div>
  );
};

export default GalleryPage;