import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {editComment,deleteComment} from '../../redux/auth/auth.action.js';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import './Komentar.css'; 


import { ReactComponent as PencilIcon } from '../../icons/recipePage/pencil-solid.svg';
import { ReactComponent as TrashIcon } from '../../icons/recipePage/trash-solid.svg';

function Komentar(props){
    const dispatch = useDispatch();
    const userProfileInfo = useSelector(state => state.auth.userProfile);
    const [urediKomentar,setUrediKomentar] = useState(false);

    const deleteCommentFunction = async (idKomentar, idKorisnik, idRecept) => {
        await dispatch(deleteComment({ data: {
                idKomentar: idKomentar,
                idKorisnik: idKorisnik,
                idRecept: idRecept
            } })).then(() => {
            //history.push('/');
            window.location.reload();
        });
    };

    return(
        <div class="komentar">
        {
            urediKomentar ?
            <Formik enableReinitialize="true" initialValues={
                {
                    idKomentar: props.komentarId || '',
                    idKorisnik: props.komentarKorisnikId || '',
                    idRecept: props.recipeId || '',
                    opisKomentar:  props.komentarTekst || ''
                }
            } onSubmit={
                async (values)=>{
                    setUrediKomentar(false)
                    console.log('handle submit ', values);
                    await dispatch(editComment({ data: values })).then(() => {
                        //history.push('/');
                        window.location.reload();
                    });
                }}>
                <Form>
                    <h1>Uredi komentar:</h1>
                    <Field
                        type="hidden"
                        id="idKomentar"
                        name="idKomentar"
                    />

                    <Field
                        type="hidden"
                        id="idKorisnik"
                        name="idKorisnik"
                    />

                    <Field
                        type="hidden"
                        id="idRecept"
                        name="idRecept"
                    />

                    <Field
                        component="textarea"
                        type="text"
                        id="opisKomentar"
                        name="opisKomentar"
                    />

                    <button className='recipe-button' type="submit">Spremi komentar</button>

                </Form>
            </Formik>
            :
            <div className="comment-box">
                {
                    props.komentarKorisnikId == userProfileInfo.idKorisnik || userProfileInfo.razinaOvlasti == "Admin"
                        ?
                        <div class="recipe-buttons-flex-comment">
                            <button className='recipe-icon-button-comment' onClick={()=> setUrediKomentar(true) }><PencilIcon/></button>
                            <button className='recipe-icon-button-comment' onClick={() => deleteCommentFunction(props.komentarId,props.komentarKorisnikId,props.recipeId)}><TrashIcon/></button>
                        </div>
                        :
                        null
                }
                <p ><span class="comment-top-row">{props.komentarKorisnikIme}            </span>         <span class="comment-date">{props.komentarDatum}</span>
                
                
                </p>
                <p class="comment-bottom-row">{props.komentarTekst}</p>
                
            </div>
        }
        </div>
    );
}

export default Komentar;