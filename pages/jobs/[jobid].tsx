import React from 'react';
import Script from "next/script";
import JobDetails from "../../components/jobs/job_details";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";

const JobsPage = ({ job, brandData, launcherData, ...props }) => {
  const divStyle = {
    padding: '10px'
  };
  return (
    <Layout brandData={brandData}>
      <Section className="flex-1">
        <Container size="large" width="small">
          <JobDetails job={job} launcherData={launcherData} />
        </Container>
        <Script strategy="beforeInteractive">
          {
            `      
            window.talemetry = window.talemetry || {};
            window.talemetry.env = window.talemetry.env || "${props.currentEnvironment}"
            `
          }
        </Script>
        {props?.scripts?.webpack?.map(url => <Script key={url} src={url} strategy="beforeInteractive"/>)}
        {props?.scripts?.apply ? <Script src={props?.scripts?.apply} strategy="beforeInteractive"/> : null} 
      </Section>
    </Layout>
  );
};

export default JobsPage;

export async function getServerSideProps({ params }) {
  //Getting job details
  let job = {};
  const jobId = params.jobid; // Extract the second parameter from the URL
  const apiUrl = process.env.EMPLOY_END_POINT_BASE_URL;
  const launcherId = process.env.WORKFLOW_LAUNCHER_ID;

  let response = await fetch(`${apiUrl}/job_details/${jobId}`);
  job = await response.json();

  let scriptData = await fetch(`${apiUrl}/get_apply_script_urls`);
  scriptData = await scriptData.json();

   let launcherData;
   try {
    launcherData = await fetch(`${apiUrl}/job/${jobId}/get_apply_launcher/${launcherId}`);
    launcherData = await launcherData.json();
   } catch(err) {
    launcherData = { error: err?.message }
   }
  

  return {
    props: {
      job: job,
      scripts: scriptData?.scripts,
      launcherData: launcherData,
      currentEnvironment: "qa" //process.env.NODE_ENV || "qa"
    },
  };
}