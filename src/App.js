import { useRoutes } from "react-router-dom";
import getRoutes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Layout from "./component/Layout";

function App() {
  const user_crypto_currency_data =
    localStorage.getItem("user_crypto_currency_data") &&
    JSON.parse(localStorage.getItem("user_crypto_currency_data"));

  const logged = user_crypto_currency_data && sessionStorage.getItem('logged');

  const routing = useRoutes(getRoutes(user_crypto_currency_data, logged));

  return <Layout>{routing}</Layout>;
}

export default App;
