"use client";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

type Props = {};

const NotGetStartedButton = (props: Props) => {
  return (
    <Link href="/create">
      <Button
        className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
        variant="premium"
      >
        Get Started
      </Button>
    </Link>
  );
};

export default NotGetStartedButton;
