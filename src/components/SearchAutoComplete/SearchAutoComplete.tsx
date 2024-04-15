import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { City } from "@/utils/interface";
import { useEffect, useState } from "react";
import { getAllCityData } from "@/utils/getAllCityData";

interface SearchAutoCompleteProps {
  cities: City[];
}

const SearchAutoComplete: React.FC<SearchAutoCompleteProps> = ({ cities }) => {
  const [filterCities, setFilterCities] = useState<City[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    // if (location) {
    // }
    getAllCity(setFilterCities, location);
  }, []);

  console.log(filterCities);
  const handleOnSearch = (event, string: string, results: City[]) => {
    console.log(string, results, event);
    setLocation(string);
  };

  const handleOnHover = (result: City) => {
    console.log(result);
  };

  const handleOnSelect = (item: City) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  const formatResult = (item: City) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          id: {item.recordid}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {item.fields.name}
        </span>
      </>
    );
  };

  return (
    <div style={{ width: 200, margin: 20 }}>
      <ReactSearchAutocomplete
        items={cities}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        onClear={handleOnClear}
        styling={{ zIndex: 4 }} // To display it on top of the search box below
        autoFocus
        formatResult={formatResult}
      />
    </div>
  );
};

export default SearchAutoComplete;
import axios from "axios";

// Fetch cities function
export const getAllCity = async (setCities, cityName) => {
  try {
    const response = await axios.get(
      `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=20&q=${cityName}`
    );
    const newCities = response.data.records;
    const searchData = newCities.map((i)=> i.fields.name == cityName)
    console.log(searchData);
    setCities((prevCities) => [...prevCities, ...newCities]);
  } catch (error) {
    console.error("Error:", error);
  }
};
