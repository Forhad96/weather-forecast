"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

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
    coordinates: [number, number];
  };
}

const TableInfinity = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=20&q=paris`
      );
      const newCities = response.data.records;
      setCities((prevCities) => [...prevCities, ...newCities]);
      setHasMore(newCities.length === 20);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(cities);

  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <InfiniteScroll
        dataLength={cities.length}
        next={fetchCities}
        hasMore={hasMore}
        loader={
          <div className="text-center mt-4">
            <span className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 rounded-full"></span>
            <p className="text-gray-700">Loading...</p>
          </div>
        }
        endMessage={<p className="text-center mt-4">No more cities to load.</p>}
      >
        <table className="table-auto w-full">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="py-3 px-2 bg-black/20 text-sm text-center border-b"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr
                key={city.recordid}
                className="border-b hover:bg-gray-50 transition duration-300"
              >
                <td className="px-4 py-4 border-b">{city.fields.geoname_id}</td>
                <td className="px-4 py-4 border-b">{city.fields.name}</td>
                <td className="px-4 py-4 border-b">
                  {city.fields.cou_name_en}
                </td>
                <td className="px-4 py-4 border-b">{city.fields.ascii_name}</td>
                {/* <td className="px-4 py-4 border-b  overflow-auto">{city.fields.alternate_names}</td> */}
                <td className="px-4 py-4 border-b text-center">
                  {city.fields.population}
                </td>
                <td className="px-4 py-4 border-b text-center">
                  {city.fields.dem}
                </td>
                <td className="px-4 py-4 border-b">{city.fields.timezone}</td>
                <td className="px-4 py-4 border-b text-center">
                  {city.fields.country_code}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {city.fields.coordinates[0]},{city.fields.coordinates[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default TableInfinity;

const headers = [
  "Geoname ID",
  "Name",
  "Country name EN",
  "ASCII Name",
  // "Alternate Names",
  "Population",
  "Digital Elevation Model",
  "Timezones",
  "Country Code",
  "Coordinates",
];
