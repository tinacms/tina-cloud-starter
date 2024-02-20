import { useRouter } from 'next/router'
const JobDetails = ({ job }) => {
  const router = useRouter()
    return (
    <div>
      {/* <strong>Job Details</strong> */}
      <p className="text-4xl mb-4">{job.title}</p>
      <p className="text-l mb-4">{job.location}</p>
      <div className="grid grid-cols-1 divide-y-2 divide-gray-800 border-y-2 border-gray-800 mb-10"></div>
      <ul>
        <li key={job.id}>
          <p className="text-xl font-bold mb-6">Job Description</p>
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
          <button className="text-white float-right mt-10 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>router.back()}>Back to Jobs</button>
        </li>
      </ul>
    </div>
  );
};

export default JobDetails;
