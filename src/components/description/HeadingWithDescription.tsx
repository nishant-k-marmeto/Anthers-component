interface HeadingWithDescription {
  title: string; // Heading text
  points: string[]; // List of bullet points
  className?: string; // Custom styles
}

const HeadingWithDescription: React.FC<HeadingWithDescription> = ({
  title,
  points,
  className = "",
}) => {
  return (
    <div className={`max-w-xl mx-auto mt-[-3rem] p-4 ${className}`}>
      <div>
        <p className="text-[12px] font-light leading-[18px] text-gray-800 mb-2">{title}</p>
        <ul className="list-disc text-[12px] font-light leading-[20px] list-outside pl-5 text-gray-600">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default HeadingWithDescription;

