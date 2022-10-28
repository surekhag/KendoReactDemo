import React, { useState } from "react";
import ProductDetailsPdfExports from "./ProductDetailsPdfExports"
import SharedButtons from "../SharedComps/SharedButtons"
const Products = () => {
    const [isDisplayed, setIsDisplayed] = useState(true);


    const HandleShowClick = () => {
        setIsDisplayed(true);
    }
    const HandleHideClick = () => {
        setIsDisplayed(false);
    }

    return (<>
        
        {isDisplayed && <>
            <ProductDetailsPdfExports />
            
        </>}
    </>)
}
export default Products;