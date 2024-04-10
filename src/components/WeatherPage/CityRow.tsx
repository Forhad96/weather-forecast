import React from "react";

const CityRow = ({ cityName, country, timezone }) => {
  return (
    <tr className="bg-gray-100 hover:bg-gray-200 cursor-pointer">
      <td className="border px-4 py-2">{"cityName"}</td>
      <td className="border px-4 py-2">{"country"}</td>
      <td className="border px-4 py-2">{"timezone"}</td>
      {/* Add more table data cells as needed */}
    </tr>
  );
};

export default CityRow;
