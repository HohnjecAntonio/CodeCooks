import React from 'react'
import {Card, Grid} from "@mui/material";
import Login from './Login'
import Registration from "./Registration";
import HomePage from "./HomePage/HomePage";
import {Switch, Route} from "react-router-dom";
import * as PropTypes from "prop-types";

function Routes(props) {
    return null;
}

Routes.propTypes = {children: PropTypes.node};
const Authentication = () => {
    return (
        <div>
            <Grid container>
                <Grid className='h-screen overflow-hidden' item xs={5}>
                    <img className='h-full w-full' src="https://images.unsplash.com/photo-1616169776580-c86189ee67b8?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={"sd"}/>
                </Grid>
                <Grid item xs={5}>

                    <div className='px-20 flex flex-col justify-center h-full'>
                        <Card className='card p-8'>
                            <div className='flex flex-col items-center mb-5 space-y-1'>
                                <h1 className='logo text-center'>Uđi u svijet kulinarstva</h1>
                                <p className='text-center text-sm w-[70&]'>CookBooked</p>
                            </div>
                        </Card>
                        <Switch>
                            <Route path='/' element={<Login />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Registration />} />
                        </Switch>
                    </div>


                </Grid>
            </Grid>

        </div>
    )
}

export default Authentication