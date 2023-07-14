import React, { useCallback, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import secureLocalStorage from "react-secure-storage";

/*==== Import Components ====*/
import LoadingWidget from "../../widgets/Loading_Widget.jsx";

import {handleUpdateAgentId, handleUpdateIsAuthenticated} from "../../../redux/features/auths/Auths_Slice";


const ProtectedRouteHOC = (props) => {
    const { isAuthenticated } = useSelector((state) => state.authsState);
    const dispatch = useDispatch();


    const checkLoginStatus = useCallback( () => {
        //  Get users data from the Secure Local storage.
        const userData = secureLocalStorage.getItem("userData");
        // console.log("AGENT ID::: ", userData);
        // console.log("ACCESS TOKEN::: ", accessToken);

        if (userData !== null && userData.accessToken !== null && userData.agentId !== null) {
            dispatch(handleUpdateIsAuthenticated(true));
            dispatch(handleUpdateAgentId(userData.agentId));
        } else {
            dispatch(handleUpdateIsAuthenticated(false));
            return window.open("/login", "_self");
        }
    }, []);

    useEffect(() => {
        (async () => {
            await checkLoginStatus();
        })();
    }, [isAuthenticated]);


    return (isAuthenticated) ? (
        props.children
    ) : (
        <LoadingWidget />
    );
};

export default ProtectedRouteHOC;