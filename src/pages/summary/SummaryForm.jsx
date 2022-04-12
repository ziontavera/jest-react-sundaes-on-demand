import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function SummaryForm() {
  const [checked, setChecked] = useState(false);

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
      <Form>
        <Form.Group controlId="terms-and-conditions">
          <Form.Check
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            label={termsAndConditions}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!checked}>
          Submit Order
        </Button>
      </Form>
    </>
  );
}

export default SummaryForm;
