import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import auth from '../../utils/auth';
import NewPet from './newPet';
import imgs from '../../images/index.js'


const Profile = () => {
    const { loading, data } = useQuery(QUERY_USER);
    const userData = data?.me || {};
    const [ sprite, setSprite ] = useState ('cat')
    let petData
   // console.log(userData.pets[0].petType)

   useEffect(() => {
    if (!userData.pets){
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
},[data])

    if (loading) {
        return <h2>LOADING...</h2>;
    } else {
        if(userData.pets.length !== 0) {
            petData = userData.pets[0]
            console.log(petData)
        }
      //  console.log(userData.pets[0].petType)
    }


 
    const hasNoPet = () => {
        return (userData.pets.length === 0)
    }


    return (
        <main>
            <div>
                <button onClick={() => console.log(userData.pets)}>HERE</button>
            </div>
            {hasNoPet() ? (
                <NewPet />
            ) : (
                <div>
                    <img src={imgs[sprite]} />
                    <p>Name:{petData.petName}</p>
                    <p>Experience:{petData.experience}</p>
                    <p>Level:{petData.level} </p>
                    {/* BTN TO FEED FOOD */}
                    {/* MAP OF INVENTORY FOR FOOD? */}
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
