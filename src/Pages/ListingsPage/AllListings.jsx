import { useContext, useEffect, useState } from "react";
import ListingsColumns from "./ListingsColumns";
import BarLoader from "src/Animations/BarLoader";
import Pagination from "./Pagination";
import { MyContext } from "src/Context/ListingDataContext";

const AllListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    filters,
    paginationListings,
    setPaginationListings,
    listings,
    loading,
    activeListings,
    showActiveListings,
  } = useContext(MyContext);
  const [filterListings, setFilterListings] = useState();
  const totalNoOfListings = window.innerWidth < 768 ? 10 : 25;

  const filterKeys = [
    "search",
    "category",
    "units",
    "memberships",
    "FranchiseFee",
    "InvestmentRange",
    "Item19",
    "Liquidity",
    "Memberships",
    "MinimumNetWorth",
    "MonthCash",
    "Multiple",
    "NationalAdvertising",
    "NumberofEmployees",
    "OwnedUnits",
    "PassiveOwnership",
    "ProjectedNewUnits",
    "RampUp",
    "Royalty",
    "RoyaltyDescription",
    "Single",
    "Territories",
    "TypeofBusiness",
    "YearEstablished",
  ];

  useEffect(() => {
    if (listings.length > 0) {
      const filteredListings = filters
        ? listings.filter((listing) => {
            return filterKeys.every((key) => {
              if (
                filters.hasOwnProperty(key) &&
                filters[key] !== "" &&
                filters[key].length > 0
              ) {
                if (Array.isArray(filters[key]) && key === "search") {
                  const searchString = filters["search"][0].toLowerCase();
                  console.log(listing.name);
                  return filters["search"].some((searchString) =>
                    listing.name.toLowerCase().includes(searchString)
                  );
                } else if (Array.isArray(filters[key])) {
                  return filters[key].some(
                    (filterValue) =>
                      listing[key]?.toLowerCase() === filterValue.toLowerCase()
                  );
                } else {
                  return listing[key]
                    ?.toLowerCase()
                    .includes(filters[key].toLowerCase());
                }
              }
              return true;
            });
          })
        : listings;
      setFilterListings(filteredListings);

      // Get current listings
      const indexOfLastListing = currentPage * totalNoOfListings;
      const indexOfFirstListing = indexOfLastListing - totalNoOfListings;
      let currentListings = filteredListings.slice(
        indexOfFirstListing,
        indexOfLastListing
      );
      setPaginationListings(currentListings);
    }
  }, [listings, currentPage, filters]);

  // Change page
  const paginate = (pageNumber) => {
    window.scrollTo({
      top: window.innerWidth < 768 ? 1150 : 0,
      behavior: "smooth",
    });
    setCurrentPage(pageNumber);
  };

  return loading ? (
    <div className="grid place-content-center">
      <BarLoader bgcolor={"blue"} />
    </div>
  ) : (
    <>
      <div className="flex justify-between items-center">
        <p className="ml-5 text-custom-heading-color font-bold">
          Showing {paginationListings?.length} out of {listings.length} (FLS
          Listings)
        </p>{" "}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filterListings?.length / totalNoOfListings)}
          onPageChange={paginate}
        />
      </div>

      <div
        id="listing-columns"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {showActiveListings &&
          paginationListings &&
          paginationListings
            .filter((listing) => activeListings?.includes(listing.name))
            .map((listing, index) => (
              <ListingsColumns key={index} index={index} listing={listing} />
            ))}
        {!showActiveListings &&
          paginationListings?.map((listing, index) => (
            <ListingsColumns key={index} index={index} listing={listing} />
          ))}
      </div>
      {/* Pagination */}

      <div className="w-full flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filterListings?.length / totalNoOfListings)}
          onPageChange={paginate}
        />
      </div>
    </>
  );
};

export default AllListings;
