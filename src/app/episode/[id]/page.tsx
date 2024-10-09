import EpisodePage from "@/pages/episode-page/episode-page";
const Home = ({ params }: { params: { id: number } }) => {
  return <EpisodePage id={params.id}/>;
};
export default Home;