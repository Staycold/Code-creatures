import React, { useState } from 'react'
import Auth from '../../utils/auth'
import { useMutation } from '@apollo/client';
import { ADD_PET } from '../../utils/mutations';
import imgs from '../../images/index.js';
import './newpet.css'

const NewPet = () => {
    const [showPetModal, setShowPetModal] = useState(false);
    // state to track pet name and type
    const [newPetData, setNewPetData] = useState({
        petName: '',
        petType: '',
    })

    const [addPet] = useMutation(ADD_PET)

    // if they confirm on the pet they can input a new
    const choosePet = (arg) => {
        setShowPetModal(true);
        setNewPetData({ ...newPetData, petType: arg })
    }

    // // if they click on the x, they can change their pet type
    // const exitModal = () => {
    //     setShowPetModal(false);
    //     setNewPetData({ ...newPetData, petType: '' })
    // }

    const handlePetChange = (event) => {
        const { name, value } = event.target;
        setNewPetData({ ...newPetData, [name]: value })
    }

    // event handler to submit pet name and type
    const handlePetFormSubmit = async (event) => {
        event.preventDefault();
        const petToSave = {
            petName: newPetData.petName,
            petType: newPetData.petType,
            experience: 0,
            level: 1,
            happiness: 0,
        }
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await addPet({
                variables: {
                    petData: { ...petToSave }
                }
            })
            window.location.replace('/profile');
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="newpet-body">
            <h2>Choose a Pet</h2>
            <h3>Click on a pet to make it your friend!</h3>
            <div className="newpet-options">
                <div className="newpet-card" onClick={() => choosePet('cat')}>
                    <img src={imgs.cat} alt='cat pet' />
                    <p>Cat</p>
                </div>
                <div className="newpet-card" onClick={() => choosePet('fox')}>
                    <img src={imgs.fox} alt='fox pet' />
                    <p>Fox</p>
                </div>
                <div className="newpet-card" onClick={() => choosePet('rabbit')}>
                    <img src={imgs.rabbit} alt='rabbit pet' />
                    <p>Bunny</p>
                </div>
                <div className="newpet-card" onClick={() => choosePet('chick')}>
                    <img src={imgs.chick} alt='chick pet' />
                    <p>Chick</p>
                </div>
                <div className="newpet-card" onClick={() => choosePet('pig')}>
                    <img src={imgs.pig} alt='pig pet' />
                    <p>Piggy</p>
                </div>
                <div className="newpet-card" onClick={() => choosePet('mouse')}>
                    <img src={imgs.mouse} alt='mouse pet' />
                    <p>Mouse</p>
                </div>
            </div>

            <p>{newPetData.rabbit}</p>
            {showPetModal ? (
                <form className="newpet-form">
                    <p>Let's give your new friend a cool name!</p>
                    <input
                        name="petName"
                        value={newPetData.petName}
                        onChange={handlePetChange}
                    />
                    <button className='newpet-btn' onClick={handlePetFormSubmit}>SUBMIT</button>
                </form>
            ) : null}
        </div>
    )
}

export default NewPet