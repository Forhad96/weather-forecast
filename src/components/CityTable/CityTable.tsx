"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import CityRow from "./CityRow";
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

interface CityTableProps {
  cities:City,
  loading:boolean,
  hasMore:boolean,
  onLoadMore:Function
}

const CityTable:React.FC<CityTableProps> = ({ cities, loading, hasMore, onLoadMore }) => {
    const observer = useRef<IntersectionObserver | null>(null);

    const lastCityElementRef = useCallback(
      (node:HTMLElement | null) => {
        if (loading || !hasMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            onLoadMore();
          }
        });
        if (node) observer.current.observe(node);
      },
      [loading, hasMore, onLoadMore]
    );
  return (
    <div className="overflow-x-scroll">
      <table className="min-w-[90%] shadow-md  border mx-auto border-gray-100  my-6">
        <thead className="bg-gray-50">
          <tr className="bg-[#333333] text-white">
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
        <tbody className="bg-white divide-y divide-gray-200">
          {cities.map((city, index) => (
            <CityRow key={city.recordid} city={city} />
          ))}
          {loading && <LoadingIndicator />}
          {hasMore && (
            <tr ref={lastCityElementRef} className="border-b">
              <td colSpan={headers.length} className="px-4 py-2 text-center">
                Loading more...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CityTable;
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
const LoadingIndicator = () => (
  <div className="text-center mt-4">
    <span className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 rounded-full"></span>
    <p className="text-gray-700">Loading...</p>
  </div>
);