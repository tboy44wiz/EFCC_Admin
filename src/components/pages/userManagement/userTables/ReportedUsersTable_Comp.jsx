import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowDown, MinimalisticMagnifer } from "solar-icon-set";

import {
  handleInputChange, handleIsUserReportModalChange, handleSelectedDateChange
} from "../../../../redux/features/userManagement/UserManagement_Slice";

const ReportedUsersTableComp = () => {
  const { userTableData, agentId, selectedDateRange } = useSelector((state) => state.userManagementState);
  const dispatch = useDispatch();

  const [startDate, endDate] = selectedDateRange;

  const columns = [
    {
      name: "Agent ID",
      selector: (row) => row.agentId,
      sortable: true,
      maxWidth: "200px"
    },
    {
      name: "User Name",
      cell: (row) => (
          <div className="flex gap-2 items-center">
            <img src={row.userImage} alt="user image" className="w-8 h-8" />
            <div>
              <p>{row.userName}</p>
              <small className="hidden 2xl:block">{row.userEmail}</small>
            </div>
          </div>
      ),
    },
    {
      name: "User Type",
      selector: (row) => row.userType,
      sortable: true,
      maxWidth: "250px",
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      maxWidth: "190px",
    },
    {
      name: "User Creation Date",
      selector: (row) => row.userCreationDate,
      sortable: true,
      maxWidth: "190px",
    },
    {
      name: "Actions",
      cell: () => (
          <div className="flex items-center gap-3">
            <button type="button"
                    onClick={() => dispatch(handleIsUserReportModalChange(true))}
                    className="h-auto min-w-[70px] px-3 py-1 rounded-xl bg-green-100 font-semibold text-green-600"
            >View Report</button>
          </div>
      ),
      maxWidth: "150px",
    },
  ];

  return (
    <section className="h-auto w-full mt-[35px] p-4 bg-white shadow-sm rounded-lg ">
      <div>
        <div className="h-auto w-full mb-2 py-3 flex justify-between items-center  border-b-2 border-gray-200">
          {/*==== Search Input ====*/}
          <div className="h-auto w-[300px] flex items-center justify-between bg-gray-200 text-gray-500 rounded-full pl-1 pr-4 transition-all ease-in-out duration-300
                          hover:w-[350px] focus:w-[350px]"
          >
            <input type="text" id="agentId" name="agentId"
                   value={ agentId }
                   onChange={ (event) => dispatch(handleInputChange({ name: event.target.name, value: event.target.value })) }
                   className="form-control w-full block bg-clip-padding bg-transparent border-none rounded-l-full font-normal text-base px-3 py-3
                               focus:bg-transparent focus:border-gray-none focus:outline-none"
                   placeholder="Search Agent/Agent ID"
            />
            <MinimalisticMagnifer size="22" className="cursor-pointer"
              //   onClick={() => handleSearchForInventory()}
            />
          </div>

          <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date - End Date"
              onChange={(date) => dispatch(handleSelectedDateChange(date))}
              className="bg-transparent px-3 py-2 border border-slate-200 rounded-md outline-slate-400"
          />
        </div>

        <DataTable
          columns={columns}
          data={userTableData}
          fixedHeader={false}
          striped={true}
          highlightOnHover={true}
          defaultSortField="name"
          defaultSortAsc={true}
          sortIcon={<ArrowDown />}
          responsive
          pagination
        />
      </div>
    </section>
  );
};

export default ReportedUsersTableComp;
