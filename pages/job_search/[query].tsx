import JobsSearch from "../../components/jobs/jobs_search";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";

const JobsResultsPage = ({ jobs, brandData }) => {
  return (
    <Layout brandData={brandData}>
       <Section className="flex-1">
        <Container size="large" width="small">
        <JobsSearch jobs={jobs} />
        </Container>
      </Section>

    </Layout>

  );
};

export default JobsResultsPage;

export async function getServerSideProps({req, res, resolvedUrl}) {

  //Searching for Jobs
  const query = resolvedUrl.split('?')[1].replace(/ /g,"+")
  const apiUrl = process.env.EMPLOY_END_POINT_BASE_URL;
  const data_format = 'data_format=detail';
  let jobs = {};
  let response = await fetch(`${apiUrl}/search_jobs?${query}&${data_format}`);
  jobs = await response.json();
  return {
    props: {
        jobs: jobs
    },
  };
}