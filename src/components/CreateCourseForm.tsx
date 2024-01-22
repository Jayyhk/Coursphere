"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { createChaptersSchema } from "@/validators/course";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "./ui/imageupload";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type Props = {};

type Input = z.infer<typeof createChaptersSchema>;

const CreateCourseForm = (props: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: createChapters, isPending } = useMutation({
    mutationFn: async ({ title, units, src }: Input) => {
      const response = await axios.post("/api/course/createChapters", {
        title,
        units,
        src,
      });
      return response.data;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(createChaptersSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
      src: "",
    },
  });

  function onSubmit(data: Input) {
    if (data.units.some((unit) => unit === "")) {
      toast({
        title: "Error",
        description: "Please fill in all units.",
        variant: "destructive",
      });
      return;
    }
    if (data.src === "") {
      data.src =
        "https://res.cloudinary.com/dcublke0e/image/upload/v1705697368/yp2ffvhs1pzeuje23dlj.png";
    }
    createChapters(data, {
      onSuccess: ({ course_id }) => {
        toast({
          title: "Success!",
          description: "Course created successfully.",
        });
        router.push(`/create/${course_id}`);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong.",
          variant: "destructive",
        });
      },
    });
  }

  form.watch();

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
          <FormField
            control={form.control}
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4">
                <FormControl>
                  <ImageUpload
                    disabled={isPending}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col mt-2 items-start w-full sm:items-center sm:flex-row">
                  <FormLabel className="flex-[1] text-xl">Title</FormLabel>
                  <FormControl className="flex-[6] border-zinc-800 dark:bg-stone-950">
                    <Input
                      placeholder="Enter the main topic of the course:"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <AnimatePresence>
            {form.watch("units").map((_, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    height: { duration: 0.2 },
                  }}
                >
                  <FormField
                    key={index}
                    control={form.control}
                    name={`units.${index}`}
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                          <FormLabel className="flex-[1] text-xl">
                            Unit {index + 1}
                          </FormLabel>
                          <FormControl className="flex-[6] border-zinc-800 dark:bg-stone-950">
                            <Input
                              placeholder="Enter subtopic of the course:"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="flex items-center justify-center mt-4">
            <Separator className="flex-[1] dark:bg-zinc-700" />
            <div className="mx-4">
              <Button
                type="button"
                variant="secondary"
                className="font-semibold dark:bg-zinc-800"
                onClick={() => {
                  if (form.watch("units").length <= 2) {
                    form.setValue("units", [...form.watch("units"), ""]);
                  }
                }}
              >
                Add Unit
                <Plus className="w-4 h-4 ml-2 text-green-500" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="font-semibold ml-2 dark:bg-zinc-800"
                onClick={() => {
                  if (form.watch("units").length !== 1) {
                    form.setValue("units", form.watch("units").slice(0, -1));
                  }
                }}
              >
                Remove Unit
                <Trash className="w-4 h-4 ml-2 text-red-500" />
              </Button>
            </div>
            <Separator className="flex-[1] dark:bg-zinc-700" />
          </div>
          <Button
            disabled={isPending}
            type="submit"
            className="w-full mt-6 flex justify-between"
            size="lg"
          >
            <div></div>
            <div>Let&#39;s Go!</div>
            <div>{isPending && <Loader2 className="animate-spin" />}</div>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourseForm;
