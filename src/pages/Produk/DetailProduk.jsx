import styles from './DetailProduk.module.css'
import Images from '../../assets/assetsLandingPage/bali.svg'
import Button from '../../elements/Button/Button'
import Hapus from '../../assets/icons/delete.svg'
import Edit from '../../assets/icons/edit_square.svg'
import { useNavigate, useParams } from 'react-router-dom'
import useApi from '../../api/useApi'
import { useEffect, useState } from 'react'
import piesusu from "../../assets/images/pie-susu.png"


const DetailProduk = () => {
  const { response: produk, loading, error, get } = useApi();
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
      </div>
   </div>
      )}
   </div>
   )
}
export default DetailProduk