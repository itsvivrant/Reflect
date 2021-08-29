import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useHistory} from 'react-router-dom';
import { createJournal, allJournals} from '../../store/journal';
import {Modal} from '../../context/Modal'

import './JournalForm.css'

function JournalForm() {
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [coverUrl, setCoverUrl] = useState('')
    const [journalRender, setJournalRender] = useState(false)
    const [showModal, setShowModal] = useState(false);

    const newTitle = (e) => setTitle(e.target.value)
    const newCoverUrl = (e) => setCoverUrl(e.target.value)

    useEffect(() => {
        dispatch(allJournals())
    },[dispatch, sessionUser.id, journalRender])


    const journal = async(e) => {
        e.preventDefault()
        await dispatch(createJournal(title, coverUrl))
        setTitle('')
        setCoverUrl('')
        setJournalRender(true)
        history.push('/')
    }



    return (
        <>
        <i className="fas fa-plus" onClick={() => setShowModal(true)}>Journal</i>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div className='journal-form-container'>
                    <div className='edit-header'>Create Journal</div>
                    <form className='journal-form-box'onSubmit={journal} >
                        <input type='text' placeholder='title' value={title} onChange={newTitle}></input>
                        <input type='text' placeholder='coverUrl' value={coverUrl} onChange={newCoverUrl}></input>
                        <button type='submit' >Submit</button>
                    </form>
                </div>

        </Modal>
        )}
        </>
    )


}


export default JournalForm;
