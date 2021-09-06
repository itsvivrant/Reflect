import React from 'react';
import {Link} from 'react-router-dom';

import './Footer.css'

function Footer() {
    return (
        <footer className='footer-container'>

                <div className='top-content'>
                    <div className='linkedin-github'>
                        <a href='https://github.com/itsvivrant/Reflect'>
                            <i className='fab fa-github'></i>
                        </a>
                        <a href='https://www.linkedin.com/in/vivian-ngoc-che-6085a6b5/'>
                            <i className='fab fa-linkedin'></i>
                        </a>
                    </div>

                </div>
                <div className='bottom-content'>
                    <div className='reflect'>
                        <h4>Reflect</h4>
                        <Link to='/sign-up'>
                            <p>Sign Up</p></Link>
                        <Link to='/login'>
                            <p>Log In</p></Link>
                        <p>Support</p>
                    </div>
                    <div classname='journal-prompts'>
                        <h4>Journal</h4>
                    </div>
                </div>

        </footer>
    )
}

export default Footer;
