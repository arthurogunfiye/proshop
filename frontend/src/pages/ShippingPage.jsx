import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice.js";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingPage = () => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [apartmentNumber, setApartmentNumber] = useState(
    shippingAddress?.apartmentNumber || ""
  );
  const [buildingName, setBuildingName] = useState(
    shippingAddress?.buildingName || ""
  );
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [town, setTown] = useState(shippingAddress?.town || "");
  const [state, setState] = useState(shippingAddress?.state || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        apartmentNumber,
        buildingName,
        address,
        town,
        city,
        postalCode,
        state,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="apartmentNumber" className="my-2">
          <Form.Label>Flat/Apartment Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter apartment number"
            value={apartmentNumber}
            onChange={e => setApartmentNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="buildingName" className="my-2">
          <Form.Label>Building/Block Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter building/block number"
            value={buildingName}
            onChange={e => setBuildingName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="town" className="my-2">
          <Form.Label>Town</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter town"
            value={town}
            onChange={e => setTown(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={e => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="state" className="my-2">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter state"
            value={state}
            onChange={e => setState(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={e => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
