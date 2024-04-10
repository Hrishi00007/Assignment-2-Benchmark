import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

const PAGE_SIZE = 5;

const MyComponent = ({ apiUrl }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}?page=${currentPage}`);
      setData(res.data);
      setTotalPages(
        res.data.length > 0 ? Math.ceil(res.data.length / PAGE_SIZE) : 1
      );
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const handleChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditChange = (id, field, value) => {
    setEditValues({
      ...editValues,
      [id]: {
        ...editValues[id],
        [field]: value,
      },
    });
  };

  const handleEdit = async (id) => {
    try {
      const { firstname, lastname, email, birthDate } = editValues[id];
      await axios.put(`${apiUrl}/${id}`, {
        firstname,
        lastname,
        email,
        birthDate,
      });
      <input
        type="text"
        value={editValues[item.id]?.lastname || item.lastname}
        onChange={(e) => handleEditChange(item.id, "lastname", e.target.value)}
      ></input>;
      setData(
        data.map((item) =>
          item.id === id ? { ...item, ...editValues[id] } : item
        )
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => handleEdit(item.id)}>Update</button>
              </td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev
          onClick={() => handleChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handleChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handleChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default MyComponent;
