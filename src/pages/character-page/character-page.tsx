"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/loader/loader";
import { useRouter } from "next/navigation";

const CharacterPage = ({ id }: { id: number }) => {
  const router = useRouter();
  const [detailCharacter, setDetailCharacter] = useState(
    [] as unknown as DetailCharacterType
  );
  const [isLoading, setIsLoading] = useState(false);

  type DetailCharacterType = {
    name: string;
    species: string;
    image: string;
    status: string;
  };

  useEffect(() => {
    const getCharacterId = async (id: number) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const data = await response.json();
        setDetailCharacter(data);
        setIsLoading(false);
      } catch (err) {
        alert(err);
      }
    };

    getCharacterId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(detailCharacter);

  return (
    <section className="flex flex-col p-20 gap-5" id="character-detail">
      <h1 className="font-semibold text-2xl text-amber-950">
        Вселенная Рик и Морти
      </h1>
      {isLoading ? (
        <Loader />
      ) : (
        <article className="border border-solid border-neutral-400 rounded-lg p-10">
          <div className="flex gap-1 items-center mb-5">
            <h2>Имя персонажа:</h2>
            <p className="font-semibold text-lg">{detailCharacter.name}</p>
          </div>

          <Image
            src={detailCharacter.image}
            alt="изображение персонажа"
            width={500}
            height={500}
          />
          <div className="flex gap-1 mt-5 items-center">
            <h2 className="">Статус жизни: </h2>
            <p className="font-semibold text-lg">
              {detailCharacter.status === "Alive"
                ? "Жив"
                : detailCharacter.status === "Dead"
                ? "Мёртв"
                : "Неизвестно"}
            </p>
          </div>

          <div className="flex gap-1 mt-3 items-center">
            <h2 className="">Раса: </h2>
            <p className="font-semibold text-lg">
              {detailCharacter.species === "Human"
                ? "Человек"
                : detailCharacter.species === "Alien"
                ? "Пришелец"
                : detailCharacter.species === "Humanoid"
                ? "Гуманоид"
                : detailCharacter.species === "Animal"
                ? "Животное"
                : "Неизвестно"}
            </p>
          </div>
        </article>
      )}
      <button
        type="button"
        onClick={() => router.back()}
        className="border border-solid border-slate-300 px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 w-24"
      >
        Назад
      </button>
    </section>
  );
};

export default CharacterPage;
