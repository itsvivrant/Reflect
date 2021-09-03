import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getOneEntry, editEntry, deleteSingleEntry} from '../../store/entry';
import {useParams, useHistory} from 'react-router-dom'
import {allJournalEntries} from '../../store/journal'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

import './EntriesPage.css'

function EntryEdit({editEntryId, setShowForm, setDeleteRender, currentDate, setUpdateRender}) {
    let {id} = useParams()
    id = Number(id)
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)
    const entry = useSelector(state => state.entry.entry)

    const [title, setTitle] = useState(entry?.title||'')
    const [content, setContent] = useState(entry?.content.replace(/<[^>]*>/g, '') ||'')
    const [strengths, setStrengths] = useState(entry?.strengths ||'')
    const [deleteEntry, setDeleteEntry] = useState(false)
    const [updatedEntry, setUpdatedEntry] = useState(false)


    const updatedTitle = (e) => setTitle(e.target.value)
    const updatedContent = (value) => {
        setContent(value)
    }
    // const updatedStrengths = (e) => setStrengths(e.target.value)

    useEffect(() => {
        dispatch(allJournalEntries(id))
        dispatch(getOneEntry(editEntryId))
    }, [dispatch, id, editEntryId, deleteEntry, updatedEntry])


    const handleUpdateEntry = async(e) => {
        e.preventDefault()
        await dispatch(editEntry(title, content, strengths, sessionUser.id, id, ))
        setUpdatedEntry(true)
    }

    const handleDeleteEntry = async(e) => {
        e.preventDefault()
        await dispatch(deleteSingleEntry(entry.id))
        setUpdateRender(true)
        setDeleteRender(true)
        setDeleteEntry(true)
        setShowForm(false)
        history.push(`/journals/${id}/entries`)

    }

    const cancel = async(e)=> {
        setTitle('')
        setContent('')
        setShowForm(false)
        history.push(`/journals/${id}/entries`)

    }

    return (
        <div className="text-editor-container">

                <div className='form-edit-container'>
                    <div className='content-title'>
                        {/* <p>{title} </p> */}
                        <form onSubmit={handleUpdateEntry}>
                            <input className='content-title-input' placeholder={`${title}`} type='text' onChange={updatedTitle} value={entry?.title}></input>
                        </form>
                        <div>
                            <form onSubmit={handleUpdateEntry}>
                                <button className='submit-entry-bttn' type='submit'>Save</button>
                            </form>
                        </div>
                        <div>
                            <button className='submit-entry-bttn' onClick={cancel}>Cancel</button>
                        </div>
                    </div>
                    <div className='content-date'>
                        <div>
                            <i className="far fa-calendar">
                                <h5>{currentDate}</h5>
                            </i>
                        </div>
                        <div>
                            <i className="far fa-trash-alt" onClick={handleDeleteEntry}></i>
                        </div>

                    </div>

                    <div className='editor-content'>
                        {/* <form onSubmit={entry}>
                            <input type='text' onChange={newContent} value={content}></input>
                        </form> */}
                        <ReactQuill
                            className="editor"
                            name="content"
                            type="text"
                            placeholder={content}
                            value={content}
                            onChange={updatedContent}
                        />
                    </div>


                </div>

        </div>



    )
}

export default EntryEdit
