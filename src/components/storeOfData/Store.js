
import React, { useState } from "react";

export const StoreData=React.createContext();



const Store = (props) => {
    const [items,setItems]=useState([]);

    const addItemHandler = async (newItem)=>{
        const data=await newItem
        setItems([...data]);
        console.log(items);
    };


    
    const storeValue={
        items:items,
        addItem:addItemHandler,
    }
  return (
    <StoreData.Provider value={storeValue}>
        {props.children}
    </StoreData.Provider>
  )
}

export default Store