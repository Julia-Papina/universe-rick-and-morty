export const statusOptionArray = [
    { value: " ", label: "Выберите значение" },
    { value: "alive", label: "Жив" },
    { value: "dead", label: "Мёртв" },
    { value: "unknown", label: "Неизвестно" },
  ];

  export const speciesOptionArray = [
    { value: '', label: 'Выберите значение' },
    { value: "human", label: "Человек" },
    { value: "alien", label: "Пришелец" },
    { value: "humanoid", label: "Гуманоид" },
    { value: "animal", label: "Животное" },
    { value: "unknown", label: "Неизвестно" },
  ];

  export const localStorageSearchQuery = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("queryCharacter");
    }
  };
  export const localStorageSearchQueryEpisode = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("queryEpisode");
    }
  };
  export const localStorageStatus = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("statusFilter");
    }
  };
  export const localStorageSpecies = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("speciesFilter");
    }
  };
