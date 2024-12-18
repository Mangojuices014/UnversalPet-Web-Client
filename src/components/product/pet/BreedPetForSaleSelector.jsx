import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import AddItemModal from "../../modals/AddItemModal";
import { getAllBreedPet } from './PetForSaleService';

const BreedPetForSaleSelector = ({ value, onChange }) => {
    const [breeds, setBreeds] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchAllBreed = async () => {
            try {
                const result = await getAllBreedPet();
                setBreeds(result.data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchAllBreed();
    }, []);

    const handleBreedChange = (e) => {
        if (e.target.value === "Add-New") {
            setShowModal(true);
        } else {
            onChange(e);
        }
    };

    const handleSaveNewItem = (newItem) => {
        if (newItem && !breeds.includes(newItem)) {
            setBreeds([...breeds, newItem]);
            onChange({ target: { name: "breed", value: newItem } });
        }
    };
    return (
        <React.Fragment>
            <Form.Group as={Col} controlId='breed' className="mb-4">
                <Form.Control
                    as='select'
                    name='breed'
                    value={value}
                    required
                    onChange={handleBreedChange}>
                    <option value=''>...select breed...</option>
                    {breeds.map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                    ))}
                    <option value='Add-New'>Add New</option>
                </Form.Control>
            </Form.Group>
            <AddItemModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                itemLabel={"Breed"}
                handleSave={handleSaveNewItem}
            />
        </React.Fragment>
    )
}

export default BreedPetForSaleSelector