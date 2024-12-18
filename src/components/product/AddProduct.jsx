import React, { useState } from 'react'
import UseMessageAlerts from '../hooks/UseMessageAlerts';
import {
    Container,
    Row,
    Col,
    Form,
    Card,
    Button,
} from "react-bootstrap";
import { format } from "date-fns";
import AlertMessage from '../common/AlertMessage';
import DatePicker from "react-datepicker";
import { addProduct } from './ProductService';
import TypeCareToolSelector from './caretool/TypeCareToolSelector';
import MaterialCareToolSelector from './caretool/MaterialCareToolSelector';
import StyleClothingSelector from './clothing/StyleClothingSelector';
import TargetSpeciesClothingSelector from './clothing/TargetSpeciesClothingSelector';
import ColorClothingSelector from './clothing/ColorClothingSelector';
import ColorPetForSaleSelector from './pet/ColorPetForSaleSelector';
import BreedPetForSaleSelector from './pet/BreedPetForSaleSelector';
import MaterialClothingSelector from './clothing/MaterialClothingSelector';
import TypeMedicineSelector from './medicine/TypeMedicineSelector';


const AddProduct = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [imagePreview, setImagePreview] = useState("")
    const [product, setProduct] = useState({
        type: '',
        name: '',
        sku: '',
        slug: '',
        description: '',
        price: '',
        category: '',
        // Khởi tạo mặc định cho tất cả các trường bạn cần

        //Pet
        fullName: "",
        age: "",
        healthStatus: "",
        colorPet: "",
        breed: "",

        //food
        weight: 0,
        nutritionFacts: '',
        expiry: '',

        //medicine
        expirationDate: '',
        typeMedicine: '',
        usageInstruction: '',

        ////tool
        typeCareTools: '',
        materialCareTool: '',
        sizeCareTool: '',

        //clothing
        sizeClothing: '',
        materialClothing: '',
        targetSpecies: '',
        colorClothing: '',
        style: '',
        season: '',
        gender: '',
        photo: null,
    });


    const {
        successMessage,
        errorMessage,
        setSuccessMessage,
        setErrorMessage,
        showSuccessAlert,
        showErrorAlert,
        setShowSuccessAlert,
        setShowErrorAlert,
    } = UseMessageAlerts();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const dateFormatter = (date) => {
        if (!date || isNaN(new Date(date))) {
            return { formattedDate: null }; // Trả về null nếu không hợp lệ
        }

        const formattedDate = format(new Date(date), "yyyy-MM-dd");
        return { formattedDate };
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { formattedDate } = dateFormatter(product.expirationDate || product.expiry);
        // Chuẩn bị dữ liệu từ form (giả sử bạn đã có `product` trong state)
        const productData = {
            type: product?.type || '',
            name: product?.name || '',
            sku: product?.sku || '',
            slug: product?.slug || '',
            description: product?.description || '',
            price: product?.price || 0,
            category: product?.category || '',

            // pet
            fullName: product?.fullName || '',
            colorPet: product?.colorPet || '',
            breedColor: product?.breedColor || '',
            age: product?.age || 0,
            healthStatus: product?.healthStatus || '',

            // food
            weight: product?.weight || 0,
            nutritionFacts: product?.nutritionFacts || '',
            expiry: formattedDate || '',

            // medicine
            expirationDate: formattedDate || '',
            typeMedicine: product?.typeMedicine || '',
            usageInstruction: product?.usageInstruction || '',

            // care tools
            typeCareTools: product?.typeCareTools || '',
            materialCareTool: product?.materialCareTool || '',
            sizeCareTool: product?.sizeCareTool || '',

            // clothing
            sizeClothing: product?.sizeClothing || '',
            materialClothing: product?.materialClothing || '',
            targetSpecies: product?.targetSpecies || '',
            colorClothing: product?.colorClothing || '',
            style: product?.style || '',
            season: product?.season || '',
            gender: product?.gender || '',
        };
        try {
            // Gọi API thêm sản phẩm
            const response = await addProduct(product?.photo, productData); // Hàm đã được định nghĩa trước đó
            setSuccessMessage(response.message);
            handleReset();
            setShowSuccessAlert(true);
        } catch (error) {
            setShowErrorAlert(true);

            // Kiểm tra nếu error.response có tồn tại
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else if (error.message) {
                setErrorMessage(error.message); // Thông báo lỗi nếu không có response từ server
            } else {
                setErrorMessage('An unknown error occurred.');
            }
        }
    };



    const handleDateChange = (date) => {
        setProduct((prevState) => ({
            ...prevState,
            expiry: date,
            expirationDate: date
            // Lưu giá trị ngày được chọn
        }));
    };


    const handleImageChange = (e) => {
        const selectedImage = e.target.files ? e.target.files[0] : null; // Kiểm tra nếu có files
        if (selectedImage) {
            setProduct({ ...product, photo: selectedImage });
            setImagePreview(URL.createObjectURL(selectedImage));
        } else {
            // Nếu không có file, bạn có thể xử lý theo cách khác, chẳng hạn thông báo lỗi.
            console.log("No file selected");
        }
    }


    const handleReset = () => {
        setProduct({
            type: "",
            name: "",
            sku: "",
            slug: "",
            description: "",
            price: "",
            category: "",
            fullName: "",
            colorPet: "",
            breed: "",
            age: "",
            healthStatus: "",
            weight: "",
            nutritionFacts: "",
            expiry: "",
            expirationDate: "",
            typeMedicine: "",
            usageInstruction: "",
            typeCareTools: "",
            materialCareTool: "",
            sizeCareTool: "",
            sizeClothing: "",
            materialClothing: "",
            targetSpecies: "",
            colorClothing: "",
            style: "",
            season: "",
            gender: "",
            photo: null,
        })
        setImagePreview("")
        document.getElementById("photo").value = "";
    }
    return (
        <Container className='mt-5'>
            <Row className='justify-content-center'>
                <Col xs={12} md={8} lg={6}>
                    <Form onSubmit={handleSubmit}>
                        <Card className='shadow mb-5'>
                            <Card.Header className='text-center'>
                                Add Product Form
                            </Card.Header>
                            <Card.Body>
                                <fieldset>
                                    <legend>Name</legend>
                                    <Row>
                                        <Col xs={6} className='mb-2 mb-sm-0'>
                                            <Form.Control
                                                type='text'
                                                name='name'
                                                placeholder='Name'
                                                value={product.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Control
                                                type='number'
                                                name='price'
                                                placeholder='Price'
                                                value={product.price}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Col>
                                    </Row>
                                </fieldset>
                                <fieldset>
                                    <legend>Code</legend>
                                    <Row>
                                        <Col xs={6} className='mb-2 mb-sm-0'>
                                            <Form.Control
                                                type='text'
                                                name='sku'
                                                placeholder='SKU'
                                                value={product.sku}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Control
                                                type='text'
                                                name='slug'
                                                placeholder='SLUG'
                                                value={product.slug}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Col>
                                    </Row>
                                </fieldset>
                                <Form.Group className='mb-4'>
                                    <Form.Label>Description a Product</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        rows={3}
                                        name='description'
                                        onChange={handleInputChange}
                                        value={product.description}
                                        required
                                    />
                                </Form.Group>
                                {/* Account Type */}
                                <Form.Group as={Row} controlId='product-type' className='mb-3'>
                                    <Col>
                                        <Form.Label>Product Type</Form.Label>
                                        <Form.Select
                                            name="type"
                                            required
                                            onChange={handleInputChange}
                                            value={product.type}>
                                            <option value=''>...select product type...</option>
                                            <option value='PET' >Product Pet</option>
                                            <option value='FOOD'>Product Food</option>
                                            <option value='TOOL'>Product Care Tool</option>
                                            <option value='MEDICINE'>Product Medicine</option>
                                            <option value='CLOTHING'>Product Clothing</option>
                                        </Form.Select>

                                    </Col>
                                </Form.Group>
                                {product?.type === "CLOTHING" && (

                                    <fieldset>
                                        <legend>Infomation Product</legend>
                                        <Form.Group className='mb-4'>
                                            <Col xs={12}>
                                                <StyleClothingSelector
                                                    value={product.style}
                                                    onChange={handleInputChange}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Row>
                                            <Col xs={6}>
                                                <TargetSpeciesClothingSelector
                                                    value={product.targetSpecies}
                                                    onChange={handleInputChange} />
                                            </Col>
                                            <Col xs={6}>
                                                <ColorClothingSelector
                                                    value={product.colorClothing}
                                                    onChange={handleInputChange} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Control
                                                    as='select'
                                                    name='season'
                                                    value={product.season}
                                                    required
                                                    onChange={handleInputChange}>
                                                    <option value=''>...select season...</option>
                                                    <option value='Spring'>Spring</option>
                                                    <option value='Summer'>Summer </option>
                                                    <option value='Fall'>Fall</option>
                                                    <option value='Winter'>Winter </option>
                                                    <option value='allSeason'>All Season</option>
                                                </Form.Control >
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Control
                                                    as='select'
                                                    name='gender'
                                                    value={product.gender}
                                                    onChange={handleInputChange}
                                                    required>
                                                    <option value=''>...select gender...</option>
                                                    <option value='Male'>Male</option>
                                                    <option value='Famele'>Famele </option>
                                                </Form.Control>

                                            </Col>
                                        </Row>
                                        <Row className='mt-3'>
                                            <Col xs={6}>
                                                <Form.Control
                                                    as='select'
                                                    name='sizeClothing'
                                                    value={product.sizeClothing}
                                                    onChange={handleInputChange}
                                                    required>
                                                    <option value=''>...select size...</option>
                                                    <option value='S'>S </option>
                                                    <option value='M'>M </option>
                                                    <option value='L'>L</option>
                                                    <option value='XL'>XL </option>
                                                </Form.Control>
                                            </Col>
                                            <Col xs={6}>
                                                <MaterialClothingSelector
                                                    value={product.materialClothing}
                                                    onChange={handleInputChange} />
                                            </Col>
                                        </Row>
                                    </fieldset>
                                )}
                                {product?.type === "TOOL" && (

                                    <fieldset>
                                        <legend>Infomation</legend>
                                        <Form.Group className='mb-4'>
                                            <Form.Label>Size Care </Form.Label>
                                            <Col xs={12}>
                                                <TypeCareToolSelector
                                                    onChange={handleInputChange}
                                                    value={product.typeCareTools} />
                                            </Col>
                                        </Form.Group>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Control
                                                    as='select'
                                                    name='sizeCareTool'
                                                    value={product.sizeCareTool}
                                                    onChange={handleInputChange}
                                                    required>
                                                    <option value=''>...select size...</option>
                                                    <option value='S'>S </option>
                                                    <option value='M'>M </option>
                                                    <option value='L'>L</option>
                                                    <option value='XL'>XL </option>
                                                </Form.Control>
                                            </Col>
                                            <Col xs={6}>
                                                <MaterialCareToolSelector
                                                    onChange={handleInputChange}
                                                    value={product.materialCareTool} />
                                            </Col>
                                        </Row>
                                    </fieldset>
                                )}
                                {product.type === "MEDICINE" && (

                                    <fieldset>
                                        <legend>Infomation</legend>
                                        <Form.Group className='mb-4'>
                                            <Form.Label>Usage Instruction</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                rows={3}
                                                name='usageInstruction'
                                                onChange={handleInputChange}
                                                value={product.usageInstruction}
                                                required
                                            />
                                        </Form.Group>
                                        <Row>
                                            <Col xs={6} className='mb-2 mb-sm-0'>
                                                <DatePicker
                                                    selected={product.expirationDate}
                                                    onChange={handleDateChange}
                                                    dateFormat='yyyy-MM-dd'
                                                    className='form-control'
                                                    minDate={new Date()}
                                                    placeholderText='Expiration Date'
                                                    required
                                                />
                                            </Col>
                                            <Col xs={6}>
                                                <TypeMedicineSelector
                                                    onChange={handleInputChange}
                                                    value={product.typeMedicine} />
                                            </Col>
                                        </Row>
                                    </fieldset>
                                )}
                                {product.type === "FOOD" && (

                                    <fieldset>
                                        <legend>Infomation</legend>
                                        <Form.Group className='mb-4'>
                                            <Form.Label>Nutrition Facts</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                rows={3}
                                                name='nutritionFacts'
                                                onChange={handleInputChange}
                                                value={product.nutritionFacts}
                                                required
                                            />
                                        </Form.Group>
                                        <Row>
                                            <Col xs={6} className='mb-2 mb-sm-0'>
                                                <DatePicker
                                                    selected={product.expiry}
                                                    onChange={handleDateChange}
                                                    dateFormat='yyyy-MM-dd'
                                                    className='form-control'
                                                    minDate={new Date()}
                                                    placeholderText='Expiry date'
                                                    required
                                                />
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Control
                                                    type='number'
                                                    name='weight'
                                                    placeholder='weight'
                                                    value={product.weight}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                    </fieldset>
                                )}
                                {product.type === "PET" && (

                                    <fieldset>
                                        <legend>Infomation</legend>
                                        <Form.Group className='mb-4'>
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='fullName'
                                                placeholder='fullName'
                                                value={product.fullName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Row>
                                            <Col xs={6} className='mb-2 mb-sm-0'>
                                                <Form.Control
                                                    type='number'
                                                    name='age'
                                                    placeholder='age'
                                                    value={product.age}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Control
                                                    type='text'
                                                    name='healthStatus'
                                                    placeholder='healthStatus'
                                                    value={product.healthStatus}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                        <Form.Group className='mt-3'>
                                            <Row>
                                                <Col xs={6}>
                                                    <ColorPetForSaleSelector
                                                        value={product.colorPet}
                                                        onChange={handleInputChange} />
                                                </Col>
                                                <Col xs={6}>
                                                    <BreedPetForSaleSelector
                                                        value={product.breed}
                                                        onChange={handleInputChange} />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </fieldset>
                                )}
                                <label htmlFor="photo" className="form-label mt-2">
                                    Product Photo
                                </label>
                                <input
                                    required
                                    name="photo"
                                    id="photo"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview  product photo"
                                        style={{ maxWidth: "400px", maxHeight: "600px" }}
                                        className="mb-3 mt-4"></img>
                                )}

                                {/* Action Buttons */}
                                <div className='d-flex justify-content-center mb-3 mt-3'>
                                    <Button
                                        type='submit'
                                        variant='outline-primary'
                                        size='sm'
                                        className='me-2'
                                    >
                                        Add Product
                                    </Button>
                                    <Button
                                        variant='outline-info'
                                        size='sm'
                                        onClick={handleReset}>
                                        Reset
                                    </Button>
                                </div>

                                {/* Adjust column sizes for different screens */}
                                {showErrorAlert && (
                                    <AlertMessage type='danger' message={errorMessage} />
                                )}
                                {showSuccessAlert && (
                                    <AlertMessage type='success' message={successMessage} />
                                )}
                            </Card.Body>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddProduct