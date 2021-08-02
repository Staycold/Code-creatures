import React, { useState } from 'react'
import Auth from '../../utils/auth'
import { useMutation } from '@apollo/client';
import { ADD_PET } from '../../utils/mutations';
import imgs from '../../images/index.js';

const NewPet = () => {
    const [showPetModal, setShowPetModal] = useState(false);
    const [newPetData, setNewPetData] = useState({
        petName: '',
        petType: '',
    })

    const [addPet, { error }] = useMutation(ADD_PET)

    const choosePet = (arg) => {
        setShowPetModal(true);
        setNewPetData({ ...newPetData, petType: arg })
    }

    const exitModal = () => {
        setShowPetModal(false);
        setNewPetData({ ...newPetData, petType: '' })
    }

    const handlePetChange = (event) => {
        const { name, value } = event.target;
        setNewPetData({ ...newPetData, [name]: value })
    }

    const handlePetFormSubmit = async (event) => {
        event.preventDefault();
        const petToSave = {
            petName: newPetData.petName,
            petType: newPetData.petType,
            experience: 0,
            level: 1,
            happiness:0,
        }
        console.log(petToSave)
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        
        try {
            const { data } = await addPet({
                variables: {
                    petData: { ...petToSave }
                }
            })
            console.log(data)
            window.location.replace('/profile');
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <div>
                CHOOSE A PET
            </div>
            <div onClick={() => choosePet('cat')}>
                <img src={imgs.cat} alt='cat pet' />
                Cat
            </div>
            <div onClick={() => choosePet('fox')}>
                <img src={imgs.fox} alt='fox pet' />
                Fox
            </div>
            <div onClick={() => choosePet('rabbit')}>
                <img src={imgs.rabbit} alt='rabbit pet' />   
                Rabbit
            </div>
            <p>{newPetData.rabbit}</p>
            {showPetModal ? (
                <form>
                    <button onClick={() => exitModal()}>X</button>
                    <input
                        name="petName"
                        value={newPetData.petName}
                        onChange={handlePetChange}
                    />
                    <button onClick={handlePetFormSubmit}>SUBMIT</button>
                </form>
            ) : null}
        </div>
    )
}

export default NewPet