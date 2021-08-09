import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { EDIT_INV, ADD_HAP, UPDATE_LVL } from '../../utils/mutations';
import Auth from '../../utils/auth';
import NewPet from './newPet';
import imgs from '../../images/index.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './profile.css'

// profile page
const Profile = () => {
    const { loading, data } = useQuery(QUERY_USER,
        {
            fetchPolicy: "network-only"
        });
    let userData = data?.me || {};
    // state to track inventory
    const [inv, setInv] = useState({
        coins: 0,
        food1: 0,
        food2: 0,
        food3: 0,
    })
    // state to track happiness
    const [happiness, setHappiness] = useState(0)
    // state to track sprite
    const [sprite, setSprite] = useState('cat')
    // state for experience
    const [experience, setExperience] = useState({exp: 0, level: 0})


    let petData

    const [editInv] = useMutation(EDIT_INV)
    const [addHap] = useMutation(ADD_HAP)
    const [updateLvl] = useMutation(UPDATE_LVL)

    // on load, set states
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
            setSprite('fox')
        }
        if (userData.pets[0].petType === 'rabbit') {
            setSprite('rabbit')
        }
        if (userData.pets[0].petType === 'cat') {
            setSprite('cat')
        }
        if ( userData.pets[0].experience > userData.pets[0].level * 50){
            levelUp(userData.pets[0].level+1)
        }
        setHappiness(userData.pets[0].happiness)
        setExperience({exp: userData.pets[0].experience, 
            level: userData.pets[0].level})
    }, [data])

    if (loading) {
        return <h2>LOADING...</h2>;
    } else {
        if (userData.pets.length !== 0) {
            petData = userData.pets[0]
        }
    }


    // if user has no pet, render newpet page
    const hasNoPet = () => {
        return (userData.pets.length === 0)
    }

    const handleFood = async (food) => {
        // if no food, cant do anything
        if (inv[food] === 0) {
            return
        } else {
            // subtract from inv state
            const newFoodVal = inv[food] - 1
            const newInv = ({ ...inv, [food]: newFoodVal })
            // happiness value to increase based on food
            let hapVar
            switch (food) {
                case 'food1':
                    hapVar = 3;
                    break;
                case 'food2':
                    hapVar = 5;
                    break;
                case 'food3':
                    hapVar = 10;
                    break;
                default:
                    break;

            }

            const token = Auth.loggedIn() ? Auth.getToken() : null;

            if (!token) {
                return false
            }

            try {
                const { data } = await editInv({
                    variables: {
                        invData: { ...newInv }
                    }
                })
                const hap = await addHap({
                    variables: {
                        hapValue: hapVar
                    }
                })
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

    const levelUp = async (newLevel) => {
        try {
            const { data } = await updateLvl({
                variables: {
                    petExp: 0,
                    petLvl: newLevel
                }
            })
            console.log(data)
            setExperience({exp: data.updateLvl.pets[0].experience, 
                level: data.updateLvl.pets[0].level})
            
        } catch (err) {
            console.error(err)
        }

    }

    const petStatus = (hover) => {
        const hoverStatus = document.querySelector('#petStatus');
        if (hover) {
            hoverStatus.removeAttribute('hidden');
        }
        else {
            hoverStatus.hidden = true;
        }
    }

//trying to get keyframes working using styled-components

//this was ultimately unsuccessful as keyframes and React seem to be hard to get working together and we were under a time crunch

// const spriteBounce = keyframes`
//     from {background-position-x: 0px;}
//       to {background-position-x: -1600px;}`;
      

// const Bouncy = styled.div`
//   display: block;
//   background-image: ${imgs[sprite]};
//   background-repeat: no-repeat;
//   background-position: -1600px -1px; 
//   animation: ${spriteBounce} 1s steps(11) infinite;
//   height: 128px;
//   width: 128px;`


    return (
        <main>
            {hasNoPet() ? (
                <NewPet />
            ) : (
                <div className="profileContainer">
                    <div className="petContainer2 petContainerHover">
                    <img id="petStatus" src={imgs.happy} alt="pet-status" hidden/>
                    <img id="profilePet" src={imgs[sprite]} alt="your-pet" onMouseOver={() => petStatus(true)} onMouseLeave={() => petStatus(false)}/>
                    <img id="bush" src={imgs.bush} alt="bush" />
                    <img id="tree" src={imgs.tree} alt="tree" />
                    <img id="boulders" src={imgs.boulders} alt="boulders" />
                    </div>
                    <div className="card profileInfoBoxes">
                        <div className="card-header">
                            <h4>About Your Pet</h4>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{petData.petName}</h5>
                            <p className="card-text">Experience: {experience.exp} </p>
                            <p className="card-text">Level: {experience.level} </p>
                            <p className="card-text">Happiness: {happiness} </p>
                        </div>
                    </div>

                    <div className="card profileInfoBoxes">
                        <div className="card-header">
                            <h4>Inventory</h4>
                        </div>
                        <div className="card-body">
                            <p className="card-text">Coins: {inv.coins}</p>
                            <p className="card-text">Oranges: {inv.food1}</p>
                            <p className="card-text">Cherries: {inv.food2}</p>
                            <p className="card-text">Watermelons: {inv.food3}</p>
                            <button className="btn-sm btn-food" onClick={() => handleFood('food1')}>Feed Oranges</button>
                            <button className="btn-sm btn-food" onClick={() => handleFood('food2')}>Feed Cherries</button>
                            <button className="btn-sm btn-food" onClick={() => handleFood('food3')}>Feed Watermelon</button>
                        </div>
                    </div>
                </div>

            )}

        </main>
    );
};

export default Profile;
