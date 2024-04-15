// const options = {
//   method: "GET",
//   url: "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars",
//   params: {
//     make: "lexus",
//     year: "2023",
//     limit: "10",
//   },
//   headers: {
//     "X-RapidAPI-Key": "0bef67a5b5msh6bbb3541871b5d7p1adf22jsn5bbf36949376",
//     "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
//   },
// };

// try {
//   const response = await axios.request(options);
//   console.log(response.data);
// } catch (error) {
//   console.error(error);
// }

// "use client";   to see the array of cars fetch we turn component to a client component
import axios from "axios";
import { CarProps, FilterProps } from "@/types";
export default async function fetchCars(filters: FilterProps) {
  const { manufacturer, limit, year, model, fuel } = filters;
  const headers = {
    "X-RapidAPI-Key": "0bef67a5b5msh6bbb3541871b5d7p1adf22jsn5bbf36949376",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  try {
    const response = await axios.get(
      `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
      {
        headers: headers,
      }
    );
    const result = response.data;
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "hrjavascript-mastery" || "");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  // url.searchParams.append('zoomLevel', `${zoomLevel}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};