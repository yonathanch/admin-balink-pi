import React, { useState } from "react";
import styles from "./TambahArtikel.module.css";
import Input from "../../elements/Input/Input";
import Textarea from "../../elements/Textarea/Textarea";
import reset from "../../assets/icons/restart_alt.svg";
import save from "../../assets/icons/save.svg";
import Filefoto from "../../assets/icons/drive_folder_upload.svg";
import Button from "../../elements/Button/Button";
import useApi from "../../api/useApi";
import { useNavigate } from "react-router-dom";

const TambahArtikel = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    foto: "",
    nama: "",
    keterangan: "",
  });

  const [errors, setErrors] = useState({
    foto: false,
    nama: false,
    keterangan: false,
  });

  const { response: artikel, loading, error, post } = useApi();

  const [file, setFile] = useState();

  const onSubmit = () => {
    const newErrors = {};

    Object.keys(values).forEach((key) => {
      if (values[key].trim() === "") {
        newErrors[key] = true;
      } else {
        newErrors[key] = false;
      }
    });

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      post(
        "https://64328e2b3e05ff8b3728907e.mockapi.io/products/artikel",
        values
      );
      navigate(-1);
      setFile("");
    }
  };

  const onReset = () => {
    setValues({
      foto: "",
      nama: "",
      keterangan: "",
    });
    setFile("");
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };

  const getFile = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id="tambahArtikelContainer" className={styles.tambahEventContainer}>
      <h1 id="tambahArtikelTitle" className="headline-small-semibold">
        Tambah Artikel
      </h1>

      <div className="row">
        <div className="col-4">
          <div className="d-flex justify-content-center">
            {/* upload foto */}
            <div id="containerEvent" className={styles.containerEvent}>
              <div className={styles.imgArea}>
                <img id="uploadedImage" src={file} />
              </div>
              <div className="d-flex justify-content-center">
                <label htmlFor="fotoArtikel">
                  <Button
                    id="pilihFotoButton"
                    label="Pilih Foto"
                    icon={Filefoto}
                    color="brown"
                    onClick={() =>
                      document.getElementById("foto").click()
                    }
                  />
                </label>
                <input
                  id="foto"
                  className={styles.inputPhoto}
                  type="file"
                  name="foto"
                  value={values.foto}
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
                type="text"
                placeholder="Masukkan judul artikel"
                className={styles.input}
                id="nama"
                name="nama"
                value={values.nama}
                onChange={handleOnChange}
                label="Judul Artikel"
                error={errors.nama}
              />
            </div>
          </div>

          <div className="mt-3">
            <div className={styles.inputBox}>
              <Textarea
                rows={12}
                placeholder="Masukkan deskripsi artikel"
                className={
                  errors.keterangan
                    ? `${styles.errorInput} ${styles.input}`
                    : styles.input
                }
                id="keterangan"
                name="keterangan"
                value={values.keterangan}
                onChange={handleOnChange}
              />
              <label
                className={
                  errors.keterangan
                    ? `${styles.errorTitle} ${styles.inputTitle}`
                    : styles.inputTitle
                }
              >
                Deskripsi
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* button */}
      <div className="d-flex justify-content-end align-items-center gap-3 pt-5">
        <div className="d-grid col-3 ">
          <Button
            id="resetButton"
            label="Reset"
            color="white"
            icon={reset}
            onClick={onReset}
          />
        </div>
        <div className="d-grid col-3 ">
          <Button
            id="submitButton" 
            label="Simpan"
            color="brown"
            icon={save}
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default TambahArtikel;
