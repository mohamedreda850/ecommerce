import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react';
import { authContext } from './AuthContext';


export const wishListContext = createContext();
const WishListContextProvider = ({children}) => {
    const [ToggledItem, setToggledItem] = useState(false);
  const [products, setproducts] = useState([])
  const { token } = useContext(authContext);
 
 async function handelClick(id) {
    const isCurrentlyToggled = ToggledItem[id]

    if (isCurrentlyToggled){
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers : {
                token : localStorage.getItem('tkn')
            }
        }).then(response =>{
            console.log(`Item ${id} removed:` , response);
            setToggledItem((prevState)=>({
                ...prevState,
                [id] :!prevState[id]
            }))
            getUserWishList()

            setproducts(prevProducts => prevProducts.filter(product => product._id !== id));
        }).catch(error =>{
            console.log('error removing item ' ,error);
            
        })
    }else{
        await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            productId : id  
        },{
            headers : {
                token : localStorage.getItem('tkn')
            }
        }).then(response =>{
            console.log(`Item ${id} adding:`, response);
            setToggledItem((prevState)=>({
                ...prevState,
                [id] :!prevState[id]
            }))
            getUserWishList()
            setproducts(prevProducts => [...prevProducts, response.data.data]);
        }).catch(error =>{
            console.log('error adding item ' ,error);
            
        })
    }
 }

 async function getUserWishList() {
    try {
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` ,{
            headers : {
                token : localStorage.getItem('tkn')
            }
        })
        
        const toggledState = [];
        data.data.forEach(itemId => {
            toggledState[itemId.id] = true;
            setproducts(data.data)
        });
        
        setToggledItem(toggledState);
    } catch (error) {
        console.error("Error fetching wishlist data:", error);
    }
   
 }




  useEffect(() =>{
    if(token != null){
         getUserWishList()
    }
 } ,[token])
  return (
    <wishListContext.Provider value={{ToggledItem , setToggledItem , handelClick , products ,getUserWishList}}>
        {children}
    </wishListContext.Provider>
  )
}

export default WishListContextProvider