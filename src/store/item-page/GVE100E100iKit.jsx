import React, { useState, useEffect, useCallback, useRef } from "react";
import { addToCart } from "../features/cartSlice";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/gv-e100e100i-kit.css";
import GVE100E100iKitIcon2 from '../../assets/images/item-pages-details/e100-02x-icon.png';

function GVE100E100iKit() {
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3005/getProduct")
        .then((response) => response.json())
        .then(({ products }) => setProducts(products));
    }, []);

    const handleAddToCart = (productId) => {
        const productToAdd = products.find(product => product.id === productId);
        dispatch(addToCart(productToAdd));
    };

    const pageName = "GVE100E100iKit";
    const [item, setItem] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3005/store/item-page/${pageName}`)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json();
            } else {
            throw new Error("Invalid JSON response");
            }
        })
        .then((data) => {
            console.log(data);
            setItem(data);
        })
        .catch((error) => console.error(error));
    }, [pageName]);

    const [images, setImages] = useState([]);

    const importImages = async () => {
        const context = require.context(
        "../../assets/images/gv-e100e100i-kit",
        false,
        /\.(png|jpe?g|svg)$/
        );
        const importedImages = await Promise.all(context.keys().map(context));
        setImages(importedImages);
    };

    useEffect(() => {
        importImages();
    }, []);

    const [currentImage, setCurrentImage] = useState(0);

    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [scrollAmount, setScrollAmount] = useState(0);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleScrollVertical = () => {
        if (containerRef.current && isHovered) {
        const container = containerRef.current;
        const maxScrollTop = container.scrollHeight - container.clientHeight;
        if (scrollAmount < 0 && container.scrollTop <= 0) {
            // Reached the top of the container, disable scrolling up
            setScrollAmount(0);
        } else if (scrollAmount > 0 && container.scrollTop >= maxScrollTop) {
            // Reached the bottom of the container, disable scrolling down
            setScrollAmount(0);
        } else {
            container.scrollTo({
            top: container.scrollTop + scrollAmount,
            behavior: "smooth",
            });
        }
        }
    };

    const handleScrollHorizontal = () => {
        if (containerRef.current && isHovered) {
        const container = containerRef.current;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if (scrollAmount < 0 && container.scrollLeft <= 0) {
            // Reached the left of the container, disable scrolling left
            setScrollAmount(0);
        } else if (scrollAmount > 0 && container.scrollLeft >= maxScrollLeft) {
            // Reached the right of the container, disable scrolling right
            setScrollAmount(0);
        } else {
            container.scrollTo({
            left: container.scrollLeft + scrollAmount,
            behavior: "smooth",
            });
        }
        }
    };

    const handleScroll =
        window.innerWidth > 992 ? handleScrollVertical : handleScrollHorizontal;

    useEffect(() => {
        window.addEventListener("wheel", handleScroll);
        return () => window.removeEventListener("wheel", handleScroll);
    }, [isHovered]);

    const handleSmallImageClick = (index) => {
        setCurrentImage(index);
        setScrollAmount(index * 120);
    };

    return (
        <div className="container">
        {item.item_name && (
            <>
            <div className="container-fluid mt-5 py-4 px-xl-5">
                <div className="row mb-4">
                <div className="col-lg-6 order-sm-1 order-lg-2">
                    <div className="row">
                    <div className="col-12 mb-4">
                        <img
                        className="border rounded ratio ratio-1x1 img-fluid"
                        alt=""
                        src={images[currentImage]}
                        />
                    </div>
                    </div>
                </div>

                <div className="d-lg-block col-lg-1 order-sm-2 order-xs-2 order-lg-1 ">
                    <div
                    className="GVE100E100iKit-vertical-scroller"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    >
                    <div
                        className="d-flex flex-column position-absolute top-0 start-0 scrollingImages"
                        ref={containerRef}
                    >
                        {images.map((image, index) => {
                        let selected = index === currentImage ? "opacity-6" : "";
                        return (
                            <div
                            key={index}
                            onClick={() => handleSmallImageClick(index)}
                            >
                            <img
                                className={"rounded mb-2 ratio " + selected}
                                alt=""
                                src={image}
                            />
                            </div>
                        );
                        })}
                    </div>
                    </div>
                </div>

                <div className="col-lg-5 order-sm-3">
                    <div className="d-flex flex-column h-100">
                    <h2 className="mb-1">{item.item_name}</h2>
                    <h3 className="mb-1">₱{item.item_price}</h3>
                    <br />
                    <div className="row g-3 mb-4">
                        <div className="col">
                        <button className="btn customBtn py-2 w-100" onClick={() => handleAddToCart(15)}>
                            Add to cart
                        </button>
                        </div>
                    </div>
                    <h4 className="mb-0">Details</h4>
                    <hr />
                    <dl className="row">
                        <dt className="col-sm-4">Code</dt>
                        <dd className="col-sm-8 mb-3">{item.item_id}</dd>

                        <dt className="col-sm-4">Category</dt>
                        <dd className="col-sm-8 mb-3">{item.item_category}</dd>

                        <dt className="col-sm-4">Series</dt>
                        <dd className="col-sm-8 mb-3">{item.item_series}</dd>
                    </dl>
                    </div>
                </div>
                </div>
            </div>

            <div className="container-fluid">
                <h4 className="mb-0">Overview</h4>
                <hr />
            <p>{item.item_desc}</p>
                <div className="container-fluid GVE100E100iKitImg">
                    <div className="container-fluid" style={{position:"relative"}}>
                        <div className="GVE100E100iKitDetails" style={{color:"#fff"}}>
                        <h1>GeekVape E100 & E1OOi Kit</h1>
                        </div>
                    </div>
                </div>

                <div className="container-fluid GVE100E100iKitImg2">
                    <div className="container-fluid GVE100E100iKitDetails2" style={{position:"relative"}}>
                            <p className="GVE100E100iKit-p2" style={{color:"#000"}}>
                            Equipped with the leakproof pod with top airflow,
                            <br />
                            Eteno is strikingly IP68-rating durable. The built-in 3000mAh battery version performs stably and lasts remarkably long.
                            <br />
                            Try Eteno and enjoy the eternal fun!
                            </p>
                            <img
                            className="GVE100E100iKitLogo2"
                            src={GVE100E100iKitIcon2}
                            alt="" />
                    </div>
                </div>
            </div>
        </>
        )}
    </div>
    );
}

export default GVE100E100iKit;
