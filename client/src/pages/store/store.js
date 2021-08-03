import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { EDIT_INV } from '../../utils/mutations'
import Auth from '../../utils/auth'
import imgs from '../../images'
import './store.css'

// store page
const Storefront = () => {
    // state to track inventory
    const [invState, setInvState] = useState({
        coins: 0,
        food1: 0,
        food2: 0,
        food3: 0,
    })
    // state to track cart
    const [storeCart, setStoreCart] = useState({
        food1: 0,
        food2: 0,
        food3: 0,
    })

    const { loading, data } = useQuery(QUERY_USER, { fetchPolicy: "network-only" });
    const userData = data?.me.inventory || {};

    const [editInv] = useMutation(EDIT_INV)

    // sets state when data loads
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

    // when they click an item, adds to cart if they have enough money
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

    // event handler to check out cart
    const handleSubmit = async (event) => {
        event.preventDefault();
        const shopDialogue = document.querySelector('#shopDialogue')
        // changes shopkeep dialogue
        if (storeCart.food1 === 0 && storeCart.food2 === 0 && storeCart.food3 === 0) {
            changeShopkeep('shopkeep4')
            shopDialogue.innerHTML='Please put something in your cart'
            return
        }

        const newFood1Value = invState.food1 + storeCart.food1
        const newFood2Value = invState.food2 + storeCart.food2
        const newFood3Value = invState.food3 + storeCart.food3
        event.preventDefault();
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false
        }

        try {
            await editInv({
                variables: {
                    invData: {
                        coins: invState.coins,
                        food1: newFood1Value,
                        food2: newFood2Value,
                        food3: newFood3Value,
                    }
                }
            })

            // sets cart state back
            setStoreCart({
                food1: 0,
                food2: 0,
                food3: 0,
            })

            // sets inventory state to match with backend
            setInvState({
                coins: invState.coins,
                food1: newFood1Value,
                food2: newFood2Value,
                food3: newFood3Value,
            })

            changeShopkeep('shopkeep3')
            shopDialogue.innerHTML="Thanks, come again soon!"
        } catch (err) {
            console.error(err)
        }

    }

    // changes shopkeep sprite
    const changeShopkeep = (newSrc) => {
        const shopkeep = document.querySelector('#shopkeep')
        shopkeep.src = imgs[newSrc]
    }

    return (
        <div className="store">
            <div className="spacer">'</div>
            <div className="storekeeper">
                <img alt="shopkeeper" id="shopkeep" src={imgs.shopkeep1} onMouseOver={() => changeShopkeep('shopkeep2')} onMouseLeave={() => changeShopkeep('shopkeep1')} />
                <p id="shopDialogue">Welcome, click on the item to add it to your cart!</p>

            </div>
            <div className="cart">
                <h3>CART:</h3>
                <p>Coins: {invState.coins} </p>
                <p>Oranges: {storeCart.food1} </p>
                <p>Cherries: {storeCart.food2} </p>
                <p>Watermelons: {storeCart.food3} </p>
                <button onClick={handleSubmit}>CHECKOUT</button>
            </div>
            <div className="storeBoard">
                <div className="storeOptions">
                    <div className="storeItem" onClick={(event) => handleStoreClick(event, "food1", 3)}>
                        <img alt='orange' src={imgs.orange} />
                        <p>Orange</p>
                    </div>
                    <div className="storeItem" onClick={(event) => handleStoreClick(event, "food2", 5)}>
                        <img alt='cherry' src={imgs.cherry} />
                        <p>Cherry</p>
                    </div>
                    <div className="storeItem" onClick={(event) => handleStoreClick(event, "food3", 7)}>
                        <img alt='watermelon' src={imgs.watermelon} />
                        <p>Watermelon</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Storefront