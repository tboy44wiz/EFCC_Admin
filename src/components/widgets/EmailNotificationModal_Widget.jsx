import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {handleIsEmailNotificationModalChange} from "../../redux/features/auths/Auths_Slice";


const EmailNotificationModalWidget = () => {
    const { isEmailNotificationModalOpen } = useSelector((state) => state.authsState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (isEmailNotificationModalOpen) && (
        <main className="h-full w-full grid place-items-center fixed inset-0 bg-[rgba(0,0,0,0.5)]">
            <div className="w-[480px] px-4 py-3 shadow-lg rounded-lg bg-white text-center animate-[fade-in-down_0.5s_ease-in-out]">
                <div className="flex flex-shrink-0 items-center justify-between rounded-t-md p-5">
                    <h5 id="exampleModalScrollableLabel" className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                        Confirm Email
                    </h5>
                    <button type="button" onClick={ () => dispatch(handleIsEmailNotificationModalChange(false)) }
                            className="hover:opacity-75">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div className="p-5">
                    <p>Please kindly check your email and continue by clicking the validation link sent to you.</p>
                </div>
                <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md p-4">
                    <button type="button"
                            onClick={ () => {
                                dispatch(handleIsEmailNotificationModalChange(false))
                                navigate("/signup_agent");
                            } }
                            className="inline-block rounded bg-red-100 px-6 pt-2.5 pb-2 text-sm font-semibold text-red-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200">
                        Ok
                    </button>
                </div>
            </div>
        </main>
    );
};

export default EmailNotificationModalWidget;
