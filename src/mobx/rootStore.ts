// RootStore.js
import { types } from "mobx-state-tree";
// import CitiesStore from "./CitiesStore";

const RootStore = types.model({
  citiesStore: CitiesStore,
});

// Create an instance of RootStore
const rootStore = RootStore.create({
  citiesStore: CitiesStore.create({ cities: [] }),
});

export default rootStore;
