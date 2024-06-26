import React, { useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { MyContext } from "src/Context/ListingDataContext";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import DialogBox from "src/Popups/DialogBox";
import PageTransition from "src/Animations/PageTransition";
import { decrementByListing } from "src/Redux/listingReducer";
import { twMerge } from "tailwind-merge";
import handleInputChange from "src/Utils/handleInputChange";

const CheckOutForm = () => {
  const { listings, loading } = useContext(MyContext);
  const cartListings = useSelector((state) => state.counter.listings);
  const [noCartlistings, setNoCartListings] = useState(true);

  useEffect(() => {
    if (cartListings && cartListings.length > 0) {
      setNoCartListings(false);
    } else {
      setNoCartListings(true);
    }
  }, [cartListings]);

  useLayoutEffect(() => {
    if (loading) {
      document.querySelector("html").style.overflowY = "hidden";
      document.querySelector("html").style.height = "100%";
    }
    if (!loading) {
      document.querySelector("html").style.overflow = "auto";
      document.querySelector("html").style.height = "auto";
    }
  }, [loading]);

  return (
    <PageTransition>
      <div
        id="top-text"
        className="p-10  relative flex flex-col gap-2 justify-center items-center before:absolute before:content-[''] before:top-0 before:w-full before:h-full before:bg-custom-heading-color/60 md:min-h-[400px] before:z-10"
        style={{
          background: "url(/images/banners/checkout.jpg)",
          backgroundAttachment: "fixed",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h1 className="max-md:text-4xl md:text-7xl text-white font-bold text-center z-20">
          CHECKOUT
        </h1>
      </div>
      {!noCartlistings ? (
        <div className="max-md:flex max-md:m-6 flex-col-reverse md:grid grid-cols-12 max-w-7xl md:mx-auto md:my-20 gap-10">
          {/* form */}
          <LeftSidebar cartListings={cartListings} listings={listings} />

          {/* slider */}
          {/* <RightSibebar listings={listings} cartListings={cartListings} /> */}
          <ShoppingCart cartListings={cartListings} listings={listings} />
        </div>
      ) : (
        <NoListingsFound />
      )}
    </PageTransition>
  );
};

const ShoppingCart = ({ cartListings, listings }) => {
  const dispatch = useDispatch();

  return (
    <div id="main-right-container" className="h-full w-full col-span-5">
      <div>
        <h1 className="max-md:text-center text-3xl font-bold capitalize text-custom-heading-color">
          Review Franchises
        </h1>
      </div>

      <div
        id="sub-container"
        className="divide-y-2 divide-custom-heading-color/10 w-full h-[330px] overflow-y-scroll "
      >
        {/* items-row */}
        {cartListings &&
          cartListings.length > 0 &&
          listings
            .filter((listing) => cartListings.includes(listing.DocId))
            .map((listing, index) => {
              // Use a regular expression to find the investment range
              const investmentRangeMatch = listing?.InvestmentRange?.match(
                /Investment Range: \$[\d,]+ - \$[\d,]+/
              );

              const investmentRange = investmentRangeMatch
                ? investmentRangeMatch[0]?.split(":")[1]
                : "";

              return (
                <div
                  key={index}
                  className=" flex flex-col sm:flex-row justify-between  items-center py-3 relative"
                >
                  <div
                    id="item-side"
                    className="flex flex-col sm:flex-row gap-1 items-center w-full"
                  >
                    <div>
                      <img
                        src={`./${listing.imgUrl}`}
                        alt=""
                        className="rounded-lg"
                        width={100}
                      />
                    </div>
                    <div
                      id="content-side"
                      className="flex flex-col max-sm:items-center"
                    >
                      <h2 className="text-md font-bold">{listing.name}</h2>

                      <h2 className="text-xs">
                        Cash Required: <b>{investmentRange}</b>
                      </h2>
                    </div>
                  </div>
                  <div
                    onClick={() => dispatch(decrementByListing(listing.DocId))}
                    id="btn-side"
                    className="sm:px-6 max-sm:absolute max-sm:top-[10px] max-sm:right-[40px] max-sm:rounded-full max-sm:w-8 max-sm:h-8 max-sm:bg-red-700 max-sm:text-white max-sm:flex max-sm:justify-center max-sm:items-center sm:text-red-800 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
      </div>

      {/* btn row */}
      <div
        id="button-container"
        className="flex max-sm:justify-center sm:justify-center items-center py-5 gap-5 "
      >
        <NavLink
          to="/listings"
          className="candidate-btn flex items-center w-64 justify-between"
        >
          See More Listings
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
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </NavLink>
      </div>
    </div>
  );
};

const LeftSidebar = ({ cartListings, listings }) => {
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [formFields, setFormFields] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const validateFields = () => {
    const reqFields = [
      "name",
      "city",
      "country",
      "email",
      "phone",
      "zipcode",
      "state",
    ];
    let allFieldsValid = true;

    reqFields.forEach((field) => {
      const newKey = field.toLowerCase();
      if (!formFields[newKey] || formFields[newKey].trim() === "") {
        setFormErrors((prev) => ({
          ...prev,
          [newKey]: "This field is required",
        }));
        allFieldsValid = false;
      } else {
        setFormErrors((prev) => ({ ...prev, [newKey]: "" }));
      }
    });

    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(formFields.email)) {
      setFormErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      allFieldsValid = false;
    }

    return allFieldsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const allFieldsValid = validateFields();
      if (!allFieldsValid) {
        setFormErrors((prev) => ({
          ...prev,
          error: "Please fill in all the required fields correctly",
        }));
        setLoading(false);
        window.scrollTo(0, 500);
        return;
      }
      const formData = {
        name: formFields.name,
        phone: formFields.phone,
        email: formFields.email,
        city: formFields.city,
        country: formFields.country,
        zipcode: formFields.zipcode,
        state: formFields.state,
        cartListings: JSON.stringify(cartListings),
      };

      const jsonData = JSON.stringify(formData);
      const baseUrl =
        "http://siddiqiventures-001-site3.ktempurl.com/checkout_api.aspx";

      // Send the POST request using Axios
      const response = await axios.post(baseUrl, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (
        response.status === 200 &&
        response.data === "Checkout Information Saved Successfully."
      ) {
        setFormErrors({});
        setSuccessMsg("Thank you for requesting!");
        setLoading(false);
        setShow(true);

        setTimeout(() => {
          setShow(false);
          listings
            .filter((listing) => cartListings.includes(listing.DocId))
            .map((listing) => {
              dispatch(decrementByListing(listing.DocId));
            });
          history("/");
        }, 2000);

        // setTimeout(() => {
        //   history("/");
        // }, 3000);
      } else {
        setFormErrors({ error: response.data });
        setLoading(false);
        window.scrollTo(0, 500);
        // Handle unexpected response
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="left-side-checkout-form" className="col-span-7">
      <DialogBox setShow={setShow} show={show}>
        <button
          className="absolute top-5 right-10"
          onClick={() => setShow(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="size-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <div className="bg-white p-10 flex flex-col gap-3">
          <h1 className="text-3xl uppercase text-center">{successMsg}</h1>
          <p className="text-xl text-center">We will contact you soon.</p>
        </div>
      </DialogBox>
      <div className="flex flex-col rounded-lg ">
        {formErrors.error && (
          <p className="border-2 border-red-600 text-red-600 p-4 flex justify-between">
            {formErrors.error}
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
                d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
              />
            </svg>
          </p>
        )}

        <div>
          <h1 className="text-3xl font-bold capitalize text-custom-heading-color max-md:text-center">
            Fill in your details
          </h1>
        </div>

        <div className="mt-4">
          <label className="text-custom-heading-color" htmlFor="name">
            Name
          </label>
          <input
            onChange={handleInputChange}
            name="name"
            placeholder="Your name"
            className={`candidate-input ${formErrors.name ? "bg-red-300" : ""}`}
            type="text"
            defaultValue={""}
          />
        </div>

        <div className="mt-4 flex flex-row space-x-2">
          <div className="flex-1">
            <label className="text-custom-heading-color" htmlFor="state">
              Email
            </label>
            <input
              onChange={handleInputChange}
              name="email"
              placeholder="Your email"
              className={twMerge(
                `candidate-input`,
                formErrors.email ? "bg-red-300" : ""
              )}
              id="email"
              type="email"
            />
          </div>
          <div className="flex-1">
            <label className="text-custom-heading-color" htmlFor="city">
              Phone
            </label>
            <input
              onChange={handleInputChange}
              name="phone"
              placeholder="Your phone"
              className={`candidate-input ${
                formErrors.phone ? "bg-red-300" : ""
              }`}
              id="phone"
              type="number"
              defaultValue={""}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-row space-x-2">
          <div className="flex-1">
            <label className="text-custom-heading-color" htmlFor="city">
              City
            </label>
            <input
              onChange={handleInputChange}
              name="city"
              placeholder="Your city"
              className={`candidate-input ${
                formErrors.city ? "bg-red-300" : ""
              }`}
              id="city"
              type="text"
              defaultValue={""}
            />
          </div>
          <div className="flex-1">
            <label className="text-custom-heading-color" htmlFor="state">
              State
            </label>
            <input
              onChange={handleInputChange}
              name="state"
              placeholder="Your state"
              className={`candidate-input ${
                formErrors.state ? "bg-red-300" : ""
              }`}
              id="state"
              type="text"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-row space-x-2">
          <div className="flex-1">
            <label className="text-custom-heading-color" htmlFor="zip">
              ZIP
            </label>
            <input
              onChange={handleInputChange}
              name="zipcode"
              placeholder="Your ZIP code"
              className={`candidate-input ${
                formErrors.zipcode ? "bg-red-300" : ""
              }`}
              id="zip"
              type="text"
            />
          </div>
          <div className="flex-1">
            <label className="text-custom-heading-color" htmlFor="country">
              Country
            </label>
            <select
              name="country"
              className={`candidate-select w-full ${
                formErrors.country ? "bg-red-300" : ""
              }`}
              id="country"
              onChange={handleInputChange}
            >
              <option value>Select a country</option>
              <optgroup label="Africa">
                <option value="AF">Afghanistan</option>
                <option value="DZ">Algeria</option>
                <option value="AO">Angola</option>
                ...
                <option value="ZW">Zimbabwe</option>
              </optgroup>
              <optgroup label="Asia">
                <option value="AM">Armenia</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BH">Bahrain</option>
                ...
                <option value="YE">Yemen</option>
              </optgroup>
              <optgroup label="South America">
                <option value="AR">Argentina</option>
                <option value="BO">Bolivia</option>
                <option value="BR">Brazil</option>
                ...
                <option value="VE">Venezuela</option>
              </optgroup>
              ...
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            className="candidate-btn w-64 flex justify-between items-center"
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Request Now"}
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
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const NoListingsFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 md:my-20 max-md:m-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="rgb(0, 17, 54)"
        className="max-md:size-32 md:size-64"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>

      <h1 className="max-md:text-3xl md:text-5xl text-center font-bold text-custom-heading-color">
        NO LISTINGS ADDED TO CART
      </h1>
      <NavLink to="/listings" className="candidate-btn capitalize">
        Add Listings
      </NavLink>
    </div>
  );
};

export default CheckOutForm;
