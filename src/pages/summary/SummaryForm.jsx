import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function SummaryForm({ setOrderPhase }) {
  const [checked, setChecked] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setOrderPhase("finished");
  }
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>The TNC</Popover.Body>
    </Popover>
  );

  const termsAndConditions = (
    <span>
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="terms-and-conditions">
          <Form.Check
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            label={termsAndConditions}
          />
        </Form.Group>
        <Button
          variant={checked ? "primary" : "secondary"}
          type="submit"
          disabled={!checked}
        >
          Submit Order
        </Button>
      </Form>
    </>
  );
}

export default SummaryForm;
