import React, { useState, useRef } from "react";
import { image } from "../Api/Endpoints";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  useGetProductQueries,
  useProductDeleteMutation,
} from "../hooks/react-query/query-hooks/productQuery.hooks";
import {
  MdDeleteForever,
  MdEdit,
  MdArrowUpward,
  MdArrowDownward,
} from "react-icons/md";

const ProductList = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);

  // Pagination logic
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Fetch all products
  const { data, isError, isLoading } = useGetProductQueries(page, perPage);

  // Handle delete mutation
  const deleteMutation = useProductDeleteMutation();

  // Handle delete
  const handleDelete = (id) => {
    deleteMutation.mutate({ id });
  };

  // Handle update
  const handleUpdate = (productId) => {
    navigate(`/editProduct/${productId}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  // Pagination logic
  const handleNextPage = () => {
    if (page < data.totalPages) {
      setPage((prevPage) => prevPage + 1);
    } else {
      toast.info("You're on the last page");
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    } else {
      toast.info("You're on the first page");
    }
  };

  // Scroll to top
  const handleScrollUp = () => {
    window.scrollBy({
      top: -tableRef.current.clientHeight,
      behavior: "smooth",
    });
  };

  // Scroll to bottom
  const handleScrollDown = () => {
    window.scrollBy({ top: tableRef.current.clientHeight, behavior: "smooth" });
  };

  return (
    <div className="container mt-5 p-2" style={{ height: "78.6vh" }}>
      <div className="row">
        <div className="col-3">
          <Link className="btn btn-success mb-3" to="/createProduct">
            Create New Product
          </Link>
        </div>
        <div className="col-6">
          <h2 className="text-center text-info">Product List</h2>
        </div>
      </div>
      <div
        className="table-container"
        style={{ maxHeight: "500px", overflowY: "auto", border: "2px solid" }}
      >
        <table className="table table" ref={tableRef}>
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: "#0000FF",
                  color: "white",
                  border: "2px solid",
                }}
              >
                Image
              </th>
              <th
                style={{
                  backgroundColor: "#0000FF",
                  color: "white",
                  border: "2px solid",
                }}
              >
                Title
              </th>
              <th
                style={{
                  backgroundColor: "#0000FF",
                  color: "white",
                  border: "2px solid",
                }}
              >
                Description
              </th>
              <th
                style={{
                  backgroundColor: "#0000FF",
                  color: "white",
                  border: "2px solid",
                }}
              >
                Status
              </th>
              <th
                style={{
                  backgroundColor: "#0000FF",
                  color: "white",
                  position: "sticky",
                  right: 0,
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((product) => (
              <tr key={product._id}>
                <td>
                  {product.image ? (
                    <img
                      src={image(product.image)}
                      alt={product.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    "No image available"
                  )}
                </td>
                <td style={{ fontSize: "20px" }}>{product.title}</td>
                <td style={{ fontSize: "20px" }}>{product.description}</td>
                <td style={{ fontSize: "20px" }}>{product.status}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn"
                      onClick={() => handleUpdate(product._id)}
                      style={{
                        background: "transparent",
                        fontSize: "25px",
                      }}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="btn me-2"
                      onClick={() => handleDelete(product._id)}
                      style={{
                        background: "transparent",
                        color: "red",
                        fontSize: "25px",
                      }}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
