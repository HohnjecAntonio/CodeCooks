import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchRecipesForUserFeed,fetchUserProfile} from "../../redux/auth/auth.action";
import './SpremljeniRecepti.css'; // You can create a separate CSS file for styling
import {lazy, Suspense} from "react";
import Loading from "../Components/Loading";


const SpremljeniRecepti = () => {
    const dispatch = useDispatch();
    const userProfileInfo = useSelector(state => state.auth.userProfile);
    const Recepti = lazy(() => delayForDemo(import('../Components/DohvacanjeSpremljenihRecepata.js')));

    useEffect(() => {
        dispatch(fetchRecipesForUserFeed());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchUserProfile());
      }, [dispatch]);

    return (
        <div className='px-20'>
                
            <div className="recipe-page">
                <h1>Spremljeni recepti</h1>

                <Suspense fallback={<Loading item={'recepata'}/>}>
                    <Recepti/>
                </Suspense>
            </div>
      
            
        </div>
    );
};

function delayForDemo(promise) {
    return new Promise(resolve => {
        setTimeout(resolve, 500);
    }).then(() => promise);
}

export default SpremljeniRecepti;
