import {useDispatch, useSelector} from "react-redux";

import {handleIsLogoutModalChange, handleLogoutUser} from "../../../../redux/features/auths/Auths_Slice";

const LogoutPageComp = () => {
    const { isLogoutModalOpen } = useSelector((state) => state.authsState);
    const dispatch = useDispatch();

    return (isLogoutModalOpen) && (
        <main className="h-screen w-[calc(100%-325px)] ml-[325px] flex items-center justify-center backdrop-blur-sm absolute inset-0 z-[1000] transition-all ease-in-out duration-300" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="flex items-center justify-center relative">
                <div className="h-auto w-[90%] lg:w-[450px] p-4 md:p-8 text-center rounded-md bg-white z-[1000]">
                    <h3 className="font-bold text-xl text-red-700">Log Out</h3>
                    <p>Are you sure you wish to log out?</p>
                    <div className="mt-8">
                        <button type="button" onClick={ () => dispatch(handleIsLogoutModalChange(false)) } className="mx-3 px-6 py-1.5 bg-red-100 font-semibold text-red-700 rounded-full">
                            No
                        </button>
                        <button type="button" onClick={ () => dispatch(handleLogoutUser()) } className="mx-3 px-6 py-1.5 bg-red-800 text-white rounded-full">
                            Yes
                        </button>
                    </div>
                </div>
                <button type="button" onClick={ () => dispatch(handleIsLogoutModalChange(false)) }
                        className="h-[35px] w-[35px] flex items-center justify-center bg-white rounded-full font-medium text-2xl absolute top-[5px] right-[-50px] cursor-pointer">
                    ×
                </button>
            </div>
        </main>
    );
};

export default LogoutPageComp;
