import {useDispatch} from "react-redux";

/*==== Import Components ====*/
import AppSideNavComp from "../SideNav_Comp/AppSideNav_Comp.jsx";
import AppHeaderComp from "../AppHeader_Comp/AppHeader_Comp";
import ProtectedRouteHOC from "../../pages/auths/ProtectedRoute_HOC.jsx";

import {toggleProfileOptionBox} from "../../../redux/features/auths/Auths_Slice";


const AppLayoutHOC = (props) => {
    const dispatch = useDispatch();

    return (
        <ProtectedRouteHOC>
            <main className="h-full w-full" onClick={ () => { dispatch(toggleProfileOptionBox(false)) } }>

                {/*==== Aside ====*/}
                <aside>
                    <AppSideNavComp />
                </aside>

                {/*==== Main Body ====*/}
                <div className="h-full w-full lg:w-[calc(100%-310px)] absolute top-0 left-0 lg:left-[310px] p-[15px] bg-gray-100">


                    {/*==== Header ====*/}
                    <header>
                        <AppHeaderComp />
                    </header>

                    <div className="h-[calc(100%-90px)] lg:h-[calc(100%-00px)] w-full pt-[100px]
                            overflow-y-auto [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        { props.children }
                    </div>
                </div>

                {/*<section className="h-auto w-full lg:w-[calc(100%-310px)] absolute top-[100px] lg:top-[180px] left-0 lg:left-[310px] px-[15px] pb-[15px] bg-gray-100">*/}


                    {/*{ props.children }*/}
                {/*</section>*/}

                {/*==== Footer ====*/}
                <footer></footer>
            </main>
        </ProtectedRouteHOC>
    );
};

export default AppLayoutHOC;
