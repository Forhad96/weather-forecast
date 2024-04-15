"use client";
import SearchAutoComplete from "@/components/SearchAutoComplete/SearchAutoComplete";
import Table from "@/components/CityTable/Table";
import { useEffect, useState } from "react";

import { City } from "@/utils/interface";
import { getAllCityData } from "@/utils/getAllCityData";
import InfiniteScroll from "@/components/CityTable/InfiniteScrollTable";

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    getAllCityData(setCities, setHasMore);
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-black/10  items-center justify-between">
      <SearchAutoComplete cities={cities} />
      <hr className="bg-black" />
      <InfiniteScroll
        cities={cities}
        getAllCityData={() => getAllCityData(setCities, setHasMore)}
        hasMore={hasMore}
      />
    </main>
  );
}
