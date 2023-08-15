import React, { useEffect } from "react";
import styles from "./DetailArtikel.module.css";
import useApi from "../../api/useApi";
import { useParams } from "react-router-dom";
import Button from "../../elements/Button/Button";
import hapus from "../../assets/icons/delete.svg";
import edit from "../../assets/icons/edit_square_white.svg";
import { useNavigate } from "react-router-dom";
import kulinerubud from "../../assets/images/kuliner-ubud.png"

const DetailArtikel = () => {
  const { id } = useParams();
  const { response: artikel, loading, error, get } = useApi();
  const navigate = useNavigate();
  useEffect(() => {
    get(
      `https://64328e2b3e05ff8b3728907e.mockapi.io/products/artikel/${id}`
    ).catch((error) => {
      // Handle error
      console.error(error);
    });
  }, []);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div id="detailArtikelContainer">
          <div id="detailArtikelContentContainer" className={styles.container}>
            <h1
              id="detailArtikelTitle"
              className="headline-small-semibold mb-16"
            >
              Detail Artikel
            </h1>
            <div className="d-flex justify-content-center align-items-center mb-24">
              <img
                id="articleImage"
                src={kulinerubud}
                alt="article-img"
                className={`${styles.imgArticle} w-25`}
              />
            </div>
            <h4 id="articleTitle" className="title-large-semibold mb-24">
              {artikel?.nama}
            </h4>
            <p id={`articleDescription`} className="body-medium-regular">
              {artikel?.keterangan}
            </p>
          </div>
          <div className="d-flex justify-content-end gap-3 pt-3">
            <div className="d-grid col-3">
              <Button label="Hapus" color="white" icon={hapus} />
            </div>
            <div className="d-grid col-3">
              <Button
                label="Edit"
                color="brown"
                icon={edit}
                onClick={() => navigate(`/artikel/edit/${id}`)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailArtikel;
