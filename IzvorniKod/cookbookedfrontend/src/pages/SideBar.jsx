import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKategorije,fetchUserProfile } from '../redux/auth/auth.action.js';
import { CSSTransition } from 'react-transition-group';
import "./SideBar.css"

import { ReactComponent as CatIcon} from '../icons/cat.svg';
import { ReactComponent as AlienIcon} from '../icons/alien.svg';
import { ReactComponent as SpaceShuttleIcon} from '../icons/space-shuttle.svg';
import { ReactComponent as SpaceStationIcon} from '../icons/space-station-moon-alt.svg';

import { ReactComponent as BellIcon } from '../icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';
import { ReactComponent as CogIcon } from '../icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../icons/bolt.svg';

import * as AuthService from "../redux/auth/auth.action";
import {NavLink} from "react-router-dom";


function SideBar(props){
  
  const dispatch = useDispatch();

  const userProfileInfo = useSelector(state => state.auth.userProfile);
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const categories = useSelector(state => state.auth.kategorije); // Adjust path according to your store structure
  
  useEffect(() => {
    
      dispatch(fetchKategorije());
}, [dispatch]);


useEffect(() => {
  if(props.currentUser)
    dispatch(fetchUserProfile());
}, [dispatch]);


  function calcHeight(el){
    const heigth = el.offsetHeight;
    setMenuHeight(heigth);
  }

  const logOut = () => {
    AuthService.logoutUser();
};
 

  return (
    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="logo">
          <a href="#" class="nav-link">
            <span class="link-text logo-text">Cookbooked</span>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="angle-double-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              class="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
            >
              <g class="fa-group">
                <path
                  fill="currentColor"
                  d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                  class="fa-secondary"
                ></path>
                <path
                  fill="currentColor"
                  d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                  class="fa-primary"
                ></path>
              </g>
            </svg>
          </a>
        </li>

        <CSSTransition in={activeMenu === 'main'} 
        unmountOnExit 
        timeout={500} 
        classNames="menu-primary"
        onEnter={calcHeight}
        >
          <div className='menu'>

            <NavItem
              leftIcon={<CatIcon/>}
              text ="Home"
              link= "/">
            </NavItem>

            {props.currentUser ? (
                <NavItem
                    leftIcon={<SpaceShuttleIcon/>}
                    text ="Profil"
                    link= "/Profile"
                    openProfile = "true">
                </NavItem>
            ) : (
                <div className="hidden">
                </div>
            )}

            {props.currentUser ? (
                <NavItem
                    leftIcon={<CatIcon/>}
                    text ="Dodaj recept"
                    link= "/AddRecipe">
                </NavItem>
            ) : (
                <div className="hidden">
                </div>
            )}

            {props.currentUser ? (
              <NavItem
                  leftIcon={<CatIcon/>}
                  text ="Spremljeni recepti"
                  link= "/SpremljeniRecepti">
              </NavItem>
              ) : (
              <div className="hidden">
              </div>
            )}

            <NavItem
              leftIcon={<SpaceStationIcon/>}
              rightIcon={<CaretIcon/>}
              text ="Kategorije"
              link= "#"
              goToMenu="categories">
            </NavItem>

            
            

            {props.currentUser ? (
              <NavItem
                  leftIcon={<CatIcon/>}
                  text ="Logout"
                  link= "/signin"
                  logout="true"
                  >
                  
              </NavItem>
              ) : (
              <div className="hidden">
              </div>
            )}

            <NavItem
              leftIcon={<AlienIcon/>}
              text ="Atributions"
              link= "/Atributions">
            </NavItem>

          </div>


        </CSSTransition>


        <CSSTransition in={activeMenu === 'categories'} 
        unmountOnExit 
        timeout={500} 
        classNames="menu-secondary"
        onEnter={calcHeight}
        >
          <div className='menu' style={{height:menuHeight}}>
            <NavItem
              leftIcon={<ArrowIcon/>}
              text ="Back"
              link= "#"
              goToMenu="main"
              >
            </NavItem>
            {categories.map((category) => (
              
              <NavItem
                categoryId={category.idKategorija}
                leftIcon={<AlienIcon />}
                text={category.nazivKategorija}
                link="/Categories"
                openCategory = "true"
              />
            ))}
            
          </div>

          
        </CSSTransition>
      </ul>
    </nav>
  );

  function NavItem(props){
    return(
          <li class="nav-item">
            <a href={props.link} class="nav-link" onClick={() => {(props.goToMenu && setActiveMenu(props.goToMenu))
            || (props.openProfile && localStorage.setItem('profileToLoad', JSON.stringify(userProfileInfo.korisnickoIme)))
            || (props.openCategory && localStorage.setItem('categoryToLoad', JSON.stringify(props.categoryId)))
            || (props.logout && logOut())
            }}>
              <span className="icon-button">{props.leftIcon}</span>
              <span class="link-text">{props.text}</span>
              <span className="icon-right">{props.rightIcon}</span>
            </a>
          </li>
          );
  }

};





export default SideBar;
