import { useSelector } from "react-redux";

const UserReportDetailsComp = () => {
    const { singleUserDetail } = useSelector((state) => state.userManagementState);
    console.log("Single User Detail::: ", singleUserDetail);

    return (
        <section className="mt-6 p-6 flex gap-4 items-center bg-white rounded-lg">
            <div className=" border border-amber-500 rounded-lg w-[20%] 2xl:w-[15%]" style={{
                    background: " linear-gradient(0deg, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.94)), linear-gradient(169.3deg, rgb(255, 176, 24) 1.22%, rgba(255, 176, 24, 0) 100%)",
                }}
            >
                <div className="grid place-items-center py-6">
                    <img src="src/assets/images/user_image.png" alt="agent image" className="w-28 h-28 bg-blend-multiply bg-slate-900 brightness-50 rounded-full " />
                    <p className="text-sm mt-3 font-thin">
                        Agent ID: <span>{ singleUserDetail.agentId }</span>
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-8 w-[75%] 2xl:grow">
                <div className=" flex justify-between items-center p-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-500">{ `${singleUserDetail.firstName} ${singleUserDetail.middleName} ${singleUserDetail.surname} ` }</h1>
                        <p className="text-gray-700 text-sm">{ (singleUserDetail.roleId === 1) ? "Super Admin" : (singleUserDetail.roleId === 2) ? "Low Level Admin" : (singleUserDetail.roleId === 3) ? "Mid Level Admin" : "High Level Admin" }</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button className="bg-red-100 border border-red-700 px-6 py-2 hover:bg-red-200 rounded-md outline-red-700">Update Role</button>
                        <button className="bg-red-700 text-white hover:bg-red-800 transition-all border px-6 py-2 rounded-md ">Archive User</button>
                    </div>
                </div>
                <div className="bg-white rounded-lg gap-x-6 lg:gap-20 2xl:gap-32 px-8 flex items-center py-4">
                    <div>
                        <small>Phone Number</small>
                        <p className="font-semibold">{ singleUserDetail.phoneNumber }</p>
                    </div>
                    <div>
                        <small>Staff ID</small>
                        <p className="font-semibold">{ singleUserDetail.staffId }</p>
                    </div>
                    <div>
                        <small>Zone</small>
                        <p className="font-semibold">{ singleUserDetail.zone }</p>
                    </div>
                    <div>
                        <small>Department</small>
                        <p className="font-semibold">Anti-Fraud Unit</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserReportDetailsComp;
