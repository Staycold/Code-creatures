import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { EDIT_INV } from '../../utils/mutations'
import Auth from '../../utils/auth'
import imgs from '../../images'
import './store.css'

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

    const { loading, data } = useQuery(QUERY_USER, { fetchPolicy: "network-only" });
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
        setStoreCart({ ...storeCart, [item]: newItemValue })
        setInvState({ ...invState, coins: newCoinValue })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newFood1Value = invState.food1 + storeCart.food1
        const newFood2Value = invState.food2 + storeCart.food2
        const newFood3Value = invState.food3 + storeCart.food3
        setInvState({ ...invState, food1: newFood1Value, food2: newFood2Value, food3: newFood3Value })
        setShowConfirm(true)
    }

    const handleConfirm = async (event) => {
        event.preventDefault();
        console.log(invState)
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false
        }

        try {
            const { data } = await editInv({
                variables: {
                    invData: { ...invState }
                }
            })
            console.log(data.mutateInv.inventory.coins)
            window.location.replace('/store')
        } catch (err) {
            console.error(err)
        }
    }

    const changeShopkeep = (event, newSrc) => {
        event.target.src = imgs[newSrc]
    }

    return (
        <div className="store">
            <div className="spacer">'</div>
            <div className="storekeeper">
                <img src={imgs.shopkeep1} onMouseOver={(event) => changeShopkeep(event, 'shopkeep2')} onMouseLeave={(event) => changeShopkeep(event, 'shopkeep1')} />
                {!showConfirm ?
                    (
                        <p className="shopkeepDialogue">Welcome, click on the item to add it to your cart!</p>
                    )
                    :
                    (
                        <p className="shopkeepDialogue">Ready to checkout?</p>
                    )}

            </div>
            <div className="cart">
                <h3>CART:</h3>
                <p>Coins: {invState.coins} </p>
                <p>Oranges: {storeCart.food1} </p>
                <p>Cherries: {storeCart.food2} </p>
                <p>Watermelons: {storeCart.food3} </p>
                {showConfirm ?
                    (
                        <button onClick={handleConfirm}>CONFIRM</button>
                    )
                    :
                    (
                        <button onClick={handleSubmit}>CHECKOUT</button>
                    )}
            </div>
            <div className="storeBoard">
                <div className="storeOptions">
                    <div className="storeItem" onClick={(event) => handleStoreClick(event, "food1", 3)}>
                        <img src={imgs.orange} />
                        <p>Orange</p>
                    </div>
                    <div className="storeItem" onClick={(event) => handleStoreClick(event, "food2", 5)}>
                        <img src={imgs.cherry} />
                        <p>Cherry</p>
                    </div>
                    <div className="storeItem" onClick={(event) => handleStoreClick(event, "food3", 7)}>
                        <img src={imgs.watermelon} />
                        <p>Watermelon</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Storefront