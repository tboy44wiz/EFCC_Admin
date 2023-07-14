import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import PinInput from "react-pin-input";
import jwtDecode from "jwt-decode";

/*==== Import Components ====*/
import EmailNotificationModalWidget from "../../../widgets/EmailNotificationModal_Widget.jsx";
import ToastWidget from "../../../widgets/Toast_Widget.jsx";

import { useValidateUserMutation } from "../../../../redux/services/api/Auths_API";
import { handleTokenInputChange } from "../../../../redux/features/auths/Auths_Slice";


const TokenPageComp = () => {
    const { email } = useSelector((state) => state.authsState);
    const [validateUser, { data, isLoading, isSuccess, isError, error }] = useValidateUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            const { agentId, roleId, sub, exp } = jwtDecode(data.data.accessToken);
            const userData = {
                agentId,
                role: (roleId === "1") ? "Super Admin" : (roleId === "2") ? "Low Level Admin" : (roleId === "3") ? "Mid Level Admin" : "High Level Admin",
                accessToken: data.data.accessToken,
                sub,
                exp
            };
            secureLocalStorage.removeItem("agentId");
            secureLocalStorage.setItem("userData", JSON.stringify(userData));
            ToastWidget.successToast(`Congratulation!!! Login successful.`);
            navigate("/dashboard", { state: { pageTitle: "My Dashboard", subTitle: "Greetings..." } });
            console.log("DECODED::: ", userData);
            // JSON.parse(secureLocalStorage.getItem('userData'));
        }
        if (isError) {
            ToastWidget.errorToast(`Oooops!!! ${error.data.message}.`);
        }
    }, [isSuccess, isError]);

    const handleSubmitToken = async (value) => {
        const agentId = await secureLocalStorage.getItem("agentId");
        const requestData = { agentId, token: value };
        await validateUser(requestData);
    };


    return (
        <main className="h-screen w-full flex flex-col xl:flex-row" style={{
            backgroundImage: "linear-gradient(97deg, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.65) 100%), url(src/assets/images/efcc_building.png)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundBlendMode: "multiply",
        }}>
            <div className="h-full w-full flex items-center justify-center lg:order-last xl:h-full xl:items-center">
                <div className="h-12 md:h-16 w-12 md:w-16 bg-AppLogo bg-contain bg-center bg-no-repeat fixed top-3 md:top-5 left-5 md:left-10 md:right-auto" />
                <div className="h-auto w-full flex justify-center">
                    <div className="w-[600px] flex flex-col items-center py-16 bg-white rounded-xl">
                        <h1 className="font-bold text-xl">Verify Account</h1>
                        <p className="text-sm">Please kindly verify your account by inputting the OTP sent to your { email }.</p>

                        <form className="w-full flex flex-col items-center mt-10 px-10">
                            <div className="w-full min-w-fit max-w-[500px] form-group">
                                <div className="">
                                    <PinInput
                                        length={6}
                                        initialValue=""
                                        secret
                                        secretDelay={100}
                                        onChange={(value) => { dispatch(handleTokenInputChange({ value: value })) }}
                                        type="numeric"
                                        inputMode="number"
                                        style={{ display: "flex", justifyContent: "space-between", padding: '10px' }}
                                        inputStyle={{ borderColor: "#FECACA", borderRadius: "10px", borderWidth: "2px", fontSize: "40px", color: "#DF4A4E"}}
                                        inputFocusStyle={{borderColor: "#F87171"}}
                                        onComplete={ (value) => handleSubmitToken(value) }
                                        autoSelect={true}
                                        className="w-full bg-green-200"
                                    />
                                </div>
                            </div>

                            <button type="button"
                                    className="w-full min-w-fit max-w-[500px] bg-red-800 mt-12 font-medium text-lg text-white rounded-full inline-block py-3 shadow-lg shadow-gray-300 transition duration-150 ease-in-out
                                        hover:bg-red-700 hover:text-white">
                                {
                                    (isLoading) ? ("Please wait...") : ("Submit")
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        <EmailNotificationModalWidget />
    </main>
    );
};

export default TokenPageComp;
