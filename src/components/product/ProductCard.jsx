import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import UseMessageAlerts from '../hooks/UseMessageAlerts';
import { getAllProducts } from './ProductService';
import NoDataAvailable from '../common/NoDataAvailable';
import { Col, Row } from 'react-bootstrap';
import '../../assets/css/home.css'
import '../../assets/css/base.css'
import '../../assets/css/modal.css'
import '../../assets/css/animation.css'
import '../../assets/css/responsive.css'

const ProductsCard = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedTyped, setSelectedTyped] = useState("");
    // const [currentPage, setCurrentPage] = useState(1);
    // const [productsPerPage] = useState(10);

    // const indexOfLastProduct = currentPage * productsPerPage;
    // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    // const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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

    const fetchProducts = () => {
        setIsLoading(true);
        getAllProducts()
            .then((response) => {
                console.log("API Response: ", response);
                if (response.data) {
                    setProducts(response.data);
                } else {
                    setProducts(response);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching products: ", error);
                setErrorMessage(error.message);
                setShowErrorAlert(true);
                setIsLoading(false);
            });
    };


    const handleClearFilters = () => {
        setSelectedTyped("");
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // useEffect(() => {
    //     let filtered = products || [];
    //     if (selectedTyped) {
    //         filtered = filtered.filter((product) => product.type === selectedTyped);
    //     }
    //     console.log("Filtered Products: ", filtered); // Log dữ liệu đã lọc
    //     setFilteredProducts(filtered);
    // }, [selectedTyped, products]);

    // const types = products.length > 0
    //     ? Array.from(new Set(products.map((product) => product.type)))
    //     : [];

    return (
        <main>
            <section className="item dish">
                <div class="container">
                    <div class="nav__change">
                        <div class="row g-0">
                            <div class="nav__change__item col-12 col-md-2"> <button class="button__change active">
                                Bữa sáng</button></div>
                            <div class="nav__change__item col-12 col-md-2"> <button class="button__change"> Bữa trưa</button></div>
                            <div class="nav__change__item col-12 col-md-2"> <button class="button__change"> Bữa tối</button>
                            </div>
                            <div class="nav__change__item col-12 col-md-2"> <button class="button__change"> Nước uống</button>
                            </div>
                            <div class="nav__change__item col-12 col-md-2"> <button class="button__change"> Tráng miệng</button>
                            </div>
                            <div class="nav__change__item col-12 col-md-2"> <button class="button__change"> Rượu vang</button></div>
                        </div>
                    </div>
                    <div className="container">
                        {products && products.length > 0 ? (

                            <Row className="g-0 menu__item active">
                                {products.map((product, index) => (
                                    <Col md={6} key={product.id || index}>
                                        <Row className="g-0 dish__item showtotop">
                                            <Col md={12} lg={6}>
                                                <div
                                                    className="dish__img"
                                                    style={{
                                                        backgroundImage: `url('data:image/png;base64,${product.photo}')`,
                                                    }}
                                                ></div>
                                            </Col>
                                            <Col md={12} lg={6} className="dish__desc">
                                                <Row className="g-0">
                                                    <Col className="col-8">
                                                        <h3 className="dish__name">{product.name}</h3>
                                                    </Col>
                                                    <Col style={{ textAlign: "right" }}>
                                                        <span className="dish__price">{product.price}VND</span>
                                                    </Col>
                                                </Row>
                                                <p className="dish__prameter text">{product.type}</p>
                                                <button className="order mx-1">Đặt hàng</button>
                                                <button className="add__card">Thêm vào giỏ</button>
                                            </Col>
                                        </Row>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <NoDataAvailable dataType="product" />
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductsCard;
