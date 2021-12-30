import React, {useState} from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/footer";
// import { words } from "./words";
import data from './data.json'
import Products from "./components/Products/Products";
import Filter from "./components/Filter/Filter";

function App() {
  const [products, setProducts] = useState(data)
  const [sort, setSort] = useState("");
  const [size, setSize] = useState("");

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
        return b.prise - a.prise
      } else {
        return a.id < b.id ? 1 : -1
      }
      
    });
    setProducts(newProducts)
  }
  
  
 
  return (
    <div className="layout">
       <Header />
      <main>
        <div className="wrapper">
          <Products products={products} />
          <Filter 
            size={size}
            sort={sort}
            handleFilterByOrder={handleFilterByOrder}
            handleFilterBySize={handleFilterBySize} 
            />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
