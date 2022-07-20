import { Link, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import leftArrow from '../assets/left-arrow.svg'
import { QuantityContext } from "../App"

export default function ProductDetail(){

    const handleCartQuantity = useContext(QuantityContext);

    const params = useParams()

    const [details, setDetails] = useState({})

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${params.id}`)
            .then(res => res.json())
            .then(data => setDetails(data))
    })

    console.log(details)

    return (
        <div className="detail-container">
            <div className="image-detail-view">
                <img className="image-detail" src={details.image} alt={details.description}/>
            </div>
            <div className="product-details">
                <Link to="/shop">
                    <button type="button"><img className="left-arrow" src={leftArrow} alt="left arrow" /> Back To Products</button>
                </Link>
                <h1 className="product-title">{details.title}</h1>
                <p className="product-price">${details.price}</p>
                <p className="category-detail">Category: {details.category}</p>
                <p className="description-detail">{details.description}</p>
                <button onClick={handleCartQuantity} className="add-to-cart-button" type="button">Add to Cart</button>
            </div>
        </div>
    )
}