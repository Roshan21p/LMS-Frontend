import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';

const CreateCoursePresentation = ({
  handleImageUpload,
  handleAdminInput,
  onFormSubmit,
  adminInput
}) => {
  const { initialCourseData } = useLocation().state;

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen sm:min-h-[80vh]">
        {/* card for creating the new card */}
        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col gap-5 rounded-lg p-4 text-white w-[20rem] sm:w-[43rem] my-10 shadow-[0_0_10px_black] relative"
        >
          <Link
            to={'/admin/dashboard'}
            className="absolute top-5 text-2xl link text-accent cursor-pointer"
          >
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="text-center text-yellow-500 font-bold text-2xl">
            {initialCourseData?.newCourse ? 'Create New Course' : 'Edit Course'}
          </h1>

          {/* for course basic details */}
          <main className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-10">
            {/* left section */}
            <div className="gap-y-6">
              <div>
                {/* input for image file */}
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {adminInput.previewImage ? (
                    <img src={adminInput.previewImage} className="w-full h-44 m-auto border" />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                    </div>
                  )}
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  name="image_uploads"
                  onChange={handleImageUpload}
                />
              </div>

              {/* adding the title section */}
              <div className="flex flex-col gap-1 ">
                <label htmlFor="title" className="text-lg font-semibold">
                  Course title
                </label>
                <input
                  required
                  type="name"
                  name="title"
                  id="title"
                  placeholder="Enter the course title"
                  className="bg-transparent px-2 py-1 border"
                  value={adminInput.title}
                  onChange={handleAdminInput}
                />
              </div>
            </div>

            {/* right section */}
            <div>
              {/* adding the instructor */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="createdBy">
                  Instructor Name
                </label>
                <input
                  required
                  type="name"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter the instructure name"
                  className="bg-transparent px-2 py-1 border"
                  value={adminInput.createdBy}
                  onChange={handleAdminInput}
                />
              </div>
              {/* adding the category */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="category">
                  Course Category
                </label>
                <input
                  required
                  type="name"
                  name="category"
                  id="category"
                  placeholder="Enter the category name"
                  className="bg-transparent px-2 py-1 border"
                  value={adminInput.category}
                  onChange={handleAdminInput}
                />
              </div>

              {/* adding the course description */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="description">
                  Course Description
                </label>
                <textarea
                  required
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter the course description"
                  className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                  value={adminInput.description}
                  onChange={handleAdminInput}
                />
              </div>
            </div>
          </main>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer border-2"
            type="submit"
          >
            {initialCourseData?.newCourse ? 'Create Course' : 'Update Course'}
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default CreateCoursePresentation;
