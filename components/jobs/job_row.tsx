import * as React from 'react';
const JobRow = (job) => {
  return (
    <ul className="flex flex-col divide-y w-full">
      <li >
        <span className="pt-4 font-bold">{job.title}</span><br/>
        <span className="mt-2 font-thin">{job.location.country}</span>
        <a href={`/jobs/${job.id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right mb-7">Job Details</a>
      </li>
    </ul>
  );
}
export default JobRow;