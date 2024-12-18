import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import AddItemModal from "../../modals/AddItemModal";
import { getAllMaterialClothing } from './ClothingService';

const MaterialClothingSelector = ({ value, onChange }) => {
  const [materials, setMaterials] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAllMaterial = async () => {
      try {
        const result = await getAllMaterialClothing();
        setMaterials(result.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAllMaterial();
  }, []);

  const handleMaterialChange = (e) => {
    if (e.target.value === "Add-New") {
      setShowModal(true);
    } else {
      onChange(e);
    }
  };

  const handleSaveNewItem = (newItem) => {
    if (newItem && !materials.includes(newItem)) {
      setMaterials([...materials, newItem]);
      onChange({ target: { name: "materialClothing", value: newItem } });
    }
  };
  return (
    <React.Fragment>
    <Form.Group as={Col} controlId='materialClothing' className="mb-4">
      <Form.Control
        as='select'
        name='materialClothing'
        value={value}
        required
        onChange={handleMaterialChange}>
        <option value=''>...select material...</option>
        {materials.map((material) => (
          <option key={material} value={material}>
            {material}
          </option>
        ))}
        <option value='Add-New'>Add New</option>
      </Form.Control>
    </Form.Group>
    <AddItemModal
      show={showModal}
      handleClose={() => setShowModal(false)}
      itemLabel={"Material"}
      handleSave={handleSaveNewItem}
    />
  </React.Fragment>
  )
}

export default MaterialClothingSelector