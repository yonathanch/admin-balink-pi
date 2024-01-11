import styles from './DetailProduk.module.css'
import Images from '../../assets/assetsLandingPage/bali.svg'
import Button from '../../elements/Button/Button'
import Hapus from '../../assets/icons/delete.svg'
import Edit from '../../assets/icons/edit_square.svg'
import { useNavigate, useParams } from 'react-router-dom'
import useApi from '../../api/useApi'
import { useEffect, useState } from 'react'
import piesusu from "../../assets/images/pie-susu.png"
import Modal from "react-modal";
import konfirmasi from "../../assets/images/konfirmasi.png";
import close from "../../assets/icons/close.svg";
import check from "../../assets/icons/check.svg";
import deleteImg from "../../assets/images/delete.png";


const DetailProduk = () => {
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
    del(`https://64328e2b3e05ff8b3728907e.mockapi.io/products/products/${id}`)
      .then(() => {
        openTerhapusModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const { response: produk, loading, error, get, del } = useApi();
  const [data, setData] = useState([])
  const navigate = useNavigate();

  const { id } = useParams();  
  const [values, setValues] = useState({
    fotoProduk: "",
    namaProduk: "",
    deskripsiProduk: "",
    kategoriProduk: "",
    hargaProduk: "",
    stokProduk: "",
  });

  useEffect(() => {
    get(
      `https://64328e2b3e05ff8b3728907e.mockapi.io/products/products/${id}`
    ).catch((error) => {
      // Handle error
      console.error(error);
    });
  }, []);

  const [file, setFile] = useState();

  useEffect(() => { 
    if (produk) {
      setValues({
        fotoProduk: produk.fotoProduk,
        namaProduk: produk.namaProduk,
        deskripsiProduk: produk.deskripsiProduk,
        kategoriProduk: produk.kategoriProduk,
        hargaProduk: produk.hargaProduk,
        stokProduk: produk.stokProduk,
      });
    }
  }, [produk]);

   return(
      <div>
          {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
          <div className={styles.wrapper} id='wrapper'>
         <div className={styles.wrapperDetail} id='wrapper-detail'>
         <h1 className='headline-small-semibold'>Detail Produk</h1>
         <div className={styles.parentImages} id='parentsImages'>
          <img src={piesusu} alt="" className={styles.fotoProduk} />
          <img src={piesusu} alt="" className={styles.fotoProduk} />
          <img src={piesusu} alt="" className={styles.fotoProduk} />
          <img src={piesusu} alt="" className={styles.fotoProduk} />
             {/* <img src={file ? file : values.fotoProduk} className={styles.fotoProduk}/>
             <img src={file ? file : values.fotoProduk} className={styles.fotoProduk}/>
             <img src={file ? file : values.fotoProduk} className={styles.fotoProduk}/>
             <img src={file ? file : values.fotoProduk} className={styles.fotoProduk}/> */}
         </div>
         <div className={styles.parentDetail} id='parentsDetail'>       
            <h1 className={`title-large-semibold ${styles.titleProduk}`} id='titleProduk'>{values.namaProduk}</h1>
            <p className='body-medium-reguler' id='title-deskripsi'>{values.titleDeskripsi}</p>
            <p className='body-medium-reguler' id='deskripsi'>{values.deskripsiProduk}</p>
         </div>

         <div className={styles.keterangan} id='keterangan'>
            <div className={styles.kategori} id='kategori'>
               <label className='body-medium-regular'>Kategori Produk</label>
               <p className='title-medium-semibold'>{values.kategoriProduk}</p>
            </div>
            <div className={styles.harga} id='harga'>
               <label className='body-medium-reguler'>Harga Produk</label>
               <p className='title-medium-semibold'>{values.hargaProduk}</p>
            </div>
            <div className={styles.stok} id='stok'>
               <label className='body-medium-reguler'>Stok Produk</label>
               <p className='title-medium-semibold'>{values.stokProduk}</p>
            </div>
         </div>

         <div>
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
                    onClick={() => navigate(`/produk/edit/${id}`)}
                    id="editButton"
                  />
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
   )
}
export default DetailProduk