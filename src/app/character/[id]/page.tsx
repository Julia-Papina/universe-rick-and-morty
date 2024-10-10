import CharacterPage from "@/components/character-page/character-page";
const Home = ({ params }: { params: { id: number } }) => {
  return <CharacterPage id={params.id}/>;
};
export default Home;