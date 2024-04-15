import axios from "axios";

// Fetch cities function
export const getAllCityData = async (setCities, setHasMore,searchCityName) => {
  try {
    if(searchCityName){
          const response = await axios.get(
            `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=20&q=${searchCityName}`
          );
          const newCities = response.data.records;
          setCities(newCities)
    }
    else{
      
          const response = await axios.get(
            "https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=20"
          );
          const newCities = response.data.records;
          setCities((prevCities) => [...prevCities, ...newCities]);

    }
    setHasMore(newCities.length === 20);
  } catch (error) {
    console.error("Error:", error);
  }
};

