export const GifComponent: React.FC<{ image: string; alt: string }> = ({
  image,
  alt,
}) => (
  <div className="max-w-96 object-cover">
    <img className="rounded-xl" src={image} alt={alt} />
  </div>
);
