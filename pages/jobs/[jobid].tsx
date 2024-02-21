import React from 'react';
import JobDetails from "../../components/jobs/job_details";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";

const JobsPage = ({ job, brandData }) => {
  const divStyle = {
    padding: '10px'
  };
  return (
    <Layout brandData={brandData}>
      <Section className="flex-1">
        <Container size="large" width="small">
          <JobDetails job={job} />
        </Container>
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
  let response = await fetch(`${apiUrl}/job_details/${jobId}`);
  job = await response.json();
  
  //Getting Brand Data
  response = await fetch(`${apiUrl}/get_default_brand`);
  const brandData = await response.json();

  return {
    props: {
      job: job,
      brandData: brandData
    },
  };
}