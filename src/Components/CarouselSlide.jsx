const CarouselSlide = ({ image, title, description, slideNumber, totalSlides }) => {
  return (
    <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
      <div className="flex flex-col items-center justify-center gap-4 px-[15%] ">
        <img src={image} alt={title} className="w-40 rounded-full border-2 border-gray-400" />
        <p className="text-xl text-gray-200 text-center">{description}</p>
        <h3 className="text-2xl font-semibold text-center">{title}</h3>

        {/* Navigation arrows */}
        <div className="flex justify-between items-center w-full mt-4 md:mt-0 md:absolute md:top-1/2 md:transform md:-translate-y-1/2 left-0 ">
          <a
            href={`#slide${slideNumber === 1 ? slideNumber : slideNumber - 1} `}
            className="btn btn-circle bg-yellow-500 hover:bg-yellow-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-transform transform hover:scale-110"
          >
            ❮
          </a>
          <a
            href={`#slide${slideNumber === totalSlides ? slideNumber : slideNumber + 1} `}
            className="btn btn-circle bg-yellow-500 hover:bg-yellow-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-transform transform hover:scale-110"
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlide;
