"use client";
import { CarProps } from "@/types";
import Image from "next/image";
import { CustomButton } from "@/components";
import { useState } from "react";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import Cardetials from "@/components/CarDetails";

interface CarCardProps {
  car: CarProps;
}

const CardCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;
  const [isOpen, setIsOpen] = useState(false);
  const carRent = calculateCarRent(city_mpg, year);
  return (
    <div className="group flex flex-col p-6 justify-center items-start text-black-100 bg-primary-blue-100 hover:bg-white hover:shadow-md rounded-3xl ">
      <div className="w-full flex justify-between items-start gap-2">
        <h2 className="text-[20px] line-clamp-1  leading-[26px] font-bold capitalize">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
        <span className="self-start text-[14px] leading-[17px] font-semibold">
          $
        </span>
        {carRent}
        <span className="self-end text-[14px] leading-[17px] font-medium">
          /day
        </span>
      </p>
      <div className="relative w-full h-40 my-3">
        {/* on `next/image`, hostname "cdn.imagin.studio" is not configured under images in your `next.config.js, 
      Therefore we need to configure the url under the next.cofig.js  */}
        <Image
          src={generateCarImageUrl(car, "01")}
          fill
          className="object-contain"
          alt=""
        />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-grey">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p className="text-[14px] leading-[17px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="hidden group-hover:flex absolute bottom-0 w-full z-10">
          <CustomButton
            title="View More"
            containerStyles="w-full rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <Cardetials
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
      {/* {city_mpg}<br />{year}<br />{make}<br />{transmission}<br />{model}<br/>{fuel_type}<br />{drive} */}
    </div>
  );
};

export default CardCard;
