import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import AddItemModal from "../../modals/AddItemModal";
import { getAllTypeMedicine } from "./MedicineService";

const TypeMedicineSelector = ({ value, onChange }) => {
    const [typeMedicines, setTypeMedicines] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchAllTypeMedicines = async () => {
            try {
                const result = await getAllTypeMedicine();
                setTypeMedicines(result.data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchAllTypeMedicines();
    }, []);

    const handleTypeMedicineChange = (e) => {
        if (e.target.value === "Add-New") {
            setShowModal(true);
        } else {
            onChange(e);
        }
    };

    const handleSaveNewItem = (newItem) => {
        if (newItem && !typeMedicines.includes(newItem)) {
            setTypeMedicines([...typeMedicines, newItem]);
            onChange({ target: { name: "typeMedicine", value: newItem } });
        }
    };
    return (
        <React.Fragment>
            <Form.Group as={Col} controlId='typeMedicine' className="mb-4">
                <Form.Control
                    as='select'
                    name='typeMedicine'
                    value={value}
                    required
                    onChange={handleTypeMedicineChange}>
                    <option value=''>...select type medicine...</option>
                    {typeMedicines.map((typeMedicine) => (
                        <option key={typeMedicine} value={typeMedicine}>
                            {typeMedicine}
                        </option>
                    ))}
                    <option value='Add-New'>Add New</option>
                </Form.Control>
            </Form.Group>
            <AddItemModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                itemLabel={"Type Medicine"}
                handleSave={handleSaveNewItem}
            />
        </React.Fragment>
    )
}

export default TypeMedicineSelector