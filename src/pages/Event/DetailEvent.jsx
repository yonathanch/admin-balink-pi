import styles from "./DetailEvent.module.css";
// import foto from "../../assets/images/Mask group.png";
import info from "../../assets/icons/language.svg";import lokasi from "../../assets/icons/location_on.svg";
import link from "../../assets/icons/link.svg";
import Button from '../../elements/Button/Button'
import Hapus from '../../assets/icons/delete.svg'
import Edit from '../../assets/icons/edit_square.svg'
import waktu from "../../assets/icons/alarm.svg";
import rectangle from "../../assets/images/Rectangle 333.png";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../api/useApi";
import tarikecak from "../../assets/images/tarikecak.jpg"
import Modal from "react-modal";
import konfirmasi from "../../assets/images/konfirmasi.png";
import close from "../../assets/icons/close.svg";
import check from "../../assets/icons/check.svg";
import deleteImg from "../../assets/images/delete.png";

const DetailEvent = ({ data }) => {
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

  const onDelete = () => {
    del(`https://6481c62b29fa1c5c50320b9a.mockapi.io/balink/event/${id}`)
      .then(() => {
        openTerhapusModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const { response: event, loading, error, get, del } = useApi();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  const { id } = useParams();  
  const [values, setValues] = useState({
    eventbali: "",
    judulEvent: "",
    deskripsiEvent: "",
    lokasiEvent: "",
    linkGoogleEvent: "",
    waktuEvent: "",
    hargaEvent: "",
    jumlahEvent: "",
  });


  useEffect(() => {
    get(
      `https://6481c62b29fa1c5c50320b9a.mockapi.io/balink/event/${id}`
    ).catch((error) => {
      // Handle error
      console.error(error);
    });
  }, []);

  useEffect(() => {
    if (event) {
      setValues({
        eventbali: event.eventbali,
        judulEvent: event.judulEvent,
        deskripsiEvent: event.deskripsiEvent,
        lokasiEvent: event.lokasiEvent,
        linkGoogleEvent: event.linkGoogleEvent,
        waktuEvent: event.waktuEvent,
        hargaEvent: event.hargaEvent,
        jumlahEvent: event.jumlahEvent,
      });
    }
  }, [event]);

  const paragraphs = values.deskripsiEvent?.split("\n\n");

  const infoEvent = {
    imgInfo: rectangle,
    titleInfo: "Tari Kecak Daerah Bali",
    descInfo: "Tari kecak adalah saah satu tari khas bali yang menceritakan tentang bla bla bla bla...",
  };

  const [file, setFile] = useState();

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className={styles.tambahEventContainer}>
          <h1 className="headline-small-semibold">Detail Event</h1>

          <div className="row pb-4">
            <div className="col-4">
              <div className="d-flex justify-content-center">

                {/* upload foto */}
                <div className={styles.containerEvent}>
                  <div className={styles.imgArea}>
                    <img
                      id="uploadedImage"
                      // src={file ? file : values.eventbali} 
                      src={tarikecak}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* title + desc */}
            <div className="col">
              <div className="mt-3">
                <p className="title-large-semibold" id="juduEvent">
                  {values.judulEvent}
                </p>
              </div>

              <div className="mt-3">
                <p className="body-medium-reguler" id="deskripsiEvent">
                  {values.deskripsiEvent}
                </p>
              </div>
            </div>
          </div>

          {/* detail event */}
          <div className="pb-4">
            <div className={styles.containerEvent}>
              <div className="container">
                <h1 className="body-large-semibold">Detail Event</h1>

                <div className="row py-3">
                  <div className="col-lg-6">
                    <img src={info} alt="info" />
                    <span className="body-medium-semibold"> Info Lengkap</span>

                    <div className="d-grid col-12 mt-2">
                      <div className={`${styles.layoutInfo}`}>
                        <div>
                          <img src={infoEvent.imgInfo} alt="" />
                        </div>
                        <div>
                          <p className="body-medium-semibold">
                            {infoEvent.titleInfo}
                          </p>
                          <p className="body-small-regular">
                            {infoEvent.descInfo}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mt-24">
                      <img src={lokasi} alt="lokasi" />
                      <span className="body-medium-semibold"> Lokasi</span>
                      <p className={`body-medium-regular`}>
                        {values.lokasiEvent}
                      </p>
                    </div>

                    <div className="mt-24">
                    <img src={link} alt="link" />
                      <span className="body-medium-semibold"> Link Google Maps</span>
                      <p className={`body-medium-regular`}>
                        {values.linkGoogleEvent}
                      </p>
                    </div>

                    <div className="mt-24">
                      <img src={waktu} alt="waktu" />
                        <span className="body-medium-semibold"> Waktu</span>
                        <p className={`body-medium-regular`}>
                          {values.waktuEvent}
                        </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* berbayar */}
          <div className="pb-4">
            <div className={styles.containerEvent}>
              <div className="container">
                <h1 className="body-large-semibold">Ticket Berbayar</h1>

                <div className="row">
                  <div className="col-lg-6">
                    <p className="body-smaill-regular">
                      Harga ticket aktif dan non aktif
                    </p>
                  </div>

                  <div className="col-lg-6">
                    <div className="d-flex justify-content-end">
                      <Switch onClick={toggler} />
                    </div>
                  </div>
                </div>
                {toggle && (
                  <div className="row py-3">
                    <div className="col-lg-6">
                      <div className="m-2">
                        <span className="body-small-regular"> Harga</span>
                        <br />
                        <span className="body-medium-regular">
                          {values.hargaEvent}
                        </span>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="m-2">
                        <span className="body-small-regular"> Jumlah</span>
                        <br />
                        <span className="body-medium-regular">
                          {values.jumlahEvent}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                  <div className="d-flex justify-content-end gap-3 pt-3">
                <div className="d-grid col-3">
                  <Button
                    label="Hapus"
                    color="white"
                    icon={Hapus}
                    onClick={() => openKonfirmasiModal()}
                    id="hapusButton"
                  />
                </div>
                <div className="d-grid col-3">
                  <Button
                    label="Edit"
                    color="brown"
                    icon={Edit}
                    onClick={() => navigate(`/event/edit/${id}`)}
                    id="editButton"
                  />
                </div>
              </div>
              </div>
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

export default DetailEvent;
