import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { dohvatiKategorije } from './actions';

const CategoriesComponent = ({ kategorije, dohvatiKategorije }) => {
    useEffect(() => {
        dohvatiKategorije();
    }, [dohvatiKategorije]);

    return (
        <div>
            <ul>
                {kategorije.map((kategorija) => (
                    <NavItem>
                        <li key={kategorija.id}>{kategorija.naziv}</li>
                    </NavItem>
                ))}
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => ({
    kategorije: state.kategorije,
});

export default connect(mapStateToProps, { dohvatiKategorije })(CategoriesComponent);