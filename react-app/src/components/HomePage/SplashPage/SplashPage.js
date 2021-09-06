import React, {useState} from 'react';
import { NavLink, Link, Redirect, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {login} from '../../../store/session'
import Footer from '../../Footer/Footer';

import "./SplashPage.css";

function SplashPage() {
    const dispatch = useDispatch();
    const history = useHistory()

    const demoLogin = async(e) => {
        const email = 'demo@aa.io'
        const password = 'password'
        await dispatch(login( email, password))
        history.push('/')
    }

    return (
        <>
        <div>
            <div className="div-one">
                <div className='div-one-inner'>
                    <h2 >Sanctuary for Your Mind & Soul</h2>
                    <div onClick={demoLogin} className="get-started">
                        <h3>Get Started</h3>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                    <div className='div-one-img'>
                        <img src='https://i.imgur.com/LLSxi4q.png' />
                    </div>

                </div>
            </div>
            <div className='div-two'>
                <div>
                    <h2>Meet Reflect, Your Self Care Journal</h2>
                </div>
            </div>
            <div className='div-three'>
                <div className='div-three-box'>
                    <div className='div-three-p'>
                        <h4>Join Reflect users and create a healthier, happier mind. A sanctuary for your mind and soul,
                            Reflect will help increase your positive energy, be more grateful and a calmer mind by building healthy thinkings through journaling.
                        </h4>
                        <h4>
                            We're more than just a journal, or a diary; we're your own motivational coach and happiness trainer.
                            Let's embark on a fabulous journey of self-improvement today.
                        </h4>
                    </div>
                    <div className='div-three-img'>
                        <img src='https://i.imgur.com/CjKNYYK.png' />
                    </div>
                </div>
            </div>

        </div>
        <Footer />
        </>
    )
}

export default SplashPage;
