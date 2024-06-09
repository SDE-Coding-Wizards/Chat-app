import Image from "next/image";

export const ImageComponent: React.FC<{ image: string; alt: string }> = ({
  image,
  alt,
}) => (
  <div className="max-w-96 object-cover ">
    <Image className="rounded-xl" src={image} alt={alt} />
  </div>
);
