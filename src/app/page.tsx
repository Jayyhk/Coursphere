import { getAuthSession } from "@/lib/auth";
import TypewriterComponent from "@/components/Typewriter";
import React from "react";
import NotGetStartedButton from "@/components/NotGetStartedButton";
import GetStartedButton from "@/components/GetStartedButton";

type Props = {};

const home = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <div className="h-full">
      <div className="text:black dark:text-white font-bold py-36 text-center space-y-5">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h1>The Best AI Tool for</h1>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            <TypewriterComponent />
            <br />
          </div>
        </div>
        <div className="text-sm md:text-xl font-light text-zinc-400">
          Create course content 10x faster using AI.
        </div>
        <div>
          {session?.user && <NotGetStartedButton />}
          {!session?.user && <GetStartedButton />}
        </div>
        <div className="text-zinc-400 text-xs md:text-sm font-normal">
          By Jake Mallen
        </div>
      </div>
    </div>
  );
};

export default home;
