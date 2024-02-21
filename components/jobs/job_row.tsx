import * as React from 'react';
const JobRow = (job) => {
  return (
    <div className="flex items-stretch pt-10">
      <span className="w-full font-bold">{job.title}</span>
      <div className="w-full text-center"> {job.location.country}</div>
      <div className="w-full">
        <a href={`/jobs/${job.id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right mb-10">Job Details</a>
      </div>
    </div>
  );
}
export default JobRow;