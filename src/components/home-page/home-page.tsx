"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/pagination/pagination";
//import Loader from "@/components/loader/loader";
import Link from "next/link";
import { statusOptionArray } from "@/utils/constants";
import { speciesOptionArray } from "@/utils/constants";
import { OptionType } from "./types";
import { CharacterType } from "./types";
import { getAllCharacter } from "@/utils/api";
import { getAllEpisode } from "@/utils/api";
import { localStorageSearchQuery, localStorageSearchQueryEpisode, localStorageSpecies, localStorageStatus } from "@/utils/constants";
import Image from "next/image";

export const HomePage = () => {

  const pageSize = 19;
  const [character, setCharacter] = useState({} as CharacterType);
  const [episode, setEpisode] = useState({} as CharacterType);
  const [searchQuery, setSearchQuery] = useState(localStorageSearchQuery());
  const [searchQueryEpisode, setSearchQueryEpisode] = useState(
    localStorageSearchQueryEpisode()
  );
  const [currentSettings, setCurrentSettings] = useState(1);
  const [statusSettings, setStatusSettings] = useState(localStorageStatus() || ' ');
  const [speciesSettings, setSpeciesSettings] = useState(localStorageSpecies() || " ");

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
    if (searchQuery === null) {
      return;
    } else {
      getAllCharacterData(
        currentSettings,
        searchQuery as unknown as string,
        statusSettings as unknown as string,
        speciesSettings as unknown as string,
      );
    }
  }, [currentSettings, statusSettings, searchQuery, speciesSettings]);

  const getAllEpisodeData = async (
    pageNumber: number,
    searchEpisode: string
  ) => {
    const res = await getAllEpisode(pageNumber, searchEpisode);
    const episode = await res.json();
    setEpisode(episode);
  };

  useEffect(() => {
    if (searchQueryEpisode === null) {
      return;
    } else {
      getAllEpisodeData(
        currentSettings,
        searchQueryEpisode as unknown as string
      );
    }
  }, [currentSettings, searchQueryEpisode]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    localStorage.setItem("queryCharacter", value);
  };

  const handleSearchChangeEpisode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchQueryEpisode(value);
    localStorage.setItem("queryEpisode", value);
  };

  const selectStatusHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const value = event.target.value;
    setStatusSettings(value as string);
    localStorage.setItem("statusFilter", value as string);
  };
  const selectSpeciesHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const value = event.target.value;
    setSpeciesSettings(value as string);
    localStorage.setItem("speciesFilter", value as string);
  };
  //console.log(character);
  return (
    <main className="flex flex-col items-center my-20">
      <form className="flex flex-col justify-center gap-5 p-10 border border-solid border-black rounded-lg bg-white min-w-full">
        <h1 className="font-semibold text-lg">Вселенная Рик и Морти</h1>
        <fieldset className="flex flex-col justify-center gap-1">
          <label htmlFor="name">Имя персонажа</label>
          <input
            type="search"
            value={searchQuery as string}
            onChange={handleSearchChange}
            id="name"
            aria-label="Имя персонажа"
            placeholder="Введите имя"
            className="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-cyan-100 focus:border-slate-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </fieldset>
        <fieldset className="flex gap-10 flex-wrap">
          <div className="flex flex-col gap-1">
            <label htmlFor="status-select">Жив?</label>
            <select
              onChange={selectStatusHandler}
              value={statusSettings as string || ' '}
              name="status"
              id="status-select"
              className="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-slate-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              value={speciesSettings as string || ' '}
              name="species"
              id="species-select"
              className="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-slate-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {speciesOptionArray.map((status: OptionType) => (
                <option value={status.value as string} key={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset className="flex flex-col justify-center gap-1">
          <label htmlFor="episode">Эпизод</label>
          <input
            onChange={handleSearchChangeEpisode}
            value={searchQueryEpisode as string}
            type="search"
            id="episode"
            aria-label="Эпизод"
            placeholder="Введите код эпизода"
            className="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-slate-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </fieldset>
        <section className="flex flex-col gap-2" id="results-search">
          <h2 className="font-semibold text-lg">Найдено</h2>

          {character?.results?.length > 0 ? (
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-lg">Персонаж:</span>
              {character?.results?.map((item) => (
                <Link
                  href={`/character/${item.id}`}
                  key={item.id}
                  className="flex gap-2 items-center border border-solid border-slate-300 p-2 rounded-md hover:bg-slate-100"
                >
                  <Image src={item?.image} alt="" width={50} height={50} />
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
                  className="border border-solid border-slate-300 p-2 rounded-md hover:bg-slate-100"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ) : (
            <p>Эпизод не найден</p>
          )}
        </section>
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
