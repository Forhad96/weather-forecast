"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

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

const Table = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCityElementRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=20&start=${
          (page - 1) * 20
        }&q=paris`
      )
      .then((response) => response.data)
      .then((data) => {
        setCities((prevCities) => [...prevCities, ...data.records]);
        setHasMore(data.records.length === 20);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="py-3 px-4 text-sm text-center border-b"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => {
            if (cities.length === index + 1) {
              return (
                <tr
                  key={city.recordid}
                  ref={lastCityElementRef}
                  className="border-b"
                >
                  <td className="px-4 py-2">{city.fields.geoname_id}</td>
                  <td className="px-4 py-2">{city.fields.name}</td>
                  <td className="px-4 py-2">{city.fields.country_code}</td>
                  <td className="px-4 py-2">{city.fields.population}</td>
                  <td className="px-4 py-2 w-5 overflow-hidden">
                    {city.fields.alternate_names}
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={city.recordid} className="border-b">
                  <td className="px-4 py-2">{city.fields.geoname_id}</td>
                  <td className="px-4 py-2">{city.fields.name}</td>
                  <td className="px-4 py-2">{city.fields.country_code}</td>
                  <td className="px-4 py-2">{city.fields.population}</td>
                  <td className="px-4 py-2 w-[30px] overflow-hidden">
                    {city.fields.alternate_names}
                  </td>
                  <td className="px-4 py-2 overflow-hidden">
                    {city.fields.population}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      {loading && (
        <div className="text-center mt-4">
          <span className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 rounded-full"></span>
          <p className="text-gray-700">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Table;

const headers = [
  "Geoname ID",
  "Name",
  "Country name EN",
  "ASCII Name",
  "Alternate Names",
  "Population",
  "Digital Elevation Model",
  "Timezones",
  "Country Code",
  "Coordinates",
];
