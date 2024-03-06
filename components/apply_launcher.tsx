import React, { useCallback } from 'react';

const ApplyLauncherComponent = ({ launcherData }) => {

  const handleClick = useCallback(() => {
    if (launcherData?.apply_key && global.CareerSite !== undefined) {
      global.CareerSite.Apply.launchApplicationWorkflow(launcherData?.apply_key, parseInt(launcherData?.job_id, 10), launcherData?.workflow_type, launcherData?.widget_options);
    }
  }, [launcherData]);

  if (launcherData?.error) {
    return <div>{launcherData.error}</div>
  } 
  
  if (launcherData?.apply_key) {
    return (
      <button type="button" className="text-white bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleClick}>Apply for Job</button>
    );
  }

  return null;
  
};

export default ApplyLauncherComponent;


