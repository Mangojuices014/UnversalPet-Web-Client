import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import AddItemModal from "../../modals/AddItemModal";
import { getAllMaterials } from './CareToolService';

const MaterialCareToolSelector = ({ value, onChange }) => {
    const [materials, setMaterials] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchAllMaterials = async () => {
            try {
                const result = await getAllMaterials();
                setMaterials(result.data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchAllMaterials();
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
            onChange({ target: { name: "materialCareTool", value: newItem } });
        }
    };

    return (
        <React.Fragment>
            <Form.Group as={Col} controlId='materialCareTool' className="mb-4">
                <Form.Control
                    as='select'
                    name='materialCareTool'
                    value={value}
                    required
                    onChange={handleMaterialChange}>
                    <option value=''>...select type tool...</option>
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
                itemLabel={"material"}
                handleSave={handleSaveNewItem}
            />
        </React.Fragment>
    );
}

export default MaterialCareToolSelector;
