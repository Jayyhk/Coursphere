import { getAuthSession } from "@/lib/auth";
import React from "react";
import { redirect } from "next/navigation";
import { InfoIcon } from "lucide-react";
import CreateCourseForm from "@/components/CreateCourseForm";

type Props = {};

const CreatePage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("../");
  }
  return (
    <div className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0">
      <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
        <span style={{ color: "#7b60e1", fontWeight: "light" }}>Cours</span>
        phere
      </h1>
      <div className="flex p-4 mt-10 mb-5 border-none bg-slate-100 dark:bg-zinc-800">
        <InfoIcon className="w-24 h-20 ml-2 mr-6 text-blue-400" />
        <div className="pt-1 mr-1">
          Enter a course title and a max of 3 units you want to learn. Next,
          upload an optional image for your course (cannot be changed later).
          Our AI will generate a course for you!
        </div>
      </div>
      <CreateCourseForm />
    </div>
  );
};

export default CreatePage;
