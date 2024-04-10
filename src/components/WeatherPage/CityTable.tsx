import React from "react";

const CityTable = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">City Name</th>
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">Timezone</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default CityTable;
