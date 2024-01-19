import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKategorije, fetchRecipesForUserFeed } from '../../redux/auth/auth.action.js'; // Import the action
import './HomePage.css'; // You can create a separate CSS file for styling
import Loading from "../Components/Loading";
import {lazy, Suspense} from 'react';


const HomePage = () => {
    const dispatch = useDispatch();
    const kategorije = useSelector(state => state.auth.kategorije);
    const recipesForFeed = useSelector(state => state.auth.recipesForFeed);

    const Recepti = lazy(() => delayForDemo(import('../Components/Recepti.js')));

    useEffect(() => {
        dispatch(fetchRecipesForUserFeed());
    }, []);

    const kategorijaRecepti = recipesForFeed.filter(recipe  =>{
            if(recipe.kategorije.length>0){
                return recipe.kategorije[0].idKategorija == JSON.parse(localStorage.getItem("kategorijaLoad"))
            }
        }
    );

    useEffect(() => {
        dispatch(fetchKategorije());
    }, []);

    return (
        <div className='px-20'>
            <div className={'header'}>
                
                <div className={'categories'}>
                    {kategorije.map(kategorija => (
                        <a href = "/" key={kategorija.idKategorija}
                            onClick={()=>localStorage.setItem('kategorijaLoad', JSON.stringify(kategorija.idKategorija))}>
                            <span>{kategorija.nazivKategorija}</span>
                        </a>
                    ))}
                </div>
            </div>
            <div className='homepage-info'>
            <h1 className='homepage-title'>Najnoviji recepti</h1>
                <div className={'opis'}>
                    <p>Dobrodošli na web aplikaciju CookBooked. Mjesto gdje postoji recept za svačiji ukus.
                       Pronađite novog sebe u jednom od recepata.</p>
                </div>
            </div>
            <div className="recipe-page">
                <Suspense fallback={<Loading item={'recepata'}/>}>
                    <Recepti recepti={kategorijaRecepti}/>
                </Suspense>
            </div>
        </div>
    );
};

function delayForDemo(promise) {
    return new Promise(resolve => {
        setTimeout(resolve, 100);
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
