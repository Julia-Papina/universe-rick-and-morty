export type OptionType = {
  value: string;
  label: string;
};

export type CharacterType = {
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
