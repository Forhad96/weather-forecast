// BackgroundImage.tsx
import React from "react";
import Image from "next/image";

const BackgroundImage: React.FC = () => (
  <Image
    src="https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    layout="fill"
    alt="background Image"
    className="object-cover"
  />
);

export default BackgroundImage;
