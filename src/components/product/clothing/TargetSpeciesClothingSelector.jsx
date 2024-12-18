import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import AddItemModal from "../../modals/AddItemModal";
import { getAllTargetSpecies } from './ClothingService';

const TargetSpeciesClothingSelector = ({ value, onChange }) => {
  const [tagets, setTagets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAllTagets = async () => {
      try {
        const result = await getAllTargetSpecies();
        setTagets(result.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAllTagets();
  }, []);

  const handleTargetChange = (e) => {
    if (e.target.value === "Add-New") {
      setShowModal(true);
    } else {
      onChange(e);
    }
  };

  const handleSaveNewItem = (newItem) => {
    if (newItem && !tagets.includes(newItem)) {
      setTagets([...tagets, newItem]); // Thêm vào danh sách lựa chọn
      onChange({ target: { name: "targetSpecies", value: newItem } }); // Cập nhật state
    }
  };
    return (
        <React.Fragment>
    <Form.Group as={Col} controlId='targetSpecies' className="mb-4">
      <Form.Control
        as='select'
        name='targetSpecies'
        value={value}
        required
        onChange={handleTargetChange}>
        <option value=''>...select Target Species...</option>
        {tagets.map((taget) => (
          <option key={taget} value={taget}>
            {taget}
          </option>
        ))}
        <option value='Add-New'>Add New</option>
      </Form.Control>
    </Form.Group>
    <AddItemModal
      show={showModal}
      handleClose={() => setShowModal(false)}
      itemLabel={"Target Species"}
      handleSave={handleSaveNewItem}
    />
  </React.Fragment>
    )
}

export default TargetSpeciesClothingSelector