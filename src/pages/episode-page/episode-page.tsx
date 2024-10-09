"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const EpisodePage = ({ id }: { id: number }) => {
  const [detailEpisode, setDetailEpisode] = useState(
    [] as unknown as DetailEpisodeType
  );

  type DetailEpisodeType = {
    name: string;
    air_date: string;
    characters: string[];
  };

  useEffect(() => {
    const getEpisodeId = async (id: number) => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode/${id}`
        );
        const data = await response.json();
        setDetailEpisode(data);
      } catch (err) {
        alert(err);
      }
    };
    getEpisodeId(id);
  }, []);

  console.log(detailEpisode);

  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-lg">Вселенная Рик и Морти</h1>
      <p>Эпизод {detailEpisode.name}</p>
      <p>Дата выхода в эфир: {detailEpisode.air_date}</p>
      <ul className="flex flex-col">
        Персонажи:
        {detailEpisode?.characters?.map((character, i) => (
          <Link
            key={i}
            href={`/character/${character.slice(character.lastIndexOf("/"))}`}
          >
            {character}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default EpisodePage;
