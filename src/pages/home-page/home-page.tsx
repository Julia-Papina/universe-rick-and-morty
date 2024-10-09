"use client";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import Pagination from "@/components/pagination/pagination";
//import Loader from "@/components/loader/loader";
import Link from "next/link";
import { statusOptionArray } from "@/utils/constants";
import { speciesOptionArray } from "@/utils/constants";
import { OptionType } from "./types";
import { CharacterType } from "./types";
import { getAllCharacter } from "@/utils/api";
import { getAllEpisode } from "@/utils/api";

export const HomePage = () => {
  const pageSize = 19;
  const [character, setCharacter] = useState({} as CharacterType);
  const [episode, setEpisode] = useState({} as CharacterType);
  // const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [currentSettings, setCurrentSettings] = useState(1);
  const [statusSettings, setStatusSettings] = useState(" ");
  const [speciesSettings, setSpeciesSettings] = useState(" ");
  const [searchQueryEpisode, setSearchQueryEpisode] = useState<string>(" ");

  const getAllCharacterData = async (
    pageNumber: number,
    search: string,
    status: string,
    species: string
  ) => {
    const res = await getAllCharacter(pageNumber, search, status, species);
    const character = await res.json();
    setCharacter(character);
  };

  useEffect(() => {
    if (searchQuery === " ") {
      return;
    } else {
      getAllCharacterData(
        currentSettings,
        searchQuery,
        statusSettings,
        speciesSettings
      );
    }
  }, [currentSettings, statusSettings, searchQuery, speciesSettings]);

  const getAllEpisodeData = async (
    pageNumber: number,
    searchEpisode: string
  ) => {
    const res = await getAllEpisode(pageNumber, searchEpisode);
    // const character = await res.json();
    // setCharacter(character);
    const episode = await res.json();
    setEpisode(episode);
  };

  useEffect(() => {
    if (searchQueryEpisode === " ") {
      return;
    } else {
      getAllEpisodeData(currentSettings, searchQueryEpisode);
    }
  }, [currentSettings, searchQueryEpisode]);

  const handleSearchChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
      setCharacter({} as CharacterType);
    },
    600
  );

  const handleSearchChangeEpisode = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQueryEpisode(event.target.value);
      setCharacter({} as CharacterType);
    },
    600
  );

  const selectStatusHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStatusSettings(event.target.value);
  };
  const selectSpeciesHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSpeciesSettings(event.target.value);
  };
  //console.log(character);
  return (
    <main className="flex flex-col items-center my-20">
      <form className="flex flex-col justify-center gap-5 p-10 border border-solid border-black rounded-lg bg-white">
        <h1 className="font-semibold text-lg">Вселенная Рик и Морти</h1>
        <div className="flex flex-col justify-center gap-1">
          <label htmlFor="name">Имя персонажа</label>
          <input
            type="search"
            onChange={handleSearchChange}
            id="name"
            aria-label="Имя персонажа"
            placeholder="Введите имя"
            className="border border-solid border-black rounded-md outline-none p-1"
          />
        </div>
        <div className="flex gap-20">
          <div className="flex flex-col gap-1">
            <label htmlFor="status-select">Жив?</label>
            <select
              onChange={selectStatusHandler}
              name="status"
              id="status-select"
              className="border border-solid border-black rounded-md outline-none p-1"
            >
              {statusOptionArray.map((status: OptionType, i) => (
                <option value={status.value} key={i}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="species-select">Раса</label>

            <select
              onChange={selectSpeciesHandler}
              name="species"
              id="species-select"
              className="border border-solid border-black rounded-md outline-none p-1"
            >
              {speciesOptionArray.map((status: OptionType) => (
                <option value={status.value} key={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label htmlFor="episode">Эпизод</label>
          <input
            onChange={handleSearchChangeEpisode}
            type="search"
            id="episode"
            aria-label="Эпизод"
            placeholder="Введите код эпизода"
            className="border border-solid border-black rounded-md outline-none p-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg">Найдено</h2>

          {character?.results?.length > 0 ? (
            <div className="flex flex-col gap-2">
             <span className="font-semibold text-lg">Персонаж:</span> 
              {character?.results?.map((item) => (
                <Link
                  href={`/character/${item.id}`}
                  key={item.id}
                  className="border border-solid border-slate-300 p-2 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ) : (
            <p>Персонаж не найден</p>
          )}

          {episode?.results?.length > 0 ? (
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-lg">Эпизод:</span> 
              {episode?.results?.map((item) => (
                <Link
                  href={`/episode/${item.id}`}
                  key={item.id}
                  className="border border-solid border-slate-300 p-2 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ) : (
            <p>Эпизод не найден</p>
          )}
        </div>
        <Pagination
          onPageChange={(page) => setCurrentSettings(Number(page))}
          currentPage={currentSettings}
          totalCount={character?.info?.count}
          pageSize={pageSize}
        />
      </form>
    </main>
  );
};

export default HomePage;
