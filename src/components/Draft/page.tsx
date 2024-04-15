'use client'
import SearchAutoComplete from "@/components/SearchAutoComplete/SearchAutoComplete";
import CityTable from "@/components/CityTable/CityTable";

import Table from "@/components/CityTable/Table";
import { useEffect, useState } from "react";
import TableInfinity from "@/components/CityTable/TableInfinity";
import { getAllCityData } from "@/utils/getAllCityData";
interface City {
  recordid: string;
  fields: {
    geoname_id: string;
    name: string;
    ascii_name: string;
    alternate_names: string[];
    feature_class: string;
    feature_code: string;
    country_code: string;
    cou_name_en: string;
    country_code_2: string | null;
    admin1_code: string;
    admin2_code: string;
    admin3_code: string;
    admin4_code: string;
    population: number;
    elevation: number | null;
    dem: number;
    timezone: string;
    modification_date: string;
    label_en: string;
    coordinates: {
      lon: number;
      lat: number;
    };
  };
}



export default function Home() {

    const [cities, setCities] = useState<City[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
      getAllCityData(setCities, setHasMore);
    }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SearchAutoComplete cities={cities} />
      {/* <CityTable
        cities={cities}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
      /> */}
      {/* <Table /> */}
      <hr />

    </main>
  );
}

