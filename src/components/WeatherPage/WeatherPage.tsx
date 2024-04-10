import React from "react";
import CityTable from "./CityTable";
import CityRow from "./CityRow";

const WeatherPage = ({ weatherData }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">{"weatherData?.cityName"}</h2>
      {/* Display weather information here */}
      <CityTable>
        <CityRow/>
      </CityTable>
    </div>
  );
};

export default WeatherPage;
