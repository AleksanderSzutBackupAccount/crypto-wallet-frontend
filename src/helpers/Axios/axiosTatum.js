import axios from "axios";

export const authHeadersTatum = (testType) => {
  return {
    headers: {
      "x-api-key": process.env.REACT_APP_TATUM_API_KEY,
    },
  };
};

const AxiosTatum = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_TATUM}`,
});

export default AxiosTatum;
