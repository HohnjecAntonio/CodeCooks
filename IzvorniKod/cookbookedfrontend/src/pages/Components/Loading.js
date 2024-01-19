import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../ComponentsCss/Loading.css'

function Loading(props) {

    return(
        <div className={'Loader'}>
            <p>Loading {props.item}...</p>
        </div>
    );
};

export default Loading;