"use client";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [character, setCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllCountry = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character"
        );
        const data = await response.json();
        setCharacter(data);
        setIsLoading(false);
      } catch (err) {
        alert(err);
      }
    };

    getAllCountry();
  }, []);

  console.log(character);

  return (
    <main className="flex flex-col justify-center items-center">
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <form className="flex flex-col justify-center gap-5 p-10 border border-solid border-black rounded-lg bg-white">
          <h1>Вселенная Рик и Морти</h1>
          <div className="flex flex-col justify-center gap-1">
            <label htmlFor="name">Имя персонажа</label>
            <input
              type="search"
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
                <option value="Alive">Жив</option>
                <option value="Dead">Мертв</option>
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
                <option value="Human">Человек</option>
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
        </form>
      )}
    </main>
  );
};

export default HomePage;
