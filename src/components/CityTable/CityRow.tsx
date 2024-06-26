import React, { FC } from "react";
import { City } from "@/utils/interface";


interface CityRowProps {
  city:City,

}

const CityRow:React.FC<CityRowProps> = ({ city }) => {

  const handleWeather= (cityName:string)=>{
console.log(cityName);
window.open(`/weather?city=${cityName}`, "_blank");

  }
  // return
  return (
    <tr
      key={city.fields.geoname_id}
      className="hover:bg-gray-50 transition duration-300"
    >
      <td className="px-4 py-4 border-b">{city.fields.geoname_id}</td>
      <td className="px-4 py-4 border-b" onClick={()=> handleWeather(city.fields.name)}>{city.fields.name}</td>
      <td className="px-4 py-4 border-b">{city.fields.cou_name_en}</td>
      <td className="px-4 py-4 border-b">{city.fields.ascii_name}</td>
      {/* <td className="px-4 py-4 border-b  overflow-auto">{city.fields.alternate_names}</td> */}
      <td className="px-4 py-4 border-b text-center">
        {city.fields.population}
      </td>
      <td className="px-4 py-4 border-b text-center">{city.fields.dem}</td>
      <td className="px-4 py-4 border-b">{city.fields.timezone}</td>
      <td className="px-4 py-4 border-b text-center">
        {city.fields.country_code}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        {city.fields.coordinates[0]},{city.fields.coordinates[1]}
      </td>
    </tr>
  );
};

export default CityRow;
