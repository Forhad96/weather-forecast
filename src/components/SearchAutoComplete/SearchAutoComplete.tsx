'use client'
import { ReactSearchAutocomplete } from "react-search-autocomplete";

  type Item = {
    id: number;
    name: string;
  };

  type GeonameData = {
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
    admin3_code: string | null;
    admin4_code: string | null;
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


const SearchAutoComplete = ({ cities}) => {
  console.log(cities);
  const items: Item[] = [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Basic",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "Java",
    },
  ];

  const handleOnSearch = (string: string, results: Item[]) => {
    console.log(string, results);
  };

  const handleOnHover = (result: Item) => {
    console.log(result);
  };

  const handleOnSelect = (item: Item) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  const formatResult = (item: Item) => {
    console.log(item);
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {item.name}
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