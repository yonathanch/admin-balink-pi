import React, { useEffect, useState } from "react";
import TableAkun from "../../components/Table/TableAkun/TableAkun";
import useApi from "../../api/useApi";

const Akun = () => {
  const { response: akun, error, loading, get } = useApi();

  // console.log(response);
  console.log(error);
  console.log(loading);

  useEffect(() => {
    get("https://64a3f9ebc3b509573b56dca8.mockapi.io/akun").catch(
      (error) => {
        // Handle error
        console.error(error);
      }
    );
  }, []);

  return (
    <div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <TableAkun userData={akun} />
        )}
      </div>
    </div>
  );
};

export default Akun;
