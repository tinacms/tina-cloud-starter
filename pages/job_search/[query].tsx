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
  let jobs = {};
  // const slug = 'smraJqMp2skqO3yyu7BL5'
  // const response = await fetch(`https://connect.app.jviqa.com/endpoint/${slug}/search_jobs?${query}`);
  let response = await fetch(`${apiUrl}/search_jobs?${query}`);
  jobs = await response.json();

  //Getting Brand Data
  response = await fetch(`${apiUrl}/get_default_brand`);
  const brandData = await response.json();

  return {
    props: {
        jobs: jobs,
        brandData: brandData
    },
  };
}