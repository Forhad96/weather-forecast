import { City } from "@/utils/interface";
import CityRow from "./CityRow";

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

interface TableProps {
  cities: City[];
}

const Table: React.FC<TableProps> = ({ cities }) => {
  // console.log(cities);
  return (
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
        {cities.map((city,index) => (
          <CityRow key={index} city={city} />
        ))}
      </tbody>
    </table>
  );
};
export default Table;
