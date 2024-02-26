import React, {  useEffect } from 'react';

const ApplyLauncherComponent = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.EMPLOY_END_POINT_BASE_URL;
        const jobId = 4;
        const guid = "2fec6866-5d76-48e6-a140-c819e96863ff";
        const response = await fetch(`${apiUrl}/job/${jobId}/get_apply_launcher/${guid}`);
        const apply_launcher = await response.json();
        <div dangerouslySetInnerHTML={{ __html: apply_launcher.link }} />;
      } catch (error) {
        return <div>Error fetching data: {error}</div>;
      }
    };

    fetchData();
  }, []);
};

export default ApplyLauncherComponent;


