import JobsSearch from "../../components/jobs/jobs_search";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";

const JobsResultsPage = ({ jobs }) => {
  return (
    <Layout>
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
  const query = resolvedUrl.split('?')[1].replace(/ /g,"+")
  let jobs = {};
  const slug = 'smraJqMp2skqO3yyu7BL5'
  const response = await fetch(`https://connect.app.jviqa.com/endpoint/${slug}/search_jobs?${query}`);
  jobs = await response.json();
  return {
    props: {
        jobs: jobs,
    },
  };
}