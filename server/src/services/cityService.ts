import cities from "../data/cities.json";
import { City } from "../types/city";

export function getCities(): City[] {
  return cities as City[];
}
//returns list of cities from json file