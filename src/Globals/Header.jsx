/* eslint-disable react/prop-types */
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { MyContext } from "src/Context/ListingDataContext";
import ToggleButton from "./ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "src/Redux/listingReducer";
import { useEffect } from "react";
const Logo = () => {
  return (
    <Link
      to="/"
      className="flex shrink-0 justify-center items-center text-medium-gold "
    >
      <img
        src="/images/logo/IFBC 6.png"
        alt="IFBC"
        loading="lazy"
        width={130}
        className="inline"
      />
    </Link>
  );
};

const Header = ({ mobileActive, setMobileActive, setActive, active }) => {
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const socials = [
    {
      text: "info@ifbc.co",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      ),
    },
    {
      text: "91-HELP-IFBC",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>
      ),
    },
  ];
  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden && window.innerWidth > 768 ? "-52%" : 0 }}
      id="main-header"
      className="sticky top-0 z-[999]"
    >
      <nav
        className=" w-full flex flex-col items-center justify-center text-white bg-custom-dark-blue border-b-2 border-color-custom-dark-blue xl:border-0 gap-3  "
        id="header-nav"
      >
        <div
          id="navbar-centered"
          className="w-full max-md:flex max-md:justify-between max-md:items-center md:grid grid-cols-3 px-8 py-3 "
        >
          {/* DETAILS */}
          <ul
            id="info-details-header"
            className="max-md:hidden md:flex items-center justify-start gap-5"
          >
            {socials.map((button, index) => (
              <li key={index} className="flex gap-1 text-sm items-center">
                {button.svg}
                <a
                  key={button.text}
                  href={
                    button.text.includes("mail")
                      ? "mailto:" + button.text
                      : "tel:" + button.text
                  }
                >
                  {button.text}
                </a>
              </li>
            ))}
          </ul>

          {/* LOGO */}
          <Logo />

          {/* RIGHT SIDE BUTTONS CONTAINER */}
          <RightSideButtonsContainer
            mobileActive={mobileActive}
            setMobileActive={setMobileActive}
            hidden={hidden}
          />
        </div>

        <Navbar setActive={setActive} active={active} />
      </nav>
    </motion.header>
  );
};

const RightSideButtonsContainer = ({
  mobileActive,
  setMobileActive,
  hidden,
}) => {
  const { token, userDetails, role } = useContext(MyContext);

  return (
    <div className="md:flex md:justify-end md:items-start md:pt-1 md:gap-5 ">
      {/* button appointment */}
      {(!role || role === "N") && (
        <a
          href="https://calendly.com/info-ifbc"
          className="duration-500 max-md:hidden uppercase font-semibold rounded-full hover:bg-custom-heading-color md:flex items-center hover:text-white transition-all  bg-white text-custom-heading-color px-10  text-sm h-10"
        >
          Book an appointment
        </a>
      )}

      {/* cart icon */}
      {(!role || role === "N") && <CartIcon hidden={hidden} />}
      {/* USER BUTTON */}
      <AccountDD token={token} userDetails={userDetails} />

      {/* TOGGLE BUTTON */}
      <ToggleButton
        setMobileActive={setMobileActive}
        mobileActive={mobileActive}
      />
    </div>
  );
};

const CartIcon = ({ hidden }) => {
  const count = useSelector((state) => state.counter.value);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: hidden && window.innerWidth > 768 ? "225%" : 0 }}
    >
      <NavLink
        to="/checkout"
        className="relative bg-white rounded-full w-10 h-10 md:flex items-center justify-center max-md:hidden"
      >
        <div className="-top-1 absolute -right-3">
          <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
            {count}
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="rgb(0 17 54)"
          className=" h-6 w-6 z-90"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </NavLink>
    </motion.div>
  );
};

const AccountDD = ({ userDetails, token, hidden }) => {
  const [active, setActive] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();
  const { role } = useContext(MyContext);
  const [roleName, setRoleName] = useState("Member");
  const loc = useLocation();

  useEffect(() => {
    setActive(false);
  }, [loc.pathname]);

  useEffect(() => {
    if (role) {
      if (role === "N") {
        setRoleName("Member");
      } else if (role === "M") {
        setRoleName("Ambassador");
      } else if (role === "O") {
        setRoleName("Company");
      } else if (role === "C") {
        setRoleName("Consultant/Agent");
      } else if (role === "A") {
        setRoleName("Admin");
      }
    }
  }, [role]);

  const handleLogOut = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
    dispatch(setToken(false));
    window.location.href = "/";
  };
  const elementStyle = active
    ? {
        position: "fixed",
        margin: "0px",
        transform: "translate(0px, 56px)",
        opacity: "1",
        display: "flex",
        flexDirection: "column",
        right: "15px",
        top: "10px",
      }
    : {};

  const [imgSrc, setImgSrc] = useState(
    userDetails?.profileImage
      ? `/images/uploads/${userDetails.profileImage}`
      : "/images/avatar-placeholder.png"
  );
  const handleError = () => {
    setImgSrc("/images/avatar-placeholder.png");
  };
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: hidden && window.innerWidth > 768 ? "200%" : 0 }}
      className="hs-dropdown relative md:inline-flex max-sm:hidden"
    >
      {token ? (
        <>
          <button
            id="user-icon "
            onClick={() => setActive(!active)}
            className="flex shadow-lg flex-wrap items-center justify-start gap-2 cursor-pointer"
          >
            <img
              src={imgSrc}
              alt="User Profile"
              className="w-10 h-10 object-cover rounded-full"
              onError={handleError}
            />
          </button>
          <div
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full z-[999]"
            style={elementStyle}
          >
            <div className="flex flex-col items-start  py-2 px-3">
              <p className="text-[15px] text-[#333] font-bold">
                {userDetails
                  ? userDetails?.firstName?.charAt(0).toUpperCase() +
                    userDetails?.firstName?.slice(1) +
                    " " +
                    userDetails?.lastName?.charAt(0).toUpperCase() +
                    userDetails?.lastName?.slice(1)
                  : "John Doe"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {userDetails ? userDetails?.email : "johndoe23@gmail.com"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{roleName}</p>
            </div>
            {/* logout button */}
            <NavLink
              to="/profile"
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 cursor-pointer"
            >
              My Profile
            </NavLink>

            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 cursor-pointer"
              onClick={handleLogOut}
            >
              Log out
            </a>
          </div>
        </>
      ) : (
        <>
          <button
            id="user-icon "
            onClick={() => setActive(!active)}
            className=" shadow-lg flex-wrap  gap-2 cursor-pointer bg-white w-10 h-10 rounded-full flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="rgb(33, 118, 255)"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>
          <div
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full z-[999]  justify-center items-center"
            style={elementStyle}
          >
            {/* signin button */}
            <NavLink
              to="/login"
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-md text-custom-heading-color hover:bg-gray-300 focus:outline-none focus:bg-gray-100 cursor-pointer w-full"
            >
              Sign In
            </NavLink>

            <NavLink
              to="/registration"
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-md text-custom-heading-color hover:bg-gray-300 focus:outline-none focus:bg-gray-100 cursor-pointer w-full"
            >
              Sign Up
            </NavLink>
          </div>
        </>
      )}
    </motion.div>
  );
};
export default Header;
