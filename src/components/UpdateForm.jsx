import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
const UpdateForm = ({ updateData, data, setData }) => {
  const [firstname, setFirstName] = useState(updateData.firstname);
  const [lastname, setLastName] = useState(updateData.lastname);

  function handleSubmit() {
    let newData = data.map((items) => {
      if (items.id === updateData.id) {
        return {
          id: updateData.id,
          firstname: firstname,
          lastname: lastname,
          email: updateData.email,
        };
      } else {
        return items;
      }
    });
    setData(newData);
  }

  return (
    <div>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Button onClick={handleSubmit}>Update</Button>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateForm;
