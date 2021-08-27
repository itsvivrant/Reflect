import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { NavLink, Link, useHistory} from 'react-router-dom';
import { createJournal, allJournals} from '../../../store/journal';

function JournalForm() {
    const sessionUser = useSelector((state) => state.session.user)

    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [coverUrl, setCoverUrl] = useState('')
    const [render, setRender] = useState(false)

    const updateTitle = (e) => setTitle(e.target.value)
    const updateCoverUrl = (e) => setCoverUrl(e.target.value)

    useEffect(() => {
        dispatch(allJournals())
    },[dispatch, sessionUser.id, render])


    const journal = async(e) => {
        e.preventDefault()
        await dispatch(createJournal(title, coverUrl))
        setRender(true)
        history.push('/')
    }



    return (
        <form onSubmit={journal} >
            <input placeholder='title'
                    value={title}
                    type='text'
                    onChange={updateTitle}>

            </input>
            <input placeholder='coverUrl'
                    value={coverUrl}
                    type='text'
                    onChange={updateCoverUrl}>

            </input>
            <button type='submit' >Sumbit</button>
        </form>
    )


}


export default JournalForm;
