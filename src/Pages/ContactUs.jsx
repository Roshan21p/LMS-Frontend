import { useState } from 'react';
import { toast } from 'react-hot-toast';

import axiosInstance from '../Helpers/axiosInstance';
import { isEmail } from '../Helpers/regexMatcher';
import HomeLayout from '../Layouts/HomeLayout';

const ContactUs = () => {
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Check for empty fields
    if (!userInput.name || !userInput.email || !userInput.message) {
      toast.error('All fields are mandatory');
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error('Invalid email');
      return;
    }

    try {
      const response = axiosInstance.post('/contact', userInput);
      toast.promise(response, {
        loading: 'Submitting your message...',
        success: 'Form submitted successfully',
        error: 'Failed to submit the form'
      });
      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      toast.error('operation failed....');
    }
  };
  return (
    <HomeLayout>
      <div className="flex flex-col items-center justify-center min-h-[90vh]">
        <div className="text-center mb-8 w-full sm:w-[22rem] ">
          <h1 className="text-3xl font-bold text-yellow-500">Contact Us</h1>
          <p className="text-lg text-gray-300 mt-2">
            Have questions or need support? Fill out the form below, and we&apos;ll get back to you
            as soon as possible.
          </p>
        </div>
        <form
          noValidate
          onSubmit={handleFormSubmit}
          className=" flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[20rem] sm:w-[22rem]"
        >
          {/* <h1 className="text-3xl font-semibold text-yellow-500">Contact Form</h1> */}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={userInput.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="email"
              type="email"
              name="email"
              placeholder="Enter the email"
              value={userInput.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
              id="message"
              type="message"
              name="message"
              placeholder="Enter your message"
              value={userInput.message}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button
            className="w-full border-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ContactUs;
