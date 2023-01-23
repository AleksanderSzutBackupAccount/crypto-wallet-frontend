import React, {useEffect, useState} from "react";
import {InputGroup, FormControl} from "react-bootstrap";
import HeadingModule from "../../component/Layout/Header";
import {searchIcon} from "../../icons";
import {Link, useNavigate} from "react-router-dom";
import {RouteEnum} from "../../routes/RouteEnum";

const Currency = () => {
    const navigate = useNavigate();

    const currencyList = [{
        code: "USA", // Currency image
        currency: "USD", // Currency name which is supported by Coingecko
        currency_type: "American Dollar", // Currency type
    },
        /*{
        code: "BRA", currency: "BRL", currency_type: "Brazilian Real",
    }, {
        code: "CAD", currency: "CAD", currency_type: "Canadian Dollar",
    }, {
        code: "AUS", currency: "AUD", currency_type: "Australian Dollar",
    }, {
        code: "CHE", currency: "CHF", currency_type: "Swiss France",
    }, {
        code: "CHN", currency: "CNY", currency_type: "Chinese Yuan",
    }, {
        code: "EUR", currency: "EUR", currency_type: "Europe",
    }, {
        code: "IND", currency: "INR", currency_type: "India",
    },*/
    ];

    const [cur, setCur] = useState([]);

    useEffect(() => {
        setCur(currencyList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchCurrencyHandler = (e) => setCur(currencyList.filter((curVal, i) => curVal.currency.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 || curVal.currency_type.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 || curVal.code.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1));


    return (<>
        <section className="zl_currency_page">
            <HeadingModule name={"Currency"}/>
            <div className="zl_all_page_comman_content">
                <InputGroup className="zl_add_currency_search">
                    <InputGroup.Text className="zl_add_currency_search_icon">
                        {searchIcon}
                    </InputGroup.Text>
                    <FormControl
                        placeholder="Search"
                        type="text"
                        onChange={searchCurrencyHandler}
                    />
                </InputGroup>
                <div className="zl_add_currency_row row">
                    {cur?.map((item, index) => {
                        return (<Link
                            to={RouteEnum.settingsPage}
                            onClick={() => {
                                navigate(-1);
                                localStorage.setItem("currency", item.currency);
                            }}
                            className={`zl_add_currency_column col`}
                            key={index}
                        >
                            <div className="zl_add_currency_inner_content">
                                <div className="zl_add_currency_img">
                                    <img
                                        src={`assets/image/flags/${item.code}.svg`}
                                        alt="currency-img"
                                    />
                                </div>
                                <div className="zl_add_currency_text">
                                    <h3>{item.currency}</h3>
                                    <p>{item.currency_type}</p>
                                </div>
                            </div>
                        </Link>);
                    })}
                </div>
            </div>
        </section>
    </>);
};

export default Currency;
