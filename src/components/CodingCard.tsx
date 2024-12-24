import Image from "next/image";

const CodingCard = ({
  cardInfo,
}: {
  cardInfo: {
    name: string;
    description: string;
    imageUrl: string;
    bgColor: string;
  };
}) => {
  const { name, description, imageUrl, bgColor } = cardInfo;

  return (
    <div className="custom-card flex flex-1 gap-5 p-2.5 rounded-xl dark:border-dark-200 bg-[#1A1A1A] dark:bg-dark-200 hover:bg-[#262626] dark:hover:bg-dark-300 hover:border-[#E0E0E0] dark:hover:border-dark-700 transition-colors duration-200">
      <div className={`p-3 ${bgColor} rounded-lg w-fit`}>
        <Image
          src={imageUrl}
          width={1000}
          height={1000}
          alt={`${name} logo`}
          className={`size-8 ${name === "NextJS" ? "dark:invert" : ""}`}
        />
      </div>
      
      <div>
        <p className="text-white-200/70 dark:text-white/70 text-sm mb-2">
          {description}
        </p>
        <h4 className="text-lg font-medium custom-card-text">{name}</h4>
      </div>
    </div>
  );
};

export default CodingCard;