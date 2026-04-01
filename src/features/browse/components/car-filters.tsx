"use client";

import BrandFilter from "./brand-filter";
import ConditionFilter from "./condition-filter";
import ColorFilter from "./color-filter";
import FuelTypeFilter from "./fuel-type-filter";
import ModelFilter from "./models-filter";
import PriceFilter from "./price-filter";
import TransmissionFilter from "./transmission-filter";
import YearFilter from "./year-filter";
import LocationFilter from "./location-filter";
import SubtypeFilter from "./subtype-filter";
import { useLocation } from "react-router-dom";
import VehicleTypeFilter from "./vehicle-type-filter";

const CarFilters = () => {
  const location = useLocation();
  const isOtherVehicles = location.pathname === "/other-vehicles";
  return (
    <>
      <BrandFilter />
      <ModelFilter />
      <FuelTypeFilter />
      <ColorFilter />
      <TransmissionFilter />
      <ConditionFilter />
      <YearFilter />
      <PriceFilter />
      <LocationFilter />
      {isOtherVehicles && <VehicleTypeFilter />}
      <SubtypeFilter />
    </>
  );
};

export default CarFilters;
