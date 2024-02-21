import React from 'react';
import JobDetails from "../../components/jobs/job_details";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";

const JobsPage = ({ job }) => {
  const divStyle = {
    padding: '10px'
  };
  return (
    <Layout>
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
  let job = {};
  try {
    const jobId = params.jobid; // Extract the second parameter from the URL
    // const slug = 'smraJqMp2skqO3yyu7BL5'
    // const response = await fetch(`https://connect.app.jviqa.com/endpoint/${slug}/job_details/${jobId}`); 
    const apiUrl = process.env.EMPLOY_END_POINT_BASE_URL;
    const response = await fetch(`${apiUrl}/job_details/${jobId}`);
    console.log(response);
    job = await response.json();
    console.log(job);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {
    props: {
      job,
    },
  };
}