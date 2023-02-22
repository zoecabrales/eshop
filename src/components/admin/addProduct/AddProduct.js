import { useState } from "react";

import Card from "../../../components/card/Card";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../../firebase/config";
import { addDoc, collection } from "firebase/firestore";

import styles from "./AddProduct.module.scss";
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  name: "",
  imageUrl: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    ...initialState,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `eStore/${Date.now()} ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageUrl: downloadURL });
          toast.success("Image successfully uploaded");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      toast.success("Product successfully added.");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h1>Add New Product</h1>
        <Card cardClass={styles.card}>
          <form onSubmit={addProduct}>
            <label>Product Name: </label>
            <input
              required
              type="text"
              name="name"
              value={product.name}
              placeholder="Product Name"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}%`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                accept="image/*"
                type="file"
                placeholder="Product Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {product.imageUrl === "" ? null : (
                <input
                  disabled
                  // required
                  placeholder="Image Url"
                  name="imageUrl"
                  value={product.imageUrl}
                  type="text"
                />
              )}
            </Card>

            <label style={{ marginTop: "20px" }}>Product Price: </label>
            <input
              required
              type="number"
              name="price"
              value={product.price}
              placeholder="Product Price"
              onChange={(e) => handleInputChange(e)}
            />

            <label style={{ marginTop: "20px" }}>Product Category: </label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose a category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <label style={{ marginTop: "20px" }}>Product Brand: </label>
            <input
              required
              type="text"
              name="brand"
              value={product.brand}
              placeholder="Product Brand"
              onChange={(e) => handleInputChange(e)}
            />

            <label style={{ marginTop: "20px" }}>Product Desciption: </label>
            <textarea
              required
              cols="30"
              rows="10"
              type="text"
              name="desc"
              value={product.desc}
              placeholder="Product Desciption"
              onChange={(e) => handleInputChange(e)}
            />

            <button className="--btn --btn-primary">Save Product</button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
