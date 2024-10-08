"use client";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import Pagination from "@/components/pagination/pagination";
//import Loader from "@/components/loader/loader";

const HomePage = () => {
  const pageSize = 19;
  const [character, setCharacter] = useState({} as Character);
  //const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [currentSettings, setCurrentSettings] = useState({ currentPage: 1 });

  type Character = {
    info: {
      count: number;
      next: string;
      pages: number;
      prev: null | string;
    };
    results: {
      id: number;
      name: string;
    }[];
  };

  useEffect(() => {
    const getAllCharacter = async (
      currentPage: number,
      searchQuery: string
    ) => {
      // setIsLoading(true);
      try {
        if (searchQuery === " ") {
          return;
        } else {
          const response = await fetch(
            `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${searchQuery}`
          );
          const data = await response.json();
          setCharacter(data);

          // setIsLoading(false);
        }
      } catch (err) {
        alert(err);
      }
    };

    getAllCharacter(currentSettings.currentPage, searchQuery);
  }, [searchQuery, setSearchQuery, currentSettings, setCurrentSettings]);

  const handleSearchChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
      setCharacter({} as Character);
    },
    600
  );

  console.log(character);

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
              name="status"
              id="status-select"
              className="border border-solid border-black rounded-md outline-none p-1"
            >
              <option value="alive">Жив</option>
              <option value="dead">Мертв</option>
              <option value="unknown">Неизвестно</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="species-select">Раса</label>
            <select
              name="species"
              id="species-select"
              className="border border-solid border-black rounded-md outline-none p-1"
            >
              <option value="human">Человек</option>
              <option value="alien">Пришелец</option>
              <option value="humanoid">Гуманоид</option>
              <option value="mythological creature">
                Мифологическое существо
              </option>
              <option value="animal">Животное</option>
              <option value="unknow">Неизвестно</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label htmlFor="episode">Эпизод</label>
          <input
            type="search"
            id="episode"
            aria-label="Эпизод"
            placeholder="Введите номер эпизода"
            className="border border-solid border-black rounded-md outline-none p-1"
          />
        </div>

        <ul>
          <h2 className="font-semibold text-lg">Найдено</h2>
          {character?.results?.length > 0 ? (
            character?.results?.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))
          ) : (
            <p>Ничего не найдено</p>
          )}
        </ul>
       
          <Pagination
            onPageChange={(page) =>
              setCurrentSettings({ currentPage: Number(page) })
            }
            currentPage={currentSettings.currentPage}
            totalCount={character?.info?.count}
           pageSize={pageSize}
          />
       
      </form>
    </main>
  );
};

export default HomePage;
