import React, { useState } from 'react'
import "../../css/Cart/Cart.css"
import Checkout from '../CheckoutForm/Checkout'
import Rotate from 'react-reveal/Rotate';
 function Cart(props) {

    const [showForm, setShowForm] = useState(false)
    const [value, setValue] = useState("")

    const submitOrder = (e) => {
        e.preventDefault();

        const order = {
            name : value.name,
            email: value.email 
        }
        console.log(order);
    }

    const handleChange = (e) => {
        setValue( (prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    return (
        <div className='cart-wrapper'>
            <div className='cart-title'> {props.cartItems.length === 0 ? 'cart Empty' : <p>
                There is {props.cartItems.length} products in cart
            </p>}</div>
            <Rotate top cascade>
            <div className='cart-items'>
                {props.cartItems.map(item => (
                    <div className='cart-item' key={item.id}>
                    <img src={item.imageUrl} alt=''/>
                    <div className='cart-info'>
                        <div>
                            <p>{item.title}</p>
                            <p>qyt: {item.qty}</p>
                            <p>price: ${item.price}</p>
                        </div>
                        <button onClick={() => props.removeFromCart(item)}>
                            Remove
                        </button>
                    </div>
                </div>
                ))}
                
            </div>
            </Rotate>
           
            {
                props.cartItems.length !== 0 &&
                (
                    <div className='cart-footer'>
                        <div className='total'>Total : ${props.cartItems.reduce( (acc, p) => {
                            return acc + p.price
                        } , 0)} </div>
                        <button onClick={() => setShowForm(true)}>select products </button>
                    </div>
                )
            }

            {/* Checkout Form */}

            <Checkout
            showForm={showForm}
            value={value}
            submitOrder={submitOrder}
            setShowForm={setShowForm}
            handleChange={handleChange}
            />
            
        </div>
    )
}


export default Cart