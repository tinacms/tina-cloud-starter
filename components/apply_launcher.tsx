import React, {  useEffect, useState, useCallback } from 'react';

const ApplyLauncherComponent = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.EMPLOY_END_POINT_BASE_URL;
        const jobId = 4;
        const guid = "2fec6866-5d76-48e6-a140-c819e96863ff";
        const response = await fetch(`${apiUrl}/job/${jobId}/get_apply_launcher/${guid}`);
        const launcherData = await response.json();
        if (launcherData?.error) {
          setData({ error: launcherData.error });
          return;
        }
        setData({
          applyKey: launcherData?.apply_key,
          jobId: launcherData?.job_id,
          workflowType: launcherData?.workflow_type,
          widgetOptions: launcherData?.widget_options
        });
      } catch (error) {
        console.log(error);
        setData(null);
        return;
      }
    };

    fetchData();
  }, [data]);

  const handleClick = useCallback(() => {
    if (data?.applyKey && global.CareerSite !== undefined) {
      global.CareerSite.Apply.launchApplicationWorkflow(data?.applyKey, data?.jobId, data?.workflowType, data?.widgetOptions);
    }
  }, [data]);

  if (data?.error) {
    return <div>{data.error}</div>
  } 
  
  if (data?.applyKey) {
    return (
      <button type="button" onClick={handleClick}>Launch</button>
    );
  }

  return null;
  
};

export default ApplyLauncherComponent;


