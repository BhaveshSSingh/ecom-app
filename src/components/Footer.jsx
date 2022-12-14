import { HiShoppingBag } from "react-icons/hi";
import { BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="p-4  rounded-lg shadow rounded-r-none bg-blue-600">
      <div className=" sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center sm:mb-0">
          <HiShoppingBag color="white" size={25} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Small Bazzar
          </span>
        </div>
        <ul className="flex flex-wrap justify-center items-center mb-2 text-sm text-gray-500 sm:mb-0 dark:text-gray-400 ">
          <li>
            <a
              href="https://twitter.com/Bhaveshh_Singh"
              className="mr-4 hover:underline md:mr-6 p-2"
            >
              <BsTwitter color="white" size={20} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/bhavesh-singh-1641001b1/"
              className="mr-4 hover:underline  m-2"
            >
              <BsLinkedin color="white" size={20} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
