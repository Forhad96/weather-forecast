// CitiesStore.js
import { types } from "mobx-state-tree";

const City = types.model({
  id: types.identifier,
  name: types.string,
  country: types.string,
  timezone: types.string,
  // Add more properties as needed
});


const citiesStore = types
  .model({
    cities: types.array(City),
  })
  .actions((self) => ({
    fetchCities: async () => {
      try {
        const response = await fetch(
          "https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name"
        );
        const data = await response.json();
        self.cities = data;
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },
  }));

export default citiesStore;
