import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsPencil, BsPersonCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';

const EditProfilePresentation = ({
  onFormSumbit,
  handleInputChange,
  handleImageUpload,
  data,
  loading
}) => {
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={onFormSumbit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[20rem] sm:w-[24rem] h-[30rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold text-yellow-500">Edit Profile</h1>

          <div className="relative w-40 m-auto">
            {/* input for image file */}
            <label className="cursor-pointer" htmlFor="image_uploads">
              {data.previewImage ? (
                <img
                  className="w-28 h-28 rounded-full m-auto"
                  src={data.previewImage}
                  alt="preview image"
                />
              ) : (
                <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
              )}
            </label>
            <input
              onChange={handleImageUpload}
              className="hidden"
              type="file"
              id="image_uploads"
              name="image_uploads"
              accept=".jpg, .jpeg, .png"
              disabled={loading}
            />

            {/* Edit Icon */}
            <button className="absolute right-1 bottom-[-10px] p-2 rounded-full shadow-md  transition-all">
              <div className="w-10 h-10 flex items-center border-2 bg-yellow-500 justify-center rounded-full">
                <BsPencil size={20} color="black" />
              </div>
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="firstName">
              First Name
            </label>
            <input
              required
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter your first name"
              className="bg-transparent px-2 py-1 border"
              value={data.firstName}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="lastName">
              Last Name
            </label>
            <input
              required
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter your last name"
              className="bg-transparent px-2 py-1 border"
              value={data.lastName}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <Link to={loading ? '#' : '/user/profile'}>
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
              <AiOutlineArrowLeft /> Back to Profile
            </p>
          </Link>

          <button
            className="w-full border-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
            disabled={loading}
          >
            Update Profile
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default EditProfilePresentation;
