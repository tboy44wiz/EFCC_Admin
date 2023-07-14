import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {handleIsCreateUserModalChange} from "../../../redux/features/userManagement/UserManagement_Slice";

export default function Title_Comp() {
    const { userTableData } = useSelector((state) => state.userManagementState);
    const dispatch = useDispatch();

  return (
      <div className=" bg-red-100  w-full flex items-center rounded-lg shadow-sm justify-between py-6 px-12 ">
          <p className="font-semibold text-2xl">Users ({ userTableData.length })</p>

          <button onClick={ () => dispatch(handleIsCreateUserModalChange(true)) }
              className="px-10 py-1.5 md:py-3.5 bg-red-800 font-semibold text-base text-white rounded-lg">Create User</button>
      </div>
  );
}
