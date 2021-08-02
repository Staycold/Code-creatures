import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { EDIT_INV } from '../../utils/mutations'
import Auth from '../../utils/auth'

const Storefront = () => {
    const [invState, setInvState] = useState({
        coins: 0,
        food1: 0,
        food2: 0,
        food3: 0,
    })
    const [storeCart, setStoreCart] = useState({
        food1: 0,
        food2: 0,
        food3: 0,
    })
    const [showConfirm, setShowConfirm] = useState(false)

    const { loading, data } = useQuery(QUERY_USER);
    const userData = data?.me.inventory || {};

    const [editInv, { error }] = useMutation(EDIT_INV)

    useEffect(() => {
        setInvState({ 
            coins: userData.coins,
            food1: userData.food1,
            food2: userData.food2,
            food3: userData.food3
         })
    }, [data])


    if (loading) {
        return <h2>LOADING</h2>
    }

    const handleStoreClick = async (event, item, value) => {
        event.preventDefault();
        if (invState.coins < value) {
            return
        }
        const newCoinValue = invState.coins - value
        const newItemValue = storeCart[item] + 1
        setStoreCart({ ...storeCart, [item]: newItemValue})
        setInvState({ ...invState, coins: newCoinValue })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newFood1Value = invState.food1 + storeCart.food1
        const newFood2Value = invState.food2 + storeCart.food2
        const newFood3Value = invState.food3 + storeCart.food3
        setInvState({ ...invState, food1: newFood1Value, food2: newFood2Value, food3: newFood3Value})
        setShowConfirm(true)
    }

    const handleConfirm = async (event) => {
        event.preventDefault();
        console.log(invState)
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false
        }

        try {
            const { data } = await editInv({
                variables: {
                    invData: {...invState}
                }
            })
            console.log(data)
            window.location.replace('/store')
        } catch (err) {
            console.error(err)
        }

    }

    return (
        <div>
            <div>
                AMOUNT OF COINS: {invState.coins} 
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
                {showConfirm ? 
                (
                <button onClick={handleConfirm}>CONFIRM</button>
                )
                :
                (
                <button onClick={handleSubmit}>CHECKOUT</button>
                )}


            </div>
        </div>
    )

}

export default Storefront