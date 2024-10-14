import _ from "lodash";
import { ChangeEvent, useState } from "react";

const useFilter = <T extends object>(defaultValues?: T) => {
  const [filter, setFilter] = useState<T>(defaultValues || ({} as T));

  const paginationHandler = (page: number) => {
    setFilter((prev) => ({ ...prev, page: page - 1 }));
  };

  const changeFilter = (
    name: string,
    value: string | number | boolean | Date | null | string[] | number[]
  ) => {
    setFilter((prev) => {
      if (!value && typeof value !== "number") {
        const newPrev = { ...prev };
        delete newPrev[name as keyof typeof filter];

        return { ...newPrev };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const changeSearch = _.debounce((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    changeFilter(name, value);
  }, 800);

  return {
    filter,
    changeSearch,
    changeFilter,
    paginationHandler,
  };
};

export default useFilter;
