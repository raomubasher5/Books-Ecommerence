import React, { useEffect, useState } from 'react'
import { useMyContext } from '../../context/MyContext'
import Loader from '../../components/loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseCongif';
import { toast } from 'react-toastify';


const categoryList = [
  {
      name: 'fashion'
  },
  {
      name: 'shirt'
  },
  {
      name: 'jacket'
  },
  {
      name: 'mobile'
  },
  {
      name: 'laptop'
  },
  {
      name: 'shoes'
  },
  {
      name: 'home'
  },
  {
      name: 'books'
  }
];

const UpdateProductPage = () => {
  const {  getAllProductFunction, loading, setLoading } = useMyContext();
  const {id} = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    price: '',
    productImageUrl: "",
    category: '',
    description: '',
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: 'short',
        day: "2-digit",
        year: "numeric"
      }
    )
  });

  //get single Product
  const getSingleProductFunction = async()=>{
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, 'products', id))
      const product = productTemp.data();
      setProduct({
        title: product?.title,
        price: product?.price,
        productImageUrl: product?.productImageUrl,
        category: product?.category,
        description: product?.description,
        quantity: product?.quantity,
        time: product?.time,
        date: product?.date
      });
      setLoading(false);

    } catch (error) {
      console.log(error);
      // setLoading(true);
    }
  }


  const updateProduct = async ()=>{
    setLoading(true)
    try {
      await setDoc(doc(fireDB , 'products' , id) , product);
      toast.success('proudct Update success fully');
      getAllProductFunction();
      setLoading(false);
      navigate('/admin-dashboard');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getSingleProductFunction();
  }, [])
  

  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        {loading && <Loader />}
        {/* Login Form  */}
        <div className="login_Form  px-8 py-6 border rounded-xl shadow-md">

          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className='text-center text-2xl font-bold font-serif '>
              Update Product
            </h2>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: e.target.value
                })
              }}
              placeholder='Product Title'
              className=' border  px-2 py-2 w-96 rounded-md outline-none '
            />
          </div>

          {/* Input Two  */}
          <div className="mb-3">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: e.target.value
                })
              }}
              placeholder='Product Price'
              className=' border  px-2 py-2 w-96 rounded-md outline-none '
            />
          </div>

          {/* Input Three  */}
          <div className="mb-3">
            <input
              type="text"
              name="productImageUrl"
              value={product.productImageUrl}
              onChange={(e) => {
                setProduct({
                  ...product,
                  productImageUrl: e.target.value
                })
              }}
              placeholder='Product Image Url'
              className=' border  px-2 py-2 w-96 rounded-md outline-none '
            />
          </div>

          {/* Input Four  */}
          {/* <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value
                })
              }}
              className="w-full px-1 py-2  border  rounded-md outline-none  ">
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value
                return (
                  <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                )
              })}
            </select>
          </div> */}

          {/* Input Five  */}
          <div className="mb-3">
            <textarea
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value
                })
              }} name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1  border  rounded-md outline-none placeholder-pink-300 ">

            </textarea>
          </div>

          {/* Update Product Button  */}
          <div className="mb-3">
            <button
              onClick={updateProduct}
              type='button'
              className='bg-green-500 hover:bg-green-600 w-full text-white text-center py-2 font-bold rounded-md '
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProductPage
