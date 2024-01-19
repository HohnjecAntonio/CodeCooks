import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchRecipesForUserFeed,fetchUserProfile} from "../../redux/auth/auth.action";
import './SpremljeniRecepti.css'; // You can create a separate CSS file for styling
import {lazy, Suspense} from "react";
import Loading from "../Components/Loading";
import '../HomePage/HomePage.css'; 

const SpremljeniRecepti = () => {
    const Recepti = lazy(() => delayForDemo(import('../Components/DohvacanjeSpremljenihRecepata.js')));


    return (
        <div className='px-20'>
            <div className='homepage-info'>
            <h1 className='homepage-title'>Spremljeni recepti</h1>
                <div className={'opis'}>
                    <p>Ovdje možete pregledati vaše spremljene recepte.</p>
                </div>
            </div>
            <div className="recipe-page">
                

                <Suspense fallback={<Loading item={'recepata'}/>}>
                    <Recepti/>
                </Suspense>
            </div>
      
            
        </div>
    );
};

function delayForDemo(promise) {
    return new Promise(resolve => {
        setTimeout(resolve, 1000);
    }).then(() => promise);
}

export default SpremljeniRecepti;
