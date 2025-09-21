"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FormSchema = z.object({
  option: z.enum(["react", "vue", "angular", "svelte"], {
    required_error: "You need to select an option.",
  }),
});

export default function PollForm() {
  const pollOptions = [
    { id: "react", text: "React", votes: 0 },
    { id: "vue", text: "Vue", votes: 0 },
    { id: "angular", text: "Angular", votes: 0 },
    { id: "svelte", text: "Svelte", votes: 0 },
  ];

  const [options, setOptions] = useState(pollOptions);
  const [hasVoted, setHasVoted] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const savedVotes = localStorage.getItem("pollVotes");
    const voted = localStorage.getItem("hasVoted");
    if (savedVotes) setOptions(JSON.parse(savedVotes));
    if (voted) setHasVoted(true);
  }, []);

  const onSubmit = (data) => {
    const updatedOptions = options.map((option) =>
      option.id === data.option
        ? { ...option, votes: option.votes + 1 }
        : option
    );
    setOptions(updatedOptions);
    setHasVoted(true);

    localStorage.setItem("pollVotes", JSON.stringify(updatedOptions));
    localStorage.setItem("hasVoted", "true");

    toast("Thanks for voting!", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">
            {JSON.stringify(updatedOptions, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Which frontend framework do you prefer?
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!hasVoted ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="option"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select an option</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {options.map((option) => (
                            <FormItem
                              key={option.id}
                              className="flex items-center gap-3"
                            >
                              <FormControl>
                                <RadioGroupItem value={option.id} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.text}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Vote
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-4">
              {options.map((option) => {
                const percentage =
                  totalVotes === 0 ? 0 : (option.votes / totalVotes) * 100;
                return (
                  <div key={option.id}>
                    <div className="flex justify-between mb-1">
                      <span>{option.text}</span>
                      <span>
                        {option.votes} votes ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-4 rounded">
                      <div
                        className="bg-blue-500 h-4 rounded transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              <p className="mt-4 text-center text-green-600 font-semibold">
                Thanks for voting!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
