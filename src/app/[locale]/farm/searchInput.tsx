import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SearchInput() {
  const [inputFirst, setInputFirst] = useState("");
  const [inputSecond, setInputSecond] = useState("");
  const handleSearch = () => {
    console.log("Поиск:", inputFirst, inputSecond);
  };
  const handleReset = () => {
    setInputFirst("");
    setInputSecond("");
  };
  return (
    <div className="flex flex-col md:flex-row mt-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
        <Input
          type="text"
          placeholder="Поиск по названию фермы"
          value={inputFirst}
          onChange={(e) => setInputFirst(e.target.value)}
          className="w-full md:w-96"
        />
        <Input
          type="text"
          placeholder="Поиск по местоположению фермы"
          value={inputSecond}
          onChange={(e) => setInputSecond(e.target.value)}
          className="w-full md:w-96"
        />
      </div>
      <div className="flex space-x-2 mt-4 md:mt-0 md:ml-6">
        <Button
          onClick={handleSearch}
          className="w-full md:w-auto px-4 py-2 rounded"
        >
          Поиск
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full md:w-auto"
        >
          Сброс
        </Button>
      </div>
    </div>
  );
}
