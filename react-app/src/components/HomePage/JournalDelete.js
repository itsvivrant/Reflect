import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'
import {allJournals, deleteSingleJournal } from '../../store/journal';
import {Modal} from '../../context/Modal'

import './Home.css'

function JournalDelete({journal, setRenderPage}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [deleteRender, setRenderDelete] = useState(false)
    const [showModal, setShowModal] = useState('')

    useEffect(() => {
        dispatch(allJournals())
    }, [dispatch, journal.id, deleteRender])

    const handleDelete = async(e) => {
        e.preventDefault()
        await dispatch(deleteSingleJournal(journal.id))
        setShowModal(false)
        setRenderDelete(true)
        setRenderPage(true)

    }

    const deleteJournalModal = (

            <div className="delete-journal-box">
                <h3>Your journal, {`"${journal.title}"`}, will be deleted. Do you want to continue?</h3>
                <div className='delete-buttons'>
                    <button className='cancel-delete' onClick={() => setShowModal(false)}>Cancel</button>
                    <button className='confirm-delete'onClick={handleDelete} >Delete</button>
                </div>
            </div>

    )

    return (
        <>
        <i className="fas fa-trash" onClick={() => setShowModal(true)}></i>
        {showModal && (
            <Modal>
                {deleteJournalModal}
            </Modal>
        )}
        </>

    )

}

export default JournalDelete
