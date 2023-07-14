import {useSelector} from "react-redux";
import DataTable from "react-data-table-component";
import {ArrowDown} from "solar-icon-set";

const UserActivityTableComp = () => {
    const { userActivityTableData } = useSelector((state) => state.userManagementState);

    const columns = [
        {
            name: "Action",
            selector: (row) => row.action,
            sortable: true,
        },
        {
            name: "Remark",
            selector: (row) => row.remark,
            sortable: true,
            maxWidth: "250px"
        },
        {
            name: "Date",
            selector: (row) => new Date(row.dateTime).toLocaleDateString("en-GB"),
            sortable: true,
            maxWidth: "250px"
        },
        {
            name: "Time",
            selector: (row) => new Date(row.dateTime).toLocaleTimeString(),
            maxWidth: "250px"
        }
    ];

    return (
        <section className="mt-6 p-6 items-center bg-white rounded-lg">
            <DataTable
                columns={columns}
                data={userActivityTableData}
                title={"Recent Activities"}
                fixedHeader={false}
                striped={true}
                highlightOnHover={true}
                defaultSortField="date"
                defaultSortAsc={true}
                sortIcon={<ArrowDown />}
                responsive
                pagination
            />
        </section>
    );
};

export default UserActivityTableComp;
