import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {ArrowLeft} from "solar-icon-set";
import YupValidator from "../../../../utils/Yup_Validator";

/*==== Import Widgets ====*/
import ToastWidget from "../../../widgets/Toast_Widget.jsx";

/*==== Import Actions ====*/
import {
    handleInputChange,
    handleIsCreateUserModalChange,
    handleSelectedRoleChange
} from "../../../../redux/features/userManagement/UserManagement_Slice";

/*==== Import Images ====*/
import VerifiedEmailImage from "../../../../assets/images/verified_email.png";
import {useRegisterUserMutation} from "../../../../redux/services/api/UserManagement_API";


const CreateUserPageComp = () => {
    const { isCreateUserModalOpen, staffId, firstName, middleName, lastName, email, phoneNumber, selectedRole, department, zone, roleOption } = useSelector((state) => state.userManagementState);
    const dispatch = useDispatch();
    // console.log("IS SUCCESS::: ", isSuccess);

    const [registerUser, { isLoading, isSuccess, isError, error }] = useRegisterUserMutation();

    useEffect(() => {
        if (isSuccess) {
            ToastWidget.successToast(`Congratulation!!! Please check your email for your TOKEN.`);
        }
        if (isError) {
            ToastWidget.errorToast(`Oooops!!! ${error.data.message}.`);
        }
    }, [isSuccess, isError]);

    const handleSignupRequest = async (event) => {
        event.preventDefault();
        try {
            const userData = {
                firstName, middleName, lastName,
                emailAddress: email,
                phoneNumber: "+234" + phoneNumber.slice(1),
                roleId: selectedRole.value,
                department, zone
            };
            const requestData = await YupValidator.registerAgent.validate(userData);
            await registerUser(requestData);
            console.log("Request Data::: ", requestData);
        } catch (error) {
            ToastWidget.errorToast(error.errors[0]);
        }
    };


    return (
        <main className={`h-[calc(100%-90px)] lg:h-[calc(100%-125px)] w-full lg:w-[calc(100%-310px)] px-4 pt-4 pb-10 fixed top-[100px] lg:top-[110px] right-0 lg:right-0 bg-gray-100 text-gray-600 transition-all ease-in-out duration-300 z-[999]
            ${ (isCreateUserModalOpen) ? "translate-x-0" : "translate-x-full" }
        `}>
            <button
                onClick={ () => dispatch(handleIsCreateUserModalChange(false)) }
                className="px-4 py-1.5 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full cursor-pointer">
                <ArrowLeft size="24" className="mr-4" />Back
            </button>

            {(!isSuccess) ? (
                <div className="h-full w-full flex justify-center
                        xl:h-full xl:items-center">
                    <div className="w-full lg:w-[760px] pb-0 md:pb-16 lg:mr-28">
                        <h1 className="font-semibold text-center text-xl text-gray-600">Please Complete Your Credentials</h1>

                        <form onSubmit={ (event) => handleSignupRequest(event) } className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 px-6">
                            <div className="w-full form-group">
                                <label htmlFor="staffId">Staff ID</label>
                                <input type="text" id="staffId" name="staffId" value={ staffId }
                                       onChange={ (event) => dispatch(handleInputChange({ name: event.target.name, value: event.target.value })) }
                                       className="form-control w-full block bg-gray-50 bg-clip-padding border border-gray-200 rounded shadow-md shadow-gray-200 font-normal text-base px-3 py-3 lg:py-4
                                                   focus:bg-white focus:border-gray-400 focus:outline-none"
                                       placeholder="First Name"
                                />
                            </div>

                            <hr className="col-span-2" />

                            <div className="w-full form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="firstName" name="firstName" value={ firstName }
                                       onChange={ (event) => dispatch(handleInputChange({ name: event.target.name, value: event.target.value })) }
                                       className="form-control w-full block bg-gray-50 bg-clip-padding border border-gray-200 rounded shadow-md shadow-gray-200 font-normal text-base px-3 py-3 lg:py-4
                                                   focus:bg-white focus:border-gray-400 focus:outline-none"
                                       placeholder="First Name"
                                />
                            </div>

                            <div className="w-full form-group">
                                <label htmlFor="middleName">Middle Name</label>
                                <input type="text" id="middleName" name="middleName" value={ middleName }
                                       onChange={ (event) => dispatch(handleInputChange({ name: event.target.name, value: event.target.value })) }
                                       className="form-control w-full block bg-gray-50 bg-clip-padding border border-gray-200 rounded shadow-md shadow-gray-200 font-normal text-base px-3 py-3 lg:py-4
                                                   focus:bg-white focus:border-gray-400 focus:outline-none"
                                       placeholder="Last Name"
                                />
                            </div>

                            <div className="w-full form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" value={ lastName }
                                       onChange={ (event) => dispatch(handleInputChange({ name: event.target.name, value: event.target.value })) }
                                       className="form-control w-full block bg-gray-50 bg-clip-padding border border-gray-200 rounded shadow-md shadow-gray-200 font-normal text-base px-3 py-3 lg:py-4
                                                   focus:bg-white focus:border-gray-400 focus:outline-none"
                                       placeholder="Last Name"
                                />
                            </div>
                            <div className="w-full form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={ email }
                                       onChange={ (event) => dispatch(handleInputChange({ name: event.target.name, value: event.target.value })) }
                                       className="form-control w-full block bg-gray-50 bg-clip-padding border border-gray-200 rounded shadow-md shadow-gray-200 font-normal text-base px-3 py-3 lg:py-4
                                                   focus:bg-white focus:border-gray-400 focus:outline-none"
                                       placeholder="Email"
                                />
                            </div>
                            <div className="w-full form-group">
                                <label htmlFor="phoneNumber">Phone</label>
                                <input type="text" id="phoneNumber" name="phoneNumber" value={ phoneNumber }
                                       onChange={ (event) => dispatch(handleInputChange({ name: event.target.name, value: event.target.value })) }
                                       className="form-control w-full block bg-gray-50 bg-clip-padding border border-gray-200 rounded shadow-md shadow-gray-200 font-normal text-base px-3 py-3 lg:py-4
                                                   focus:bg-white focus:border-gray-400 focus:outline-none"
                                       placeholder="Phone Number"
                                />
                            </div>

                            <div className="form-group w-full min-w-fit max-w-[700px]">
                                <label htmlFor="assetCategory" className="form-label inline-block mb-1 text-sm text-gray-600">Role</label>
                                <Select name="assetCategory"
                                        options={ roleOption }
                                        value={ selectedRole }
                                        onChange={ (selected) => dispatch(handleSelectedRoleChange(selected)) }
                                        className="form-control w-full block bg-gray-50 bg-clip-padding border border-gray-200 rounded shadow-md shadow-gray-200 font-normal text-base px-1 py-1 lg:py-2
                                                        focus:bg-white focus:border-gray-400 focus:outline-none"
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                background: "transparent",
                                                border: "none",
                                                outline: "none",
                                                boxShadow: "none"
                                            }),
                                        }}
                                />
                            </div>
                            <div className="w-full form-group">
                                <label htmlFor="department">Department</label>
                                <input type="text" id="department" name="department" value={ department }
                                       onChange={ (event) => dispatch(handleInputChange({ name: event.target.name, value: event.target.value })) }
                                       className="form-control w-full block bg-gray-50 bg-clip-padding border border-gray-200 rounded shadow-md shadow-gray-200 font-normal text-base px-3 py-3 lg:py-4
                                                   focus:bg-white focus:border-gray-400 focus:outline-none"
                                       placeholder="Department"
                                />
                            </div>
                            <div className="w-full form-group">
                                <label htmlFor="zone">Zone</label>
                                <input type="text" id="zone" name="zone" value={ zone }
                                       onChange={ (event) => dispatch(handleInputChange({ name: event.target.name, value: event.target.value })) }
                                       className="form-control w-full block bg-gray-50 bg-clip-padding border border-gray-200 rounded shadow-md shadow-gray-200 font-normal text-base px-3 py-3 lg:py-4
                                                   focus:bg-white focus:border-gray-400 focus:outline-none"
                                       placeholder="Zone"
                                />
                            </div>

                            <button type="button"
                                    onClick={ (event) => handleSignupRequest(event) }
                                    className="w-full col-span-2 bg-red-800 mt-4 font-medium text-lg text-white rounded-full inline-block py-2 md:py-3 shadow-lg shadow-gray-300 transition duration-150 ease-in-out
                                            hover:bg-red-700 hover:text-white">
                                {
                                    (isLoading) ? ("Please wait...") : ("Submit")
                                }
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="h-full w-full grid place-content-center">
                    <div className="h-auto w-full flex justify-center rounded-2xl shadow-lg">
                        <div className="w-[600px] flex flex-col items-center pt-6 pb-0 md:pb-16">
                            <img src={ VerifiedEmailImage } alt="Verified Email Image" className="h-auto w-[180px] "/>

                            <h1 className="mt-12 font-bold text-xl">Email sent successfully</h1>
                            <p className="mt-6 text-center">A verification link has been sent to your email. <br />Kindly check your email for the link.</p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default CreateUserPageComp;
