import { RxCrossCircled } from 'react-icons/rx';
import { Link } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';

const CheckoutFailure = () => {
  return (
    <HomeLayout>
      {/* container for checkout fail card  */}
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        {/* card to display message */}
        <div className="w-80 sm:w-96 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-red-500 absolute text-center top-0 w-full py-3 text-3xl font-bold rounded-tl-lg rounded-tr-lg">
            Payment failed
          </h1>
          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">Oops ! Your payment failed</h2>
              <p className="text-center">Please try again later</p>
            </div>

            {/* adding the check symbol */}
            <RxCrossCircled className="text-red-500 text-5xl" />
            <p>Failed</p>
          </div>
          {/* going back to payment page again */}
          <Link
            to="/checkout"
            className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-2xl font-semibold text-center rounded-br-lg rounded-bl-lg"
          >
            <button>Revisit Payment</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckoutFailure;
