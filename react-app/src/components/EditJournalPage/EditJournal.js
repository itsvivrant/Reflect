import React, {useState, useEffect, useParmas} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useHistory} from 'react-router-dom';
import { editJournal} from '../../store/journal';
import {Modal} from '../../context/Modal'

import './EditJournal.css'

const selectCovers = [
    
]

function EditJournalForm({journal}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(journal.title || '');
    const [coverUrl, setCoverUrl] = useState(journal.coverUrl || '')
    const [showModal, setShowModal] = useState(false);
    const [updatedJournal, setUpdatedJournal] = useState(false)


    const updatedTitle = (e) => setTitle(e.target.value)
    const updatedCoverUrl = (e) => setCoverUrl(e.target.value)

    const handleSubmit = async(e) => {
        e.preventDefault()
        await dispatch(editJournal(title, coverUrl, journal.id))

    }

    return (
        <>
        <i className="fas fa-info-circle" onClick={() => setShowModal(true)}></i>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div className='journal-form-container'>
                    <div className='edit-header'>Info</div>
                    <div className='journal-info'>
                        <h1>{title}</h1>
                        <img src={coverUrl} />
                    </div>
                    <form className='journal-form-box'onSubmit={handleSubmit} >
                        <input type='text' placeholder='title' value={title} onChange={updatedTitle}></input>
                        <input type='text' placeholder='coverUrl' value={coverUrl} onChange={updatedCoverUrl}></input>
                        <button type='submit' >Submit</button>
                    </form>
                </div>

        </Modal>
        )}
        </>
    )
}

export default EditJournalForm;
