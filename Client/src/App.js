import React, {useState} from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/footer";
// import { words } from "./words";
import data from './data.json'
import Products from "./components/Products/Products";
import Filter from "./components/Filter/Filter";

function App() {
  const [products, setProducts] = useState(data)
 
  return (
    <div className="layout">
       <Header />
      <main>
        <div className="wrapper">
          <Products products={products} />
          <Filter />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
