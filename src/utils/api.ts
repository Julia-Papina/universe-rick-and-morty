export const getAllCharacter = (currentPage: number, searchQuery: string, status: string, species: string) => {
	const res = fetch(
		 `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${searchQuery}&status=${status}&species=${species}`
	);
	return res;
};

export const getAllEpisode = (currentPage: number, searchQueryEpisode: string) => {
	const res = fetch(
		 `https://rickandmortyapi.com/api/episode/?page=${currentPage}&episode=${searchQueryEpisode}`
	);
	return res;
};