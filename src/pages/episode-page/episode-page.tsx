"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EpisodePage = ({ id }: { id: number }) => {
  const router = useRouter();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(detailEpisode);

  return (
    <section className="flex flex-col gap-5 mt-20 mb-20" id="episode-detail">
      <h1 className="font-semibold text-2xl text-amber-950">
        Вселенная Рик и Морти
      </h1>
      <article className="flex flex-col border border-solid border-neutral-400 rounded-lg py-5 px-9">
        <p>Эпизод:</p>
        <p className="font-semibold text-lg">{detailEpisode.name}</p>
        <p>Дата выхода в эфир:</p>
        <p className="font-semibold text-lg">{detailEpisode.air_date}</p>
        <ul className="flex flex-col">
          Персонажи:
          {detailEpisode?.characters?.map((character, i) => (
            <Link
              className="text-cyan-400"
              key={i}
              href={`/character/${character.slice(character.lastIndexOf("/"))}`}
            >
              {i + 1} Смотреть персонаж эпизода...
            </Link>
          ))}
        </ul>
      </article>
      <button type="button" onClick={() => router.back()} className="border border-solid border-slate-300 px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 w-24">
        Назад
      </button>
    </section>
  );
};

export default EpisodePage;
