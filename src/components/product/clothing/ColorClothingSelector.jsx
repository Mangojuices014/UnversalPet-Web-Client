import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import AddItemModal from "../../modals/AddItemModal";
import { getAllColorClothing } from './ClothingService';

const ColorClothingSelector = ({ value, onChange }) => {
    const [colors, setColors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAllColor= async () => {
      try {
        const result = await getAllColorClothing();
        setColors(result.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAllColor();
  }, []);

  const handleColorChange = (e) => {
    if (e.target.value === "Add-New") {
      setShowModal(true);
    } else {
      onChange(e);
    }
  };

  const handleSaveNewItem = (newItem) => {
    if (newItem && !colors.includes(newItem)) {
      setColors([...colors, newItem]);
      onChange({ target: { name: "colorClothing", value: newItem } });
    }
  };
  return (
    <React.Fragment>
    <Form.Group as={Col} controlId='colorClothing' className="mb-4">
      <Form.Control
        as='select'
        name='colorClothing'
        value={value}
        required
        onChange={handleColorChange}>
        <option value=''>...select Color...</option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
        <option value='Add-New'>Add New</option>
      </Form.Control>
    </Form.Group>
    <AddItemModal
      show={showModal}
      handleClose={() => setShowModal(false)}
      itemLabel={"Color"}
      handleSave={handleSaveNewItem}
    />
  </React.Fragment>
  )
}

export default ColorClothingSelector