const CardRecipe = ({ image, title, duration }) => {
  return (
    <div className="max-w-card rounded-3xl overflow-hidden shadow-lg w-[305px] h-[315px] relative">
      <img
        src={image}
        className=" w-[289px] h-[200px] left-[8px] top-[7px] absolute rounded-3xl"
      />
      <div className="px-6 py-4">
        <div className="left-[22px] top-[233px] absolute text-neutral-800 text-xl font-bold font-Inter leading-normal">
          {title}
        </div>
        <p className="w-[261px] left-[22px] top-[264px] absolute text-orange-600 text-xl font-semibold font-Inter leading-7">
          {duration} menit
        </p>
      </div>
    </div>
  );
};

export default CardRecipe;
