import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import UpdateForm from "./UpdateForm";
import Button from "react-bootstrap/Button";
import { Form, Row, Col } from "react-bootstrap";

const PAGE_SIZE = 5;
let add = false;

const MyComponent = ({ apiUrl }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);

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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleEdit = async (id) => {
    setUpdateData(
      data.filter((item) => {
        if (item.id === id) {
          return true;
        }
        return false;
      })[0]
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const handleAdd = async () => {
    add = true;
    const res = await axios.post(apiUrl, { firstname, lastname, email });
    setData([...data, res.data]);
    setFirstname("");
    setLastname("");
    setEmail("");
  };

  return (
    <div>
      <div>
        <Button onClick={toggleForm}>Add data</Button>
        {showForm && (
          <div>
            <Form>
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="First Name"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Last Name"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </Col>
                <Col>
                  <Button onClick={handleAdd}>Add User</Button>
                </Col>
              </Row>
            </Form>
          </div>
        )}

        {updateData ? (
          <UpdateForm updateData={updateData} data={data} setData={setData} />
        ) : undefined}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>username</th>
            </tr>
          </thead>
          <tbody key={data.id}>
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
                <td>
                  <Button onClick={handleAdd}>Add</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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
