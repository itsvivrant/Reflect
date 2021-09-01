import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import { editJournal} from '../../store/journal';
import {Modal} from '../../context/Modal'

import './Home.css'

const selectCovers = [
'    https://images.unsplash.com/photo-1544733422-251e532ca221?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fHBhdHRlcm58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1533122250115-6bb28e9a48c3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fHBhdHRlcm58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1554755229-ca4470e07232?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHBhdHRlcm58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1618331835717-801e976710b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
'    https://images.unsplash.com/photo-1542272201-b1ca555f8505?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
'    https://images.unsplash.com/photo-1543539748-a4bf17a68a8a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80',
'    https://images.unsplash.com/photo-1592295880235-e276a337ddf1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80',
'    https://images.unsplash.com/photo-1590593162201-f67611a18b87?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHBhdHRlcm58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1519750783826-e2420f4d687f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fHBhdHRlcm58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGF0dGVybnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1558244661-d248897f7bc4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGF0dGVybnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=60',
'    https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YWJzdHJhY3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1435820394963-a15297f976fd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGFic3RyYWN0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fGFic3RyYWN0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1604871000636-074fa5117945?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njd8fGFic3RyYWN0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1579187707643-35646d22b596?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA2fHxhYnN0cmFjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA4fHxhYnN0cmFjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1507908708918-778587c9e563?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI2fHxhYnN0cmFjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1608501821300-4f99e58bba77?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTM5fHxhYnN0cmFjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1552250575-e508473b090f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQyfHxhYnN0cmFjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1599237906791-7f778918837f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTUxfHxhYnN0cmFjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1506792006437-256b665541e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTYyfHxhYnN0cmFjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/flagged/photo-1567934150921-7632371abb32?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTg3fHxhYnN0cmFjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1515155075601-23009d0cb6d4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjA1fHxhYnN0cmFjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1592330173432-edc51ad2f14d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGhkJTIwd2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGhkJTIwd2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1558244402-286dd748c593?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTJ8fGhkJTIwcGF0dGVybiUyMG53YWxscGFwZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
'    https://images.unsplash.com/photo-1525124568695-c4c6cd3a8842?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc5fHxoZCUyMHBhdHRlcm4lMjBud2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
]

function EditJournalForm({journal, setRenderUpdate}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(journal.title || '');
    const [updatedAt, setUpdatedAt] = useState(journal.updated_at || journal.created_at)
    const [createdAt, setCreatedAt] = useState(journal.created_at)
    const [coverUrl, setCoverUrl] = useState(journal.coverUrl || '')
    const [showModal, setShowModal] = useState(false);
    const [titleInput, setTitleInput] = useState(false)


    const updatedTitle = (e) => setTitle(e.target.value)
    const updatedCoverUrl = (e) => setCoverUrl(e.target.value)

    const handleSubmit = async(e) => {
        e.preventDefault()
        await dispatch(editJournal(title, coverUrl, journal.id))
        setShowModal(false)
        setRenderUpdate(true)
        setTitleInput(false)
    }

    const updateJournalTitle = async() => {
        setTitleInput(true)
        setTitle('')
    }

    const handleSelectCover = async(e) => {
        setCoverUrl(e.target.src)
    }

    return (
        <>
        <i className="fas fa-info-circle" onClick={() => setShowModal(true)}></i>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div className="journal-form-container">
                    <div className='journal-info-container'>
                        <div className='edit-header'>
                            <h1>Info</h1>
                        </div>
                        <div className='edit-info-box'>
                            <div className='edit-img'>
                                <img src={coverUrl} />
                                <div className='cover-url-input'>
                                    <p>CoverUrl: </p>
                                    <form className='journal-form-box'onSubmit={handleSubmit} >
                                        <input type='text' placeholder='coverUrl' value={coverUrl} onChange={updatedCoverUrl}></input>
                                    </form>
                                </div>

                            </div>
                            <div className='edit-info'>
                                <div className='edit-title'>
                                    <p>{title}</p>
                                    <i onClick={updateJournalTitle} className="far fa-edit"></i>
                                </div>
                                {updateJournalTitle ?
                                        <div>
                                            <form className='journal-form-box'onSubmit={handleSubmit} >
                                                <input type='text' placeholder='title' value={title} onChange={updatedTitle}></input>
                                            </form>
                                        </div>
                                    : "" }
                                <p>Created : {createdAt}</p>
                                <p>Updated : {updatedAt}</p>
                                <form className='journal-form-box'onSubmit={handleSubmit} >
                                    {/* <input type='text' placeholder='title' value={title} onChange={updatedTitle}></input> */}
                                    {/* <input type='text' placeholder='coverUrl' value={coverUrl} onChange={updatedCoverUrl}></input> */}
                                    <button className='update-bttn' type='submit' >Submit</button>
                                </form>
                            </div>

                        </div>

                    </div>
                    <div className='cover-selection'>
                        {selectCovers.map(cover => (
                            <>
                            <div className='cover-selection-gallery'>
                                <img onClick={handleSelectCover} src={cover} alt=''/>
                            </div>
                            </>
                        ))}
                    </div>

                </div>

        </Modal>
        )}
        </>
    )
}

export default EditJournalForm;
