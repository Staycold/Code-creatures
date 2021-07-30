import React, { useEffect, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

const Storefront = () => {
    const [storeCart, setStoreCart] = useState({
        coins: 0,
        food1: 0,
        food2: 0,
        food3: 0,
    })
    const { loading, data } = useQuery(QUERY_USER);
    const userData = data?.me || {};

    useEffect(() => {
        setStoreCart({ ...storeCart, coins: userData.coins })
    }, [data])


    if (loading) {
        return <h2>LOADING</h2>
    }

    const handleStoreClick = (event, item, value) => {
        event.preventDefault();
        if (storeCart.coins < value) {
            return
        }
        const newCoinValue = storeCart.coins - value
        const newItemValue = storeCart[item] + 1
        setStoreCart({ ...storeCart, [item]: newItemValue, coins: newCoinValue })
    }

    return (
        <div>
            <div>
                AMOUNT OF COINS: {storeCart.coins} 
                AMOUNT OF FOOD: 
                FOOD1: {storeCart.food1} 
                FOOD2: {storeCart.food2} 
                FOOD3: {storeCart.food3} 
            </div>
            <div className="Store">
                <div>
                    <object onClick={(event) => handleStoreClick(event, "food1", 3)}>
                        FOOD 1
                    </object>
                </div>
                <div>
                    <object onClick={(event) => handleStoreClick(event, "food2", 5)}>
                        FOOD 2
                    </object>
                </div>
                <div>
                    <object onClick={(event) => handleStoreClick(event, "food3", 7)}>
                        FOOD 3
                    </object>
                </div>
            </div>
        </div>
    )

}

export default Storefront