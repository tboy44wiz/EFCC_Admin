import secureLocalStorage from "react-secure-storage";

const AuthorizationHeader = () => {
    //  Get Agent Token from the Session Storage.
    const { accessToken } = JSON.parse(secureLocalStorage.getItem('userData'));
     // console.log("ACCESS TOKEN:::", accessToken);

    return (accessToken !== null) ? ({
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    }) : ({
        "Accept": "application/json",
        "Content-Type": "application/json",
    });
};

export default AuthorizationHeader;