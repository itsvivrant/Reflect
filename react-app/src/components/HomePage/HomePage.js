import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { NavLink, Link} from 'react-router-dom';
import { allJournals } from '../../store/journal';
import SplashPage from './SplashPage/SplashPage'
import JournalForm from './JournalForm/JournalForm'

import './HomePage.css'

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const journals = useSelector((state) => state.journal)

    console.log('CONSOLE LOG', journals)

    useEffect(() => {
        dispatch(allJournals())
    }, [dispatch])

    let main;
    if (sessionUser) {
        main = (
            <div className='home-container'>
                <div className='journal-info-container'>
                    <h1>Journal Info</h1>
                </div>

                <div className='journal-show-container'>
                {journals?.journals?.map((journal) => (
                    <>
                        <div className='testing-div'>

                                <Link className='entries-link' to={`/journals/${journal.id}/entries`}>
                                    <div className='each-journal'>
                                        <img className='cover-img' src={journal.coverUrl} />
                                        <div className='journal-edit-trash'>
                                            <div className='journal-form-icon'>
                                                <i className="fas fa-info-circle"></i>
                                            </div>
                                            <div className='journal-trash-icon'>
                                                <i className="fas fa-trash"></i>
                                            </div>
                                        </div>
                                    </div>
                                </Link>


                            </div>



                    </>
                    ))}
                </div>
                <JournalForm />
            </div>

        )
    } else {
        main = (
            <SplashPage />
        )
    }
    return(
        <>
        {main}
        </>

    )


}

export default HomePage;
