import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { EDIT_INV, ADD_HAP } from '../../utils/mutations';
import styled, { keyframes } from "styled-components"
import Auth from '../../utils/auth';
import NewPet from './newPet';
import imgs from '../../images/index.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './profile.css'

const Profile = () => {
    const { loading, data } = useQuery(QUERY_USER,
     { fetchPolicy: "network-only" 
    });
    let userData = data?.me || {};
    const [inv, setInv] = useState({
        coins: 0,
        food1: 0,
        food2: 0,
        food3: 0,
    })
    const [happiness, setHappiness] = useState(0)
    const [sprite, setSprite] = useState('cat')
    let petData


    const [editInv, { error }] = useMutation(EDIT_INV)
    const [addHap] = useMutation(ADD_HAP)

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
            setSprite('foxSprites')
        }
        if (userData.pets[0].petType === 'rabbit') {
            setSprite('rabbitSprites')
        }
        if (userData.pets[0].petType === 'cat') {
            setSprite('catSprites')
        }
                    setHappiness(userData.pets[0].happiness)
    }, [data])

    if (loading) {
        return <h2>LOADING...</h2>;
    } else {
        if (userData.pets.length !== 0) {
            petData = userData.pets[0]

        }
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
            const dataToInput = { ...inv, [food]: newFoodVal }
            let newHapValue = 0

            switch (food) {
                case "food1":
                    newHapValue = 3
                    break;
                case "food2":
                    newHapValue = 5
                    break;
                case "food3":
                    newHapValue = 7
                    break;
            }

            const token = Auth.loggedIn() ? Auth.getToken() : null;

            if (!token) {
                return false
            }

            // find a way to delay until state is updated
            try {
                const { data } = await editInv({
                    variables: {
                        invData: { ...dataToInput }
                    }
                })

                const hap = await addHap({
                    variables: {
                        hapValue: newHapValue
                    }
                })
                // console.log(data.mutateInv)
                setInv({
                    coins: data.mutateInv.inventory.coins,
                    food1: data.mutateInv.inventory.food1,
                    food2: data.mutateInv.inventory.food2,
                    food3: data.mutateInv.inventory.food3
                })
                setHappiness(hap.data.addHappiness.pets[0].happiness)
            } catch (err) {
                console.error(err)
            }

        }

    }

    const spriteBounce = keyframes`
    from {background-position-x: 0px;}
      to {background-position-x: -1600px;}`;
      

const Bouncy = styled.img`
  display: inline-block;
  animation: ${spriteBounce} 1s steps(11) infinite;
`;

      
//     {

//       animation: playX ,


//     #profilePet {
//         width: 128px;
//         height: 128px;
//     }
// }




    return (
        <main>
            {/* <div>
                <button onClick={() => console.log(userData.pets[0])}>HERE</button>
            </div> */}
            {hasNoPet() ? (
                <NewPet />
            ) : (
                <div className="profileContainer">
                    <div className="petContainer2">
                    <spriteBounce><img id="profilePet" src={imgs[sprite]} alt="your-pet" /></spriteBounce>
                    </div>
                    
                    <div className="card profileInfoBoxes">
                    <div className="card-header">
                     <h4>About Your Pet</h4>
                    </div>
                    <div className="card-body">
                    <h5 className="card-title">{petData.petName}</h5>
                    <p className="card-text">Experience: {petData.experience} </p>
                    <p className="card-text">Level: {petData.level} </p>
                    <p className="card-text">Happiness: {happiness} </p>
                    </div>
                    </div>

                    <div className="card profileInfoBoxes">
                    <div className="card-header">
                    <h4>Inventory</h4>
                    </div>
                    <div className="card-body">
                    <p className="card-text">Coins: {inv.coins}</p>
                    <p className="card-text">FOOD1: {inv.food1}</p>
                    <p className="card-text">FOOD2: {inv.food2}</p>
                    <p className="card-text">food3: {inv.food3}</p>
                    {/* BTN TO FEED FOOD */}
                    {/* MAP OF INVENTORY FOR FOOD? */}
                    <button className="btn-sm btn-food" onClick={() => handleFood('food1')}>USE food1</button>
                    <button className="btn-sm btn-food" onClick={() => handleFood('food2')}>USE food2</button>
                    <button className="btn-sm btn-food" onClick={() => handleFood('food3')}>USE food3</button>
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
