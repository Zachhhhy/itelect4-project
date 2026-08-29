import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createSubmission, getCourses, getSubmissions } from "../api/client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { SubmissionBadge } from "../components/SubmissionBadge";
import { submissionSchema } from "../schemas/submissionSchema";
import { SubmissionStatus } from "../types";
import type { NewSubmission } from "../types";
import type { SubmissionFormValues } from "../schemas/submissionSchema";

function SubmissionsPage() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    mode: "onBlur",
    defaultValues: {
      courseCode: "ITELECT4",
      repoUrl: "https://github.com/example/new-submission",
    },
  });
  const submissionsQuery = useQuery({ queryKey: ["submissions"], queryFn: getSubmissions });
  const coursesQuery = useQuery({ queryKey: ["courses"], queryFn: getCourses });
  const addSubmission = useMutation({
    mutationFn: createSubmission,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["submissions"] });
      reset({
        courseCode: "ITELECT4",
        repoUrl: "",
      });
    },
  });

  function onSubmit(values: SubmissionFormValues): void {
    const submission: NewSubmission = {
      studentId: 1,
      courseCode: values.courseCode,
      repoUrl: values.repoUrl,
      submittedAt: new Date().toISOString(),
      status: SubmissionStatus.Submitted,
    };

    addSubmission.mutate(submission);
  }

  if (submissionsQuery.isLoading || coursesQuery.isLoading) {
    return <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">Loading submissions...</div>;
  }

  if (submissionsQuery.isError || coursesQuery.isError) {
    return <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800 shadow-sm dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">Could not load submissions. Run npm run api in another terminal and try again.</div>;
  }

  const submissions = submissionsQuery.data ?? [];
  const courses = coursesQuery.data ?? [];

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-950 dark:text-white">My Submissions</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr_auto] md:items-end">
          <div>
            <Label className="text-foreground" htmlFor="course-code">
              Course
            </Label>
            <select
              id="course-code"
              aria-invalid={errors.courseCode ? true : undefined}
              {...register("courseCode")}
              className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
            >
              {courses.map((course) => (
                <option key={course.code} value={course.code}>
                  {course.code}
                </option>
              ))}
            </select>
            {errors.courseCode && <p className="mt-2 text-sm text-red-700 dark:text-red-300">{errors.courseCode.message}</p>}
          </div>

          <div>
            <Label className="text-foreground" htmlFor="repo-url">
              Repository URL
            </Label>
            <Input
              id="repo-url"
              type="url"
              aria-invalid={errors.repoUrl ? true : undefined}
              {...register("repoUrl")}
              placeholder="https://github.com/username/repository"
              className="mt-2"
            />
            {errors.repoUrl && <p className="mt-2 text-sm text-red-700 dark:text-red-300">{errors.repoUrl.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={addSubmission.isPending}
          >
            {addSubmission.isPending ? "Saving..." : "Add Submission"}
          </Button>
        </div>
        {addSubmission.isError && <p className="mt-3 text-sm text-red-700 dark:text-red-300">Could not save submission.</p>}
      </form>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Submissions">
        {submissions.map((submission) => (
          <SubmissionBadge key={submission.id} submission={{ ...submission, submittedAt: new Date(submission.submittedAt) }}>
            <p>Awaiting instructor review.</p>
          </SubmissionBadge>
        ))}
      </section>
    </div>
  );
}

export default SubmissionsPage;
