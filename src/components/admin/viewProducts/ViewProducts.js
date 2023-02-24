import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { db, storage } from "../../../firebase/config";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { ref } from "firebase/storage";

import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Loader from "../../loader/Loader";

import { Link } from "react-router-dom";
import styles from "./ViewProducts.module.scss";
import { deleteObject } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch } from "react-redux";
import { STORE_PRODUCTS } from "../../../redux/slice/productSlice";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);

    try {
      const productsRef = collection(db, "products");

      const q = query(productsRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false);
        dispatch(
          STORE_PRODUCTS({
            products: allProducts,
          })
        );
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const confirmDelete = (id, imageUrl) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "Are you sure you want to delete?",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageUrl);
      },
      function cancelCb() {
        console.log("Delete Cancelled");
      },
      {
        width: "350px",
        height: "50px",
        borderRadius: "8px",
        titleColor: "orangered",
        okButtonColor: "white",
        okButtonBackground: "red",
        cssAnimationStyle: "fade",
      }
    );
  };

  const deleteProduct = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);

      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>
        {products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Serial #</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { id, name, price, imageUrl, category, brand } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageUrl}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={20}
                        color="red"
                        onClick={() => confirmDelete(id, imageUrl)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
