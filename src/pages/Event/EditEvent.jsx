import React, { useEffect, useState } from "react";
import styles from "./TambahEvent.module.css";
import Input from "../../elements/Input/Input";
import Textarea from "../../elements/Textarea/Textarea";
import Filefoto from "../../assets/icons/drive_folder_upload.svg";
import info from "../../assets/icons/language.svg";
import cancel from "../../assets/icons/cancel.svg";
import save from "../../assets/icons/save.svg";
import edit from "../../assets/icons/edit_square_white.svg";
import Button from "../../elements/Button/Button";
import { Switch } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../api/useApi";

const EditEvent = () => {
  const { response: event, loading, error, get, put } = useApi();
  const [toggle, setToggle] = useState(false);

  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState({
    fotoEvent: "",
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
        fotoEvent: event.fotoEvent,
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

  const onSubmit = () => {
    put(
      `https://6481c62b29fa1c5c50320b9a.mockapi.io/balink/event/${id}`,
      values
    );
    navigate(-1);
    setFile("");
  };

  const onCancel = (e) => {
    navigate(-1);
  };

  const handleOnChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const [file, setFile] = useState();
  const getFile = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className={styles.tambahEventContainer}>
          <h1 className="headline-small-semibold">Edit Event</h1>

          <div className="row pb-4">
            <div className="col-4">
              <div className="d-flex justify-content-center">
                {/* upload foto */}
                <div className={styles.containerEvent}>
                  <div className={styles.imgArea}>
                    <img
                      id="uploadedImage"
                      src={file ? file : values.fotoEvent} 
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <label htmlFor={"fotoEvent"}>
                      <Button
                        label="Pilih Foto"
                        icon={Filefoto}
                        color="brown"
                        onClick={() => document.getElementById("fotoEvent").click()}
                      />
                    </label>
                    <input
                      id={"fotoEvent"}
                      className={styles.inputPhoto}
                      type={"file"}
                      name={"fotoEvent"}
                      onChange={getFile}
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <p> select Your Photo max 2mb.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* title + desc */}
            <div className="col">
              <div className="mt-3">
                <div className={styles.inputBox}>
                  <Input
                    type={"text"}
                    required={"required"}
                    placeholder={"Masukkan judul event"}
                    className={styles.input}
                    id={"judulEvent"}
                    name={"judulEvent"}
                    value={values.judulEvent}
                    onChange={handleOnChange}
                    label={"Judul Event"}
                  />
                </div>
              </div>

              <div className="mt-3">
                <div className={styles.inputBox}>
                  <Textarea
                    rows={12}
                    required={"required"}
                    placeholder={"Masukkan deskripsi event"}
                    className={styles.input}
                    id={"deskripsiEvent"}
                    name={"deskripsiEvent"}
                    value={values.deskripsiEvent}
                    onChange={handleOnChange}
                  />
                  <label className={styles.inputTitle}>Deskripsi</label>
                </div>
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
                    <div className="d-grid col-12 ">
                      <Button label="Ganti Artikel" color="brown" icon={edit} />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mt-24">
                      <div className={styles.inputBox}>
                        <Input
                          type={"text"}
                          required={"required"}
                          placeholder={"Masukkan alamat lokasi"}
                          className={styles.input}
                          id={"lokasiEvent"}
                          name={"lokasiEvent"}
                          value={values.lokasiEvent}
                          onChange={handleOnChange}
                          label={"Lokasi"}
                        />
                      </div>
                    </div>

                    <div className="mt-24">
                      <div className={styles.inputBox}>
                        <Input
                          type={"text"}
                          required={"required"}
                          placeholder={"Masukkan link Google Maps lokasi"}
                          className={styles.input}
                          id={"linkGoogleEvent"}
                          name={"linkGoogleEvent"}
                          value={values.linkGoogleEvent}
                          onChange={handleOnChange}
                          label={"Google Maps"}
                        />
                      </div>
                    </div>

                    <div className="mt-24">
                      <div className={styles.inputBox}>
                        <Input
                          type={"text"}
                          required={"required"}
                          placeholder={"00:00"}
                          className={styles.input}
                          id={"waktuEvent"}
                          name={"waktuEvent"}
                          value={values.waktuEvent}
                          onChange={handleOnChange}
                          label={"Waktu"}
                        />
                      </div>
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
                        <div className={styles.inputBox}>
                          <Input
                            type={"text"}
                            required={"required"}
                            placeholder={"masukkan harga jenis"}
                            className={styles.input}
                            id={"hargaEvent"}
                            name={"hargaEvent"}
                            value={values.hargaEvent}
                            onChange={handleOnChange}
                            label={"Harga"}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="m-2">
                        <div className={styles.inputBox}>
                          <Input
                            type={"text"}
                            required={"required"}
                            placeholder={"masukkan jumlah"}
                            className={styles.input}
                            id={"jumlahEvent"}
                            name={"jumlahEvent"}
                            value={values.jumlahEvent}
                            onChange={handleOnChange}
                            label={"Jumlah"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* button */}
          <div className="d-flex justify-content-end align-items-center gap-3 pt-5">
            <div className="d-grid col-3 ">
              <Button
                id="cancelButton"
                label="Batal"
                color="white"
                icon={cancel}
                onClick={onCancel}
              />
            </div>
            <div className="d-grid col-3 ">
              <Button 
                id="saveButton"
                label="Simpan" 
                color="brown" 
                icon={save} 
                onClick={onSubmit} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditEvent;
