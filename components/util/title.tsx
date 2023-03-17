import React from "react";
import Image from "next/image";

export const Title = (props) => {
  return (
    <div className="flex items-center">
      {props.image && (
        <Image
          className="relative w-24 md:w-32 lg:w-auto"
          alt={props.image.alt}
          src={props.image.src}
          width={128}
          height={128}
        />
      )}
      <h2
        className={`relative m-0 text-3xl md:text-4xl lg:text-5xl ml-4 md:ml-6 lg:ml-10`}
      >
        {props?.title}
      </h2>
    </div>
  );
};
