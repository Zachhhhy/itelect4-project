import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { askAi } from "../api/client";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { reviewFormSchema, type ReviewFormValues } from "../schemas/reviewSchema";
import type { AiReview } from "../types";

const READINESS_STYLE: Record<AiReview["readiness"], string> = {
  ready: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200",
  almost: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  "not-yet": "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200",
};

function ReviewPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { prompt: "" },
  });
  const review = useMutation({ mutationFn: askAi });

  function onSubmit(values: ReviewFormValues): void {
    review.mutate(values.prompt);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-950 dark:text-white">AI Review</h2>
        <p className="mt-1 text-gray-600 dark:text-gray-300">Describe your coursework project and get a structured review.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div>
          <Label htmlFor="project-description" className="text-foreground">Project description</Label>
          <textarea id="project-description" rows={6} {...register("prompt")} aria-invalid={errors.prompt ? true : undefined} placeholder="Describe the purpose, features, and current state of your project..." className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
          {errors.prompt && <p className="mt-2 text-sm text-red-700 dark:text-red-300">{errors.prompt.message}</p>}
        </div>
        <Button type="submit" disabled={review.isPending}>{review.isPending ? "Reviewing..." : "Review my project"}</Button>
        {review.isError && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{review.error.message}</p>}
      </form>
      {review.data && <ReviewCard review={review.data} />}
    </div>
  );
}

function ReviewCard({ review }: { review: AiReview }) {
  return <section className="space-y-5 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800" aria-label="AI project review">
    <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-xl font-bold">Review result</h3><span className={`rounded-full px-3 py-1 text-sm font-semibold ${READINESS_STYLE[review.readiness]}`}>{review.readiness}</span></div>
    <div><h4 className="font-semibold">Summary</h4><p className="mt-1 text-gray-700 dark:text-gray-200">{review.summary}</p></div>
    <ReviewList title="Strengths" items={review.strengths} />
    <ReviewList title="Improvements" items={review.improvements} />
  </section>;
}

function ReviewList({ title, items }: { title: string; items: string[] }) {
  return <div><h4 className="font-semibold">{title}</h4><ul className="mt-1 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-200">{items.map((item, index) => <li key={`${title}-${index}`}>{item}</li>)}</ul></div>;
}

export default ReviewPage;
