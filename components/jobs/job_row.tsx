import * as React from 'react';
import { format, parse } from 'date-fns';
const JobRow = (job) => {
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
    <div className="flex items-stretch pt-10">
      <span className="w-full font-bold">{job.title}</span>
      <div className="w-full text-center"> {job.location.locality}, {job.location.region_full}, {job.location.country}</div>
      <div className="w-full text-center"> {job.created_at}</div>
      <div className="w-full">
        <a href={`/jobs/${job.id}`} style = {buttonStyle} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right mb-10">Job
          Details</a>
      </div>
    </div>
  );
}
export default JobRow;