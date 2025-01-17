import Page from './[...filename]/page';

export const Index = async ({ params }) => {
  return Page({
    ...params,
    params: { filename: ['home'] },
  });
}

export default Index;