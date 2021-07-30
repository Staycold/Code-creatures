import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import auth from '../../utils/auth';
import NewPet from './newPet';


const Profile = () => {
    const { loading, data } = useQuery(QUERY_USER);
    const userData = data?.me || {};
    let petData

    // const submitNewPet = (event) => {
    //     event.preventDefault();
    //     const petData = {
    //         name: "this is where name will go",
    //         experience: 0,
    //         level: 1,
    //         happiness: 0,
    //         sprite: event.target.dataset.sprite,
    //     }
    //     // MUTATION TO ADD PET
    //     console.log(petData)
    // }

    if (loading) {
        return <h2>LOADING...</h2>;
    } else {
        petData = userData.pets[0]
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
                    {/* IMAGE OF SPRITE THAT USES petData.sprite */}
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
