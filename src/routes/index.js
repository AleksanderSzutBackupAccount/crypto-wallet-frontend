import {Navigate, Outlet} from "react-router-dom";

import DashboardPage from "../pages/Dashboard";
import Portfolio from "../pages/Portfolio";
import AddCurrency from "../pages/AddCurrency";
import Wallets from "../pages/Wallets";
import History from "../pages/History";
import SecureBackup from "../pages/SecureBackup";
import Settings from "../pages/Settings";
import RestoreWallet from "../pages/RestoreWallet";
import Currency from "../pages/Currency";
import LogIn from "../pages/Login";
import Page404 from "../pages/Page404";
import WelcomeModule from "../pages/Welcome";
import Pin from "../pages/Pin";
import Restore from "../pages/Restore";
import CreateNewWallet from "../pages/CreateNewWallet";

import {RouteEnum} from "./RouteEnum";

const getRoutes = (user_crypto_currency_data, logged) => [
    {
        path: RouteEnum.welcomePage,
        element: !user_crypto_currency_data && !logged ? (
            <Outlet/>
        ) : (
            <Navigate to={RouteEnum.dashboardPage}/>
        ),
        children: [
            {path: RouteEnum.welcomePage, element: <WelcomeModule/>},
            {path: RouteEnum.pinPage, element: <Pin/>,},
            {path: RouteEnum.restorePage, element: <Restore/>,},
            {path: RouteEnum.createNewWalletPage, element: <CreateNewWallet/>,},
        ],
    },
    {
        path: RouteEnum.welcomePage,
        element: user_crypto_currency_data ? (
            logged ? (
                <Navigate to={RouteEnum.dashboardPage}/>
                ) : (
                <Outlet/>
            )
        ) : (
            <Navigate to={RouteEnum.createNewWalletPage}/>
        ),
        children: [
            {path: RouteEnum.loginPage, element: <LogIn/>},
        ],
    },
    {
        path: RouteEnum.welcomePage,
        element: logged ? (
            <Outlet/>
        ) : (
            <Navigate to={RouteEnum.loginPage}/>
        ),
        children: [
            {path: RouteEnum.dashboardPage, element: <DashboardPage/>},
            {path: RouteEnum.portfolioPage, element: <Portfolio/>},
            {path: RouteEnum.addCurrencyPage, element: <AddCurrency/>},
            {path: RouteEnum.walletsPage, element: <Wallets/>},
            {path: RouteEnum.historyPage, element: <History/>},
            {path: RouteEnum.secureBackupPage, element: <SecureBackup/>},
            {path: RouteEnum.settingsPage, element: <Settings/>},
            {path: RouteEnum.restoreWalletPage, element: <RestoreWallet/>},
            {path: RouteEnum.currencyPage, element: <Currency/>},
        ],
    },
    {
        path: "",
        element: !logged ? (
            <Navigate to={RouteEnum.welcomePage}/>
        ) : (
            <Page404/>
        ),
        children: [
            {path: RouteEnum.loginPage, element: <LogIn/>},
            {path: "*", element: <LogIn/>},
        ],
    },
];

export default getRoutes;
