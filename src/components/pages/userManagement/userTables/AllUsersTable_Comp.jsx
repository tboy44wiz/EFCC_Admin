import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowDown, MinimalisticMagnifer } from "solar-icon-set";

import {
    handleInputChange, handleIsUserReportModalChange, handleSelectedDateChange, handleUpdateSingleUserDetail
} from "../../../../redux/features/userManagement/UserManagement_Slice";
import {useLazyGetAllAgentsQuery, useLazyGetUserActivityQuery} from "../../../../redux/services/api/UserManagement_API";

const AllUsersTableComp = () => {
    const { userTableData, agentId, selectedDateRange } = useSelector((state) => state.userManagementState);
    const [startDate, endDate] = selectedDateRange;
    const dispatch = useDispatch();
    const [getAllAgents] = useLazyGetAllAgentsQuery();
    const [getUserActivity] = useLazyGetUserActivityQuery();

    useEffect(() => {
       (async () => {
           await getAllAgents({ pageNumber: 1, pageSize: 10 });
        })();
    }, []);

    const handleSubmitSearchUserId = async (event) => {
        event.preventDefault();
        await getAllAgents({ pageNumber: 1, pageSize: 10 });
    }

    const columns = [
        {
            name: "Agent ID",
            selector: (row) => row.agentId,
            sortable: true,
            maxWidth: "180px"
        },
        {
            name: "User Name",
            cell: (row) => (
                <div className="flex gap-2 items-center">
                    <img src={ row.profileImageUrl !== null ? row.profileImageUrl : "src/assets/images/user_avatar.png"} alt="user image" className="h-9 w-9 rounded-full" />
                    <div>
                        <p>{row.firstName}</p>
                        <small>{row.emailAddress}</small>
                    </div>
                </div>
            ),
        },
        {
            name: "User Type",
            selector: (row) => (row.roleId === 1) ? "Super Admin" : (row.roleId === 2) ? "Low Level Admin" : (row.roleId === 3) ? "Mid Level Admin" : "High Level Admin",
            sortable: true,
            maxWidth: "200px",
        },
        {
            name: "Phone Number",
            selector: (row) => row.phoneNumber,
            maxWidth: "170px",
        },
        {
            name: "User Creation Date",
            selector: (row) => new  Date(row.createdAt).toLocaleDateString("en-GB"),
            sortable: true,
            maxWidth: "170px",
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <button type="button"
                            onClick={ async () => {
                                dispatch(handleIsUserReportModalChange(true));
                                dispatch(handleUpdateSingleUserDetail(row));
                                dispatch(await getUserActivity({ agentId: row.agentId, pageNumber: 1, pageSize: 10 }));
                            }}
                            className="h-auto min-w-[70px] px-3 py-1 rounded-xl bg-green-100 font-semibold text-green-600"
                    >View</button>
                    <button type="button"
                        // onClick={() => dispatch(handleIsAssetsReportChange(true)) }
                            className="h-auto min-w-[80px] px-3 py-1 rounded-xl bg-red-100 font-semibold text-red-600"
                    >Archive</button>
                </div>
            ),
            maxWidth: "220px",
        },
    ];


    return (
        <section className="h-auto w-full mt-[35px] p-4 bg-white shadow-sm rounded-lg ">
            <div>
                <div className="h-auto w-full mb-2 py-3 flex justify-between items-center  border-b-2 border-gray-200">
                    {/*==== Search Input ====*/}
                    <form onSubmit={ (event) => handleSubmitSearchUserId(event) }
                        className="h-auto w-[300px] flex items-center justify-between bg-gray-200 text-gray-500 rounded-full pl-1 pr-4 transition-all ease-in-out duration-300
                          hover:w-[350px] focus:w-[350px]"
                    >
                        <input type="text" id="agentId" name="agentId"
                               value={ agentId }
                               onChange={ (event) => dispatch(handleInputChange({ name: event.target.name, value: event.target.value })) }
                               className="form-control w-full block bg-clip-padding bg-transparent border-none rounded-l-full font-normal text-base px-3 py-3
                               focus:bg-transparent focus:border-gray-none focus:outline-none"
                               placeholder="Search Agent/Agent ID"
                        />
                        <div onClick={ (event) => handleSubmitSearchUserId(event) }>
                            <MinimalisticMagnifer size="22" className="cursor-pointer" />
                        </div>
                    </form>

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

export default AllUsersTableComp;
