import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import HeadingModule from "../../component/Layout/Header";
import {showIcon, copyIcon} from "../../icons"

const SecureBackup = () => {
    const inputField = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const recWords = localStorage.getItem("mnemonics").split(" ");

    const [value, setValue] = useState([]);
    const [recState, setRecState] = useState(false);

    const copyToClipBoard = async () => {
        await navigator.clipboard.writeText(localStorage.getItem("mnemonics"));
    }

    useEffect(() => {
        setValue(recWords);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="zl_securebackup_page">
            <HeadingModule name={"Secure Backup"}/>
            <div className="zl_SecureBackup_heading">
                <h3>recovery words</h3>
            </div>
            <div className="zl_securebackup_row row">
                {inputField.map((inputValue, i) => (
                    <div
                        className="zl_securebackup_col_3 col-lg-3 col-md-6"
                        key={inputValue}
                    >
                        <div className="zl_securebackup_input_content position-relative">
                            <p className="zl_securebackup_input_text">{inputValue}</p>
                            <input
                                type="text"
                                className="zl_securebackup_input"
                                name={`input${inputValue}`}
                                placeholder="_____"
                                defaultValue={value && recState ? value[i] : ""}
                                disabled="true"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="zl_securebackup_row row justify-content-around">
                <div className="zl_securebackup_btn">
                    {!recState ? (
                        <Link
                            to={"#"}
                            onClick={() => {
                                setValue(recWords);
                                setRecState(true);
                            }}
                            className="mx-auto"
                        >
                            {showIcon}
                            Show
                        </Link>
                    ) : (
                        <Link
                            to={"#"}
                            onClick={() => {
                                setValue("");
                                setRecState(false);
                            }}
                            className="mx-auto"
                        >
                            Hide
                        </Link>
                    )}
                </div>
                <div className="zl_securebackup_btn">
                    <Link
                        to={"#"}
                        onClick={copyToClipBoard}
                    >
                        {copyIcon}
                        Copy
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SecureBackup;
