import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';
import NewPet from './newPet';
import imgs from '../../images/index.js'
import { EDIT_INV } from '../../utils/mutations';
import './profile.css'


const Profile = () => {
    const { loading, data } = useQuery(QUERY_USER);
    const userData = data?.me || {};
    const [inv, setInv] = useState({
        coins: 0,
        food1: 0,
        food2: 0,
        food3: 0,
    })
    const [sprite, setSprite] = useState('cat')
    let petData
    // console.log(userData.pets[0].petType)

    const [editInv, { error }] = useMutation(EDIT_INV)

    useEffect(() => {
        if (userData.inventory) {
            setInv({
                coins: userData.inventory.coins,
                food1: userData.inventory.food1,
                food2: userData.inventory.food2,
                food3: userData.inventory.food3
            })
        }
        if (!userData.pets) {
            return
        }
        if (userData.pets.length === 0) {
            return
        }
        if (userData.pets[0].petType === 'fox') {
            //   setSprite(userData.pets[0].petType)
            setSprite('fox')
        }
        if (userData.pets[0].petType === 'rabbit') {
            // setSprite(userData.pets[0].petType)
            setSprite('rabbit')
        }
        if (userData.pets[0].petType === 'cat') {
            // setSprite(userData.pets[0].petType)
            setSprite('cat')
        }
    }, [data])

    if (loading) {
        return <h2>LOADING...</h2>;
    } else {
        if (userData.pets.length !== 0) {
            petData = userData.pets[0]
        }
        //  console.log(userData.pets[0].petType)
    }



    const hasNoPet = () => {
        return (userData.pets.length === 0)
    }

    const handleFood = async (food) => {
        if (inv[food] === 0) {
            // make a way to show that you do not have food
            return
        } else {
            const newFoodVal = inv[food] - 1
            setInv({ ...inv, [food]: newFoodVal })

            const token = Auth.loggedIn() ? Auth.getToken() : null;

            if (!token) {
                return false
            }

            // find a way to delay until state is updated
            try {
                const { data } = await editInv({
                    variables: {
                        invData: { ...inv }
                    }
                })
                console.log(data)
            } catch (err) {
                console.error(err)
            }
        }

    }

    console.log(userData)
    return (
        <main>
            <div>
                <button onClick={() => console.log(userData.pets)}>HERE</button>
            </div>
            {hasNoPet() ? (
                <NewPet />
            ) : (
                <div className="profileContainer">
                    <div className="petContainer2">
                    <img id="profilePet" src={imgs[sprite]} alt="your-pet" />
                    </div>
                    <div className="petInfo">
                    <p>Name:{petData.petName}</p>
                    <p>Experience:{petData.experience}</p>
                    <p>Level:{petData.level} </p>
                    </div>
                    <div className="inventoryInfo">
                    <p>Coins:{inv.coins}</p>
                    <p>FOOD1:{inv.food1}</p>
                    <p>FOOD2:{inv.food2}</p>
                    <p>food3:{inv.food3}</p>
                    {/* BTN TO FEED FOOD */}
                    {/* MAP OF INVENTORY FOR FOOD? */}
                    <div className='myInv'>
                        <button onClick={() => handleFood('food1')}>USE food1</button>
                        <button onClick={() => handleFood('food2')}>USE food2</button>
                        <button onClick={() => handleFood('food3')}>USE food3</button>
                    </div>
                    </div>
                </div>

            )}

        </main>
    );
};

export default Profile;


// IF NO PET, CHOOSE BETWEEN 3 PET DEFAULTS *DONE

// ESSENTIALLY THIS WILL BE THE PET PAGE
// SHOW EXPERIENCE / LEVEL / HAPPINESS LEVEL?
// CAN FEED FOOD HERE - CHANGES HAPPINESS LEVEL / EXPERIENCE LEVEL?
