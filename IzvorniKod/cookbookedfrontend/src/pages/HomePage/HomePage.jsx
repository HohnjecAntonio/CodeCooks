import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKategorije } from '../../redux/auth/auth.action.js'; // Import the action

const HomePage = () => {
    const dispatch = useDispatch();
    const kategorije = useSelector(state => state.auth.kategorije); // Adjust path according to your store structure
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);

    useEffect(() => {
        dispatch(fetchKategorije());
    }, [dispatch]);

    return (
        <div className='px-20'>
            <h1>This is home page visible to anyone.</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <h3 className='text-4xl mt-5 mb-3'>Kategorije</h3>
            <div>
                {kategorije.map(kategorija => (
                    <div key={kategorija.idKategorija}>
                        {kategorija.nazivKategorija}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
