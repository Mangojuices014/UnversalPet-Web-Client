import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { getAllTypeTool } from './CareToolService';
import AddItemModal from "../../modals/AddItemModal";


const TypeCareToolSelector = ({ value, onChange }) => {
  const [typeTools, setTypeTools] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAllTypeTools = async () => {
      try {
        const result = await getAllTypeTool();
        setTypeTools(result.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAllTypeTools();
  }, []);

  const handleTypeToolChange = (e) => {
    if (e.target.value === "Add-New") {
      setShowModal(true);
    } else {
      onChange(e);
    }
  };

  const handleSaveNewItem = (newItem) => {
    if (newItem && !typeTools.includes(newItem)) {
      setTypeTools([...typeTools, newItem]);
      onChange({ target: { name: "typeCareTools", value: newItem } });
    }
  };
  return (
    <React.Fragment>
      <Form.Group as={Col} controlId='typeCareTools' className="mb-4">
        <Form.Control
          as='select'
          name='typeCareTools'
          value={value}
          required
          onChange={handleTypeToolChange}>
          <option value=''>...select type tool...</option>
          {typeTools.map((typeTool) => (
            <option key={typeTool} value={typeTool}>
              {typeTool}
            </option>
          ))}
          <option value='Add-New'>Add New</option>
        </Form.Control>
      </Form.Group>
      <AddItemModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        itemLabel={"typeTool"}
        handleSave={handleSaveNewItem}
      />
    </React.Fragment>
  )
}

export default TypeCareToolSelector