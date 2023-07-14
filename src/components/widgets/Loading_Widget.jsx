/*==== Import Logos ====*/
import EFCCLogo from "../../assets/images/efcc_logo.png";

const LoadingWidget = () => {
    return (
        <main className="h-screen w-screen bg-white grid place-items-center fixed inset-0">
            <img src={ EFCCLogo } alt="EFCC Logo" className="h-auto w-[70px] md:w-[80px] animate-bounce" />
        </main>
    );
};

export default LoadingWidget;
