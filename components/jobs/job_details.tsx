import { useRouter } from 'next/router';
import ApplyLauncherComponent from '../apply_launcher';
import { useCallback } from "react";

const JobDetails = ({ job, launcherData }) => {
  const router = useRouter()
  const goBack = useCallback(() => {
    router.back();
  }, [router]);
  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#425bad',
    fontfamily: '"Arial", sans-serif',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };
  return (
    <div>
      <p className="text-4xl mb-4">{job.title}</p>
      <p className="text-l mb-4">(external_id: {job.external_id})</p>
      <p className="text-l mb-4">{job.location}</p>
      <div className="grid grid-cols-1 divide-y-2 divide-gray-800 border-y-2 border-gray-800 mb-10"></div>
      <ul>
        <li key={job.id}>
          <p className="text-xl font-bold mb-6">Job Description</p>
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
        </li>
      </ul>
      <div className="flex justify-between items-center my-4">
        <ApplyLauncherComponent launcherData={launcherData} />
        <button style = {buttonStyle}
          className="text-white bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={goBack}>Back to Jobs
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
