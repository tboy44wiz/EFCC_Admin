import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/*==== Import Components ====*/
import LoginPageComp from "./components/pages/auths/LoginPage_Comp/LoginPage_Comp.jsx";
import TokenPageComp from "./components/pages/auths/TokenPage_Comp/TokenPage_Comp.jsx";
import LogoutPageComp from "./components/pages/auths/LogoutPage_Comp/LogoutPage_Comp.jsx";
import DashboardView from "./views/Dashboard_View.jsx";
import UserManagementView from "./views/UserManagement_View.jsx";

const App = () => {
    return (
        <main className="App bg-gray-100">
            <Router>
                <Routes>
                    {/*========== Auth Pages ==========*/}
                    <Route path="/login" element={ <LoginPageComp /> } />
                    <Route path="/token" element={ <TokenPageComp /> } />

                    {/*========== Dashboard Page ==========*/}
                    <Route path="/" element={ <Navigate to="/dashboard" /> } />
                    <Route path="/dashboard" element={ <DashboardView /> } />

                    {/*========== User Management Page ==========*/}
                    <Route path="/user_management" element={ <UserManagementView /> } />

                    {/*========== Case Management Page ==========*/}
                    {/*<Route path="/case_management" element={ <CaseManagementView /> } />*/}

                    {/*========== Asset Management Page ==========*/}
                    {/*<Route path="/asset_management" element={ <AssetManagementView /> } />*/}

                    {/*========== Reports Page ==========*/}
                    {/*<Route path="/reports" element={ <ReportsView /> } />*/}

                    {/*========== Setting Page ==========*/}
                    {/*<Route path="/settings" element={ <SettingsView /> } />*/}

                    {/*========== 404 Page ===========*/}
                    {/*<Route path="*" element={<Navigate to="/" />} />*/}
                </Routes>
            </Router>

            <LogoutPageComp />
            <ToastContainer />
        </main>
    )
}

export default App