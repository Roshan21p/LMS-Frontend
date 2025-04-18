import aboutMainImage from '../assets/Images/aboutMainImage.png';
import CarouselSlide from '../Components/CarouselSlide';
import celebrities from '../Constants/CelebrityData';
import HomeLayout from '../Layouts/HomeLayout';

const AboutUs = () => {
  return (
    <HomeLayout>
      <div className="pt-10 sm:pt-5 flex flex-col text-white">
        {/* creating the about page main section */}
        <div className="sm:flex  sm:flex-row-reverse sm:pl-20 items-center gap-5 mx-10">
          {/* our moto image section */}
          <div className="w-full sm:w-1/2">
            <img
              id="test1"
              style={{
                filter: 'drop-shadow(0px 10px 10px rgb(0, 0, 0))'
              }}
              className="drop-shadow-2xl"
              src={aboutMainImage}
              alt="aboutMainImage"
            />
          </div>

          {/* out moto section */}
          <section className="sm:w-1/2 w-full space-y-10">
            <h1 className="text-3xl sm:text-5xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide the affordable and quality education to the world. We are
              providing the platform for the aspiring teachers and students to share their
              creativity, skills and knowledge to each other to empower and contribute in the growth
              and wellness of the mankind.
            </p>
          </section>
        </div>

        <div className="carousel w-full sm:w-1/2 my-6 m-auto">
          {celebrities &&
            celebrities.map((celebrity) => (
              <CarouselSlide
                {...celebrity}
                key={celebrity.slideNumber}
                totalSlides={celebrities.length}
              />
            ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default AboutUs;
