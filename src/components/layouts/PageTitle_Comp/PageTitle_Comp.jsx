import {useLocation} from "react-router-dom";

const PageTitleComp = () => {
    const { pathname } = useLocation();
    const mPathName = pathname.split("/")[1];
    const pageTitle = mPathName.charAt(0).toUpperCase() + mPathName.substring(1);

    return (
        <section className="h-[70px] md:h-[80px] w-full px-3 md:px-6 bg-[red] bg-opacity-5 rounded-xl flex items-center justify-between">
            <h1 className="font-semibold text-lg md:text-2xl lg:text-3xl">{ pageTitle }</h1>
        </section>
    );
}

export default PageTitleComp;