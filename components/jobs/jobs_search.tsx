import React, { useCallback, useEffect } from "react";
import JobRow from '../jobs/job_row'
import Searchbar from "../jobs/jobs_searchbar";
import { useRouter } from "next/router";
 
const JobsSearch = ({ jobs }) => {
const router = useRouter();
const searchText = router.query.q;
const jobs_count = jobs.entries.length
  return (
    <div>
      <div className="max-w-md mx-auto mb-20">
        <Searchbar />
      </div>
      <p className="text-2xl mb-8">{jobs_count==0 ? "No" : jobs_count } {searchText} jobs found</p>
      <div className="grid grid-cols-1 divide-y-2 divide-gray-800 border-y-2 border-gray-800">
        {
          jobs.entries.map((job) => {return <JobRow key={job.id} {...job} />})
        }
      </div>
  </div>
  );
};

export default JobsSearch;
