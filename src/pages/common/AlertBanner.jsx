import Alert from "react-bootstrap/Alert";

function AlertBanner({ message, variant }) {
  const defaultMessage = "An unexpected error occured. Please try again later.";
  const alertMessage = message || defaultMessage;
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
}

export default AlertBanner;
