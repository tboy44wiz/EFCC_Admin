import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "solar-icon-set";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";

/*==== Import Components ====*/
import EmailNotificationModalWidget from "../../../widgets/EmailNotificationModal_Widget.jsx";

/*==== Import Actions ====*/
import { handleInputChange, toggleShowPassword } from "../../../../redux/features/auths/Auths_Slice";
import { useLoginUserMutation } from "../../../../redux/services/api/Auths_API";

const LoginPageComp = () => {
    const { agentId, password, showPassword } = useSelector((state) => state.authsState);
    const [loginUser, { data, isLoading, isSuccess, isError, error }] = useLoginUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //  React Toast  Custom Methods.
    const warningToast = (message) => {
        return toast.warning(message, { hideProgressBar: true });
    };
    const successToast = (message) => {
        return toast.success(message, { hideProgressBar: true });
    };
    const errorToast = (message) => {
        return toast.error(message, { hideProgressBar: true });
    };

    useEffect(() => {
        if (isSuccess) {
            successToast(`Congratulation!!! ${data.message}. Please check your phone for your TOKEN.`);
            secureLocalStorage.setItem("agentId", agentId);
            return navigate("/token");
        }
    }, [navigate, isSuccess]);

    const handleLogin = async (event) => {
        event.preventDefault();

        const requestData = {
            agentId,
            password,
        };

        (agentId !== "" && password !== "") ? (
            await loginUser(requestData)
        ) : (
            warningToast(`Oops!!! Please AgentID and Password must be filled.`)
        )
    };

    if (isError) {
        errorToast(`Oooops!!! ${error.data.message}.`);
    }


    return (
        <main className="h-screen w-full flex flex-col xl:flex-row" style={{
            backgroundImage: "linear-gradient(97deg, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.65) 100%), url(src/assets/images/efcc_building.png)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundBlendMode: "multiply",
        }}>

            {/* ==== Right Aside ==== */}
            <div className="h-full xl:h-full w-full flex items-center justify-center lg:order-last xl:items-center">
                <div className="h-12 md:h-16 w-12 md:w-16 bg-AppLogo bg-contain bg-center bg-no-repeat fixed top-3 md:top-5 left-5 md:left-10 md:right-auto" />
                <div className="h-auto w-full flex justify-center">
                    <div className="w-[600px] flex flex-col items-center py-16 xl:mr-28 bg-white rounded-xl">
                        <h1 className="font-bold text-xl">Login</h1>

                        <form onSubmit={ (event) => handleLogin(event) } className="w-full flex flex-col items-center mt-10 px-10">
                            <div className="w-full min-w-fit max-w-[500px] my-4 form-group">
                                <input type="text" name="agentId" value={ agentId }
                                       onChange={ (event) => dispatch(handleInputChange({ name: event.target.name, value: event.target.value })) }
                                       className="form-control w-full block bg-gray-50 bg-clip-padding border border-gray-200 rounded shadow-md shadow-gray-200 font-normal text-base px-3 py-3 lg:py-4
                                           focus:bg-white focus:border-gray-400 focus:outline-none"
                                       placeholder="Agent ID"
                                />
                            </div>

                            <div className="w-full min-w-fit max-w-[500px] my-4 form-group relative">
                                <input type={ (showPassword) ? "text" : "password" } name="password" value={ password }
                                       onChange={ (event) => dispatch(handleInputChange({ name: event.target.name, value: event.target.value })) }
                                       className="form-control w-full block bg-gray-50 bg-clip-padding border border-gray-200 rounded shadow-md shadow-gray-200 font-normal text-base px-3 py-3 lg:py-4
                                           focus:bg-white focus:border-gray-400 focus:outline-none"
                                       placeholder="Password"
                                />
                                <span
                                    onClick={ () => dispatch(toggleShowPassword()) }
                                    className="absolute top-[18px] right-0 text-gray-500 cursor-pointer"
                                >
                                    { (showPassword)
                                        ? <span className="mr-4">
                                            <EyeClosed size={24} iconStyle="Outline" />
                                        </span>
                                        : <span className="mr-4">
                                            <Eye size={24} iconStyle="Outline" />
                                        </span>
                                    }
                                </span>
                            </div>

                            <div className="w-full min-w-fit max-w-[500px] mt-5 flex justify-end">
                                <button type="button">
                                    <p className="text-gray-600 text-sm md:text-medium underline">Forgot Password</p>
                                </button>
                            </div>

                            <button type="submit" onClick={ (event) => handleLogin(event) }
                                    className="w-full min-w-fit max-w-[500px] bg-red-800 mt-20 font-medium text-lg text-white rounded-full inline-block py-2 md:py-3 shadow-lg shadow-gray-300 transition duration-150 ease-in-out
                                    hover:bg-red-700 hover:text-white">
                                {
                                    (isLoading) ? ("Please wait...") : ("Submit")
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* ==== Left Aside ==== */}
            <div className="h-full w-[90%] md:pl-[100px] lg:pl-[150px] pr-10 hidden xl:block">
                <div className="h-full w-full grid place-items-center">
                    <div className="px-[40px] py-[40px] rounded-3xl" style={{ background: "linear-gradient(122deg, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0.07) 100%)" }}>
                        <h1 className="font-bold text-[2.5rem] text-white">National Assets Intelligence <br />and Information Management System (NAIIMS)</h1>
                    </div>
                </div>
            </div>

            <EmailNotificationModalWidget />
        </main>
    );
};

export default LoginPageComp;
