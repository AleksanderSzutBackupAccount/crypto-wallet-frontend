import React, { useState } from "react";

const Pin = () => {
    const [pins, setPins] = useState([]); // already created account 12 words observe dance pledge catch gun tuna head sort salute giggle gown resource
    const [err, setErr] = useState("");

    const onChangeHandler = (e, i) => {
        setErr("");
        const newArr = [...pins];

        newArr[i] = e.target.value.trim();

        setPins(newArr);
    };

    const validate = () => {
        let valid = false;
        if (pins.length < 12) {
            setErr("Please enter valid 12 words of mnemonics for Login App");
        } else {
            valid = true;
        }
        return valid;
    };


    return (
        <section className="zl_login_section">
            <div className="zl_login_content container">
                <div className="zl_login_heading_text">
                    <h3 className="zl_login_heading">Pin</h3>
                    <p className="zl_login_peregraph">

                    </p>
                </div>
                <div className="zl_login_row row">
                </div>
                <div className="zl_login_btn">
                    {err && <span className="err_text">{err}</span>}
                    <button
                        className="mx-auto zl_login_btn_link"
                    >
                        Login
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Pin;
