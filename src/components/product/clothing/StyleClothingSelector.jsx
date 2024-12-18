import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import AddItemModal from "../../modals/AddItemModal";
import { getAllStyle } from './ClothingService';

const StyleClothingSelector = ({ value, onChange }) => {
  const [styles, setStyles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAllStyle = async () => {
      try {
        const result = await getAllStyle();
        setStyles(result.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAllStyle();
  }, []);

  const handleStyleChange = (e) => {
    if (e.target.value === "Add-New") {
      setShowModal(true);
    } else {
      onChange(e);
    }
  };

  const handleSaveNewItem = (newItem) => {
    if (newItem && !styles.includes(newItem)) {
      setStyles([...styles, newItem]);
      onChange({ target: { name: "style", value: newItem } });
    }
  };
  return (
    <React.Fragment>
    <Form.Group as={Col} controlId='style' className="mb-4">
      <Form.Control
        as='select'
        name='style'
        value={value}
        required
        onChange={handleStyleChange}>
        <option value=''>...select style...</option>
        {styles.map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
        <option value='Add-New'>Add New</option>
      </Form.Control>
    </Form.Group>
    <AddItemModal
      show={showModal}
      handleClose={() => setShowModal(false)}
      itemLabel={"Style"}
      handleSave={handleSaveNewItem}
    />
  </React.Fragment>
  )
}

export default StyleClothingSelector