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
      <button type="button" className="rounded-md bg-green-700 p-2" onClick={handleClick}>Launch</button>
    );
  }

  return null;
  
};

export default ApplyLauncherComponent;


