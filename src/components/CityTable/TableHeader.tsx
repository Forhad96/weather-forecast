import { useEffect, useState } from "react";

const TableHeader = ({allcity}) => {
    
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState("");
    const [cities, setCities] = useState(allcity);
    //    get user location

    // getting data according to input field
    useEffect(() => {
      if (search) {
        const searchedCity = allcity.filter((city: any) => {
          return city.name.toLowerCase().startsWith(search.toLowerCase());
        });
        setCities(searchedCity);
      } else {
        setCities(allcity);
      }
    }, [search, allcity]);
    // handle search funtionality
    const handleSearch = (e: any) => {
      setSearch(e.target.value);
    };

    // filtering the city base on population
    useEffect(() => {
      if (selected) {
        const selectedValu = selected.split("-");
        const selectedCity = allcity.filter((city: any) => {
          return (
            selectedValu[0] <= city?.population &&
            selectedValu[1] >= city?.population
          );
        });
        setCities(selectedCity);
        // clear the search bar
        setSearch("");
      }
    }, [selected, allcity]);

    // handle filter by population functionality
    const hanldeSelect = (e: any) => {
      setSelected(e.target.value);
    };

    return (
      <div className="flex items-center justify-between">
        <h1 className="md:text-xl font-bold text-center text-sm hidden sm:block">
          All Cities
        </h1>
        <div className="flex justify-end items-center gap-2">
          <label htmlFor="">Population</label>
          <select
            className="p-1 rounded-md outline-0 text-black"
            onChange={hanldeSelect}
          >
            <option className="text-sm p-2" value="">
              --Select--
            </option>
            <option className="text-sm p-2" value="0-5000">
              0-5000
            </option>
            <option className="text-sm p-2" value="5000-10000">
              5000-10000
            </option>
            <option className="text-sm p-2" value="10000-20000">
              10000-20000
            </option>
            <option className="text-sm p-2" value="20000-30000">
              20000-30000
            </option>
            <option className="text-sm p-2" value="30000-40000">
              30000-40000
            </option>
            <option className="text-sm p-2" value="40000-50000">
              40000-50000
            </option>
            <option className="text-sm p-2" value="50000-60000">
              50000-60000
            </option>
            <option className="text-sm p-2" value="60000-80000">
              60000-80000
            </option>
            <option className="text-sm p-2" value="100000-999999">
              100000+
            </option>
          </select>
        </div>
        <div className="flex justify-end items-center gap-2 relative">
          <label htmlFor="">Search</label>
          <input
            onChange={handleSearch}
            type="text"
            placeholder="City Name"
            value={search}
            className="text-black outline-none border-none rounded-md py-1 px-2"
          />
          <div className="absolute w-full top-10 bg-white max-h-[300px] overflow-y-auto">
            {cities?.map(
              (items: any, idx: number) =>
                search &&
                search !== items?.name && (
                  <div
                    className="px-4 py-2 hover:bg-sky-500 cursor-pointer text-black"
                    onClick={() => setSearch(items?.name)}
                    key={idx}
                  >
                    {items?.name}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    );
};
export default TableHeader;