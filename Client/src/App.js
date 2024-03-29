import React, {useState, useEffect} from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/footer";
// import { words } from "./words";
import data from './data.json'
import Products from "./components/Products/Products";
import Filter from "./components/Filter/Filter";
import Cart from "./components/Cart/Cart";

function App() {
  const [products, setProducts] = useState(data)
  const [sort, setSort] = useState("");
  const [size, setSize] = useState("");
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

  const handleFilterBySize = (e) => {
    setSize(e.target.value);
    if(e.target.value == "ALL") {
      setProducts(data);
    } else {
      let productsClone = [...products];
      let newProducts = productsClone.filter(p => p.sizes.indexOf(e.target.value) != -1);
      console.log("newProducts", newProducts)
      setProducts(newProducts);
    }
  }

 

  const handleFilterByOrder = (e) => {
    let order = e.target.value;
    setSort(order);
    let productsClone = [...products];
    let newProducts = productsClone.sort( function(a,b) {
      if(order == "lowest") {
        return a.prise - b.prise
      } else if(order == "highest") {
        return b.price - a.prise
      } else {
        return a.id < b.id ? 1 : -1
      }
      
    });
    setProducts(newProducts)
  }
  
  const addToCart = (product) => {
    const cartItemsClone = [...cartItems];
    var isProductExist = false;
    cartItemsClone.forEach(p => {
      if(p.id == product.id) {
        p.qty++;
        isProductExist= true;
      }
    })
    if(!isProductExist) {
      cartItemsClone.push({...product, qty: 1})
    }
    setCartItems(cartItemsClone);
  }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems)) 
  }, [cartItems])

  const removeFromCart = (product) => {
    const cartItemsClone = [...cartItems];
    setCartItems(cartItemsClone.filter(p => p.id !== product.id))
  }
 
  return (
    <div className="layout">
       <Header />
      <main>
        <div className="wrapper">
          <Products products={products} addToCart={addToCart} />
          <Filter 
            productsNumber={products.length}
            size={size}
            sort={sort}
            handleFilterByOrder={handleFilterByOrder}
            handleFilterBySize={handleFilterBySize} 
            />
        </div>
        <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
