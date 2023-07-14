import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleTabChange } from "../../../redux/features/userManagement/UserManagement_Slice";

const TabComp = () => {
  const { selectedTab } = useSelector((state) => state.userManagementState);
  const dispatch = useDispatch();

  const tabItems = ["All Users", "Reported Users", "Archived Users"];

  return (
    <section className="h-auto w-full rounded-md grid grid-cols-1 md:grid-cols-3 items-center text-center">
      {tabItems.map((eachItem) => (
        <div key={eachItem}>
          <p
            onClick={() => dispatch(handleTabChange(eachItem))}
            className={`pt-2 cursor-pointer font-medium text-gray-500 ${
              selectedTab === eachItem && "text-red-600 font-semibold"
            }`}
          >
            {eachItem}
          </p>
          <div
            className={`h-1 w-[70px] mx-auto ${
              selectedTab === eachItem &&
              "h-1 w-[70px] mx-auto bg-red-600 rounded-tl-xl rounded-tr-xl"
            }`}
          />
        </div>
      ))}
    </section>
  );
};

export default TabComp;
