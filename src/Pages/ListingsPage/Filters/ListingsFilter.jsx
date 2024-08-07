import { useContext, useEffect, useState } from "react";
import { MyContext } from "src/Context/ListingDataContext";
import CategorySearch from "./CategorySearch";

const ListingsFilter = () => {
  const { filters, setFilters, role } = useContext(MyContext);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (!role || role === "N") {
      const filterDataa = [
        {
          anotherText: "Select Category",
          normalText: "Category",
          property: "category",
        },

        {
          anotherText: "Select Investment Range",
          normalText: "Investment Range",
          property: "investmentRange",
        },
        {
          anotherText: "Select Year Established",
          normalText: "Year Established",
          property: "yearEstablished",
        },
      ];
      setFilterData(filterDataa);
    } else {
      const filterDataa = [
        {
          anotherText: "Select Category",
          normalText: "Category",
          property: "category",
        },
        {
          anotherText: "Select Franchise Fee",
          normalText: "Franchise Fee",
          property: "franchiseFee",
        },
        {
          anotherText: "Select Investment Range",
          normalText: "Investment Range",
          property: "investmentRange",
        },

        {
          anotherText: "Select Owned Units",
          normalText: "Owned Units",
          property: "ownedUnits",
        },

        {
          anotherText: "Select Ramp Up",
          normalText: "Ramp Up",
          property: "rampUp",
        },

        {
          anotherText: "Select Liquidity",
          normalText: "Liquidity",
          property: "liquidity",
        },

        {
          anotherText: "Select Year Established",
          normalText: "Year Established",
          property: "yearEstablished",
        },
      ];
      setFilterData(filterDataa);
    }
  }, [role]);

  // Check if any filters are not empty
  const hasActiveFilters =
    filters &&
    Object.values(filters).some((filterArray) => filterArray.length > 0);
  // Extract active filters
  const activeFilters =
    filters &&
    Object.entries(filters)?.filter(([key, value]) => value.length > 0);

  // const handleRemoveFilter = (key, value) => {
  //   setFilters((prevFilters) => ({
  //     [key]: prevFilters[key].filter((filterValue) => filterValue !== value),
  //   }));
  // };
  return (
    <div id="main-filter-container">
      {hasActiveFilters && (
        <div className="mb-4">
          <button
            onClick={() => setFilters({})}
            className="font-bold cursor-pointer hover:bg-red-800 hover:text-white transition flex items-center gap-1 border-2 border-red-800 px-2 justify-between w-full not-prose uppercase text-red-950"
          >
            Clear All Filters <span className="text-red">X</span>
          </button>
          <div className="mt-2">
            <h3 className="font-semibold">Active Filters:</h3>
            <ul className="divide-y-2">
              {activeFilters.map(([key, values]) =>
                values.map((value) => (
                  <li
                    key={`${key}-${value}`}
                    className="text-gray-700 flex items-center capitalize justify-between py-2 text-xs"
                  >
                    <span className="font-bold">
                      {key.replace(/([A-Z])/g, " $1").trim()} :{" "}
                      {value.replace(/^.*?:/, "").trim()}
                    </span>
                    {/* <button
                      className="ml-2 text-red-600 font-bold cursor-pointer"
                      onClick={() => handleRemoveFilter(key, value)}
                    >
                      X
                    </button> */}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}

      {filterData.map((filter, index) => (
        <CategorySearch
          key={index}
          anotherText={filter.anotherText}
          normalText={filter.normalText}
          property={filter.property}
        />
      ))}
    </div>
  );
};

export default ListingsFilter;
