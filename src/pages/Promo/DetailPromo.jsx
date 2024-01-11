import React, { useEffect, useState } from "react";
import styles from "./Promo.module.css";
import Button from "../../elements/Button/Button";
import edit from "../../assets/icons/edit_square_white.svg";
import hapus from "../../assets/icons/delete.svg";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../api/useApi";
import Modal from "react-modal";
import konfirmasi from "../../assets/images/konfirmasi.png";
import close from "../../assets/icons/close.svg";
import check from "../../assets/icons/check.svg";
import deleteImg from "../../assets/images/delete.png";

const DetailPromo = () => {
  const [modalKonfirmasiIsOpen, setModalKonfirmasiIsOpen] = useState(false);
  const [modalTerhapusIsOpen, setModalTerhapusIsOpen] = useState(false);
  const customStylesConfirmation = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      padding: "60px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      zIndex: "9999",
    },
  };
  const closeKonfirmasiModal = () => {
    setModalKonfirmasiIsOpen(false);
  };

  const openKonfirmasiModal = () => {
    setModalKonfirmasiIsOpen(true);
  };

  const openTerhapusModal = () => {
    setModalTerhapusIsOpen(true);
    setTimeout(() => {
      closeTerhapusModal();
      navigate(-1);
    }, 1500);
  };

  const closeTerhapusModal = () => {
    setModalTerhapusIsOpen(false);
  };
  const [values, setValues] = useState({
        NamaPromo: "",
        DeskripsiPromo: "",
        KodePromo: "",
        PotonganHarga: "",
  });

  const navigate = useNavigate();
  const { response: promo, error, loading, get, del } = useApi();
  const { id } = useParams();

  useEffect(() => {
    get(`https://648179fd29fa1c5c503172c3.mockapi.io/promo/${id}`).catch(
      (error) => {
        // Handle error
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    if (promo) {
        setValues({
            NamaPromo: promo.NamaPromo,
            DeskripsiPromo: promo.DeskripsiPromo,
            KodePromo: promo.KodePromo,
            PotonganHarga: promo.PotonganHarga,
      });
    }
}, [promo]);

  const onDelete = () => {
    del(`https://648179fd29fa1c5c503172c3.mockapi.io/promo/${id}`)
      .then(() => {
        openTerhapusModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };
 

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className={`${styles.autoLayoutDetail}`}>
          <div className={`${styles.layoutDetail}`}>
            <p className="headline-small-semibold">Detail Promo</p>

            <div id="namaPromo">
              <p className="title-medium-semibold">{values.NamaPromo}</p>
              <p className="body-medium-regular">{values.DeskripsiPromo}</p>
            </div>

            <div id="kodePromo">
              <p className="body-small-regular">Kode Promo</p>
              <p className="body-medium-semibold">{values.KodePromo}</p>
            </div>

            <div id="potonganHarga">
              <p className="body-small-regular">Potongan Harga</p>
              <p className="body-medium-semibold">{values.PotonganHarga}</p>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-3 pt-5">
            <div className="d-grid col-3">
              <Button
                label="Hapus"
                color="white"
                icon={hapus}
                onClick={() => openKonfirmasiModal()}
              />
            </div>
            <div className="d-grid col-3">
              <Button
                label="Edit"
                color="brown"
                icon={edit}
                onClick={() => navigate(`/promo/${id}`)}
              />
            </div>
          </div>
        </div>
      )}

<Modal
        isOpen={modalKonfirmasiIsOpen}
        onRequestClose={closeKonfirmasiModal}
        contentLabel="Confirmation Modal"
        style={customStylesConfirmation}
      >
        <div
          id="modalKonfirmasiContainer"
          className={`d-flex justify-content-center align-items-center`}
        >
          <div
            id="modalKonfirmasiContent"
            className={`d-flex flex-column justify-content-center align-items-center`}
          >
            <img
              id="modalKonfirmasiImage"
              src={konfirmasi}
              alt="konfirmasi-img"
              className="mb-16"
            />
            <h4
              id="modalKonfirmasiTitle"
              className="title-large-semibold mb-32 text-center"
            >
              Apakah anda ingin menghapus data ini?
            </h4>
            <p id="modalKonfirmasiText1" className="body-small-regular">
              Data yang sudah dihapus tidak dapat dikembalikan lagi
            </p>
            <p id="modalKonfirmasiText2" className="body-small-regular mb-32">
              Apakah anda yakin?
            </p>
            <div className="d-flex gap-5 justify-content-center">
              <div className="d-grid col-6">
                <Button
                  id="modalKonfirmasiYesButton"
                  label="Yes"
                  color="white"
                  icon={check}
                  onClick={onDelete}
                />
              </div>
              <div className="d-grid col-6">
                <Button
                  id="modalKonfirmasiCancelButton"
                  label="Cancel"
                  color="brown"
                  icon={close}
                  onClick={closeKonfirmasiModal}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalTerhapusIsOpen}
        onRequestClose={closeTerhapusModal}
        contentLabel="Deleted Modal"
        style={customStylesConfirmation}
      >
        <div
          id="modal-terhapus-container"
          className={`d-flex justify-content-center align-items-center`}
        >
          <div
            id="modal-terhapus-content"
            className={`d-flex flex-column justify-content-center align-items-center`}
          >
            <img
              id="modal-terhapus-image"
              src={deleteImg}
              alt="success"
              className="mb-16"
            />
            <h4
              id="modal-terhapus-heading"
              className="title-large-semibold mb-16"
            >
              Berhasil Dihapus
            </h4>
            <p id="modal-terhapus-message" className="body-small-regular mb-16">
              Data telah berhasil dihapus
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DetailPromo;
