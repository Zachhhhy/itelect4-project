import { SubmissionBadge } from "../components/SubmissionBadge";
import { mockSubmissions } from "../data/mockData";

function SubmissionsPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-950 dark:text-white">My Submissions</h2>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Submissions">
        {mockSubmissions.map((submission) => (
          <SubmissionBadge key={submission.id} submission={submission}>
            <p>Awaiting instructor review.</p>
          </SubmissionBadge>
        ))}
      </section>
    </div>
  );
}

export default SubmissionsPage;
