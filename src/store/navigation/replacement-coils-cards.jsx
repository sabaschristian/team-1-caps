import React from "react";
import "../store.css";
import { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ReplacementCoilsCards() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3005/getProduct")
      .then((response) => response.json())
      .then(({ products }) => setProducts(products));
  }, []);
  let aegisItems = products.filter((products) => {
    return products.category === "Coil";
  });
  console.log(aegisItems)

  return (
    <Row xs={1} md={4} className="g-1" id="cards-container">
      {aegisItems.map((item) => {
        return (
          <Col key={item.id} class="aegis-col">
            <Card id="aegis-cards">
              <Card.Img variant="top" src={item.url} />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  <i class="fa-solid fa-star star"></i>
                  <i class="fa-solid fa-star star"></i>
                  <i class="fa-solid fa-star star"></i>
                  <i class="fa-solid fa-star star"></i>
                  <i class="fa-solid fa-star star"></i>({item.star})
                </Card.Text>
                <Card.Text className="text-muted">
                  <i class="fa-solid fa-peso-sign"></i>
                  {item.price}
                </Card.Text>
                <button type="button" className="btn btn-success" id="cart-btn">
                    Add to cart
                    <i className="fas fa-cart-plus nav-icon"></i>
                  </button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
      
    </Row>
  );
}

export default ReplacementCoilsCards;
