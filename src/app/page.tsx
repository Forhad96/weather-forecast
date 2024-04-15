'use client'
import SearchAutoComplete from "@/components/SearchAutoComplete/SearchAutoComplete";
import CityTable from "@/components/CityTable/CityTable";

import Table from "@/components/CityTable/Table";
import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

    useEffect(() => {
      // Function to fetch city data
      const fetchCities = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=20&start=${
              (page - 1) * 20
            }&q=paris`
          );
          const data = await response.json();
          setCities((prevCities) => [...prevCities, ...data.records]);
          setHasMore(data.records.length === 20);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
        setLoading(false);
      };

      fetchCities();
    }, [page]);

    const handleLoadMore = () => {
      setPage((prevPage) => prevPage + 1);
    };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SearchAutoComplete cities={cities} />
      <CityTable
        cities={cities}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
      />
      <Table />
    </main>
  );
}

async function getAllCity() {
  const response = await fetch(
    "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20"
  );
  return response.json();
}
