'use client';
import React, { useEffect, useState } from "react";
// import Image from "next/image";
const CharacterPage = ({id} : {id: number}) => {
    const [detailCharacter, setDetailCharacter] = useState([] as unknown as DetailCharacterType);

    type DetailCharacterType = {
        name: string;
        species: string;
        image: string;
    }

    useEffect(() => {
        const getCharacterId = async (id: number) => {
          try {
              const response = await fetch(
                `https://rickandmortyapi.com/api/character/${id}`
              );
              const data = await response.json();
              setDetailCharacter(data)
          } catch (err) {
            alert(err);
          }
        };
        getCharacterId(id);
      }, []);

    console.log(detailCharacter)

    return (
        <div className="flex flex-col">
         <h1 className="font-semibold text-lg">Вселенная Рик и Морти</h1>
      <p>Имя персонажа {detailCharacter.name}</p>
       {/* <Image src={detailCharacter.image} alt='изображение персонажа' width={300} height={300}/>  */}
        </div>
    )
}

export default CharacterPage;