import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import AddItemModal from "../../modals/AddItemModal";
import { getAllColorPet } from "./PetForSaleService";

const ColorPetForSaleSelector = ({ value, onChange }) => {
    const [colors, setColors] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchAllColor = async () => {
            try {
                const result = await getAllColorPet();
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
            onChange({ target: { name: "colorPet", value: newItem } });
        }
    };
    return (
        <React.Fragment>
            <Form.Group as={Col} controlId='colorPet' className="mb-4">
                <Form.Control
                    as='select'
                    name='colorPet'
                    value={value}
                    required
                    onChange={handleColorChange}>
                    <option value=''>...select color...</option>
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

export default ColorPetForSaleSelector