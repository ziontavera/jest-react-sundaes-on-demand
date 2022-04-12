import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function ToppingOptions({ name, imagePath, updateItemCount }) {
  const handleChange = (e) => {
    const val = e.target.checked ? 1 : 0;
    updateItemCount(name, val);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        alt={`${name} topping`}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Check
          type="checkbox"
          defaultValue={0}
          onChange={(e) => handleChange(e)}
          label={name}
        />
      </Form.Group>
    </Col>
  );
}
export default ToppingOptions;
