import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKategorije } from '../../redux/auth/auth.action.js'; // Import the action
import './HomePage.css'; // You can create a separate CSS file for styling
import {fetchRecipesForUserFeed} from "../../redux/auth/auth.action";
import Loading from "../Components/Loading";
import {lazy, Suspense} from 'react';


const HomePage = () => {
    const dispatch = useDispatch();
    const kategorije = useSelector(state => state.auth.kategorije);
    const userProfileInfo = useSelector(state => state.auth.userProfile);
    const Recepti = lazy(() => delayForDemo(import('../Components/Recepti.js')));

    useEffect(() => {
        dispatch(fetchKategorije());
    }, []);

    return (
        <div className='px-20'>
            <div className={'header'}>
                <h1>Recent Recipes</h1>
                {/*{kategorije.map((category) => (*/}
                {/*    <NavItem*/}
                {/*        categoryId={category.idKategorija}*/}
                {/*        text={category.nazivKategorija}*/}
                {/*        link="/"*/}
                {/*        openCategory = "true"*/}
                {/*    />*/}
                {/*))}*/}
                <div className={'categories'}>
                    {kategorije.map(kategorija => (
                        <a href = "/" key={kategorija.idKategorija}
                            onClick={localStorage.setItem('kategorijaLoad', JSON.stringify(kategorija.idKategorija))}>
                            <span>{kategorija.nazivKategorija}</span>
                        </a>
                    ))}
                </div>
            </div>
            <div className="recipe-page">
                <Suspense fallback={<Loading item={'Recipes'}/>}>
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

function NavItem(props){
    return(
        <li className={props.className}>
            <a href={props.link} onClick={() => {
                (props.openCategory && localStorage.setItem('kategorijaLoad', JSON.stringify(props.categoryId)))
            }}>
                <span>{props.text}</span>
            </a>
        </li>
    );
}

export default HomePage;
