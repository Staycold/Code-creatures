import React, { useState } from 'react'
import Auth from '../../utils/auth'
import { useMutation } from '@apollo/client';
import { ADD_PET } from '../../utils/mutations';

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
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <div>
                CHOOSE A PET
            </div>
            <div onClick={() => choosePet('1a')}>
                PET 1
            </div>
            <div onClick={() => choosePet('2a')}>
                PET 2
            </div>
            <div onClick={() => choosePet('3a')}>
                PET 3
            </div>
            <p>{newPetData.petType}</p>
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