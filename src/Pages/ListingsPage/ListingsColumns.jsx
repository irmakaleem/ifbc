/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useState } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyContext } from "src/Context/ListingDataContext";
import {
  decrementActiveListing,
  incrementActiveListing,
  incrementByListing,
} from "src/Redux/listingReducer";
import { removeSpecificText } from "src/Utils/SanitizeInput";

const ListingsColumns = ({ listing, index, slider }) => {
  const { activeListings, role } = useContext(MyContext);
  const cartListings = useSelector((state) => state.counter.cartListings);

  const isActive = activeListings?.includes(listing.docId) ? true : false;

  const handleCardClick = () => {
    // Find the index of the listing to be removed
    const index = activeListings.findIndex(
      (listingId) => listingId === listing.docId
    );

    // If the listing is found, proceed to remove it
    if (index !== -1) {
      dispatch(decrementActiveListing(listing.docId));
    } else {
      dispatch(incrementActiveListing(listing.docId));
    }
  };

  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
        ...(!slider && { scale: isActive ? 0.9 : 1 }),
      }}
      animate={{
        opacity: 1,
        y: 0,
        ...(!slider && { scale: isActive ? 0.95 : 0.9 }),
        transition: { duration: 1, delay: index * 0.1 },
      }}
      onClick={handleCardClick} // Correctly call handleCardClick here
      className="flex flex-col justify-between gap-8 bg-white rounded-3xl p-5 cursor-pointer shadow-[1px_1px_5px_grey] min-h-[450px] "
    >
      <motion.div
        id="image-container"
        className="w-full h-full relative flex justify-center"
        whileTap={{ scale: isActive ? 0.9 : 1 }}
      >
        <img
          src={
            listing.imgUrl
              ? "/" + listing.imgUrl
              : "/images/listing-placeholder-img.png"
          }
          alt={listing.name}
          className="object-contain h-44 w-64"
        />
      </motion.div>

      <div
        id="heading-container"
        className="flex flex-col items-center justify-center"
      >
        <h1
          className={`text-custom-heading-color font-bold text-center text-md lg:text-lg`}
        >
          {listing.name}
        </h1>
        <p className="text-sm text-black/80 text-center">
          {listing.shortdescription}
        </p>

        <div
          id="text-content"
          className={` flex flex-col items-center justify-center gap-3 mt-3 w-full`}
        >
          {listing.investmentRange && (
            <p className="bg-white py-2 text-xs text-center font-bold px-4 rounded-full shadow-lg w-full">
              Cash Required: {listing.investmentRange}
            </p>
          )}

          {listing?.category && listing?.category !== "" && (
            <p className="bg-white py-2 text-xs text-center font-bold px-4 rounded-full shadow-lg w-full">
              {listing?.category}
            </p>
          )}
        </div>
        {/* temporary role */}
        {role === "C" ? (
          <a
            href={`/listings-details/${listing?.name
              ?.toLowerCase()
              .split(" ")
              .join("-")}`}
            className="bg-custom-dark-blue w-full mt-3 py-2 text-white text-xs font-semibold rounded-full flex justify-between items-center px-5"
          >
            <span>See More Details</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        ) : cartListings &&
          cartListings.length > 0 &&
          cartListings.includes(listing.docId) ? (
          <a className="bg-custom-blue/80 cursor-not-allowed w-full mt-3 py-2 text-white text-xs font-semibold rounded-full flex justify-between items-center px-5">
            <span>Listing Already Added</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </a>
        ) : (
          <a
            onClick={() => dispatch(incrementByListing(listing.docId))}
            className="bg-custom-orange w-full mt-3 py-2 text-white text-xs font-semibold rounded-full flex justify-between items-center px-5"
          >
            <span>Request Info</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ListingsColumns;
