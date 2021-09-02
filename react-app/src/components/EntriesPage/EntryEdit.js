import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getOneEntry, editEntry, deleteSingleEntry} from '../../store/entry';
import {useParams, useHistory} from 'react-router-dom'
import {allJournalEntries} from '../../store/journal'


import './EntriesPage.css'

function EntryEdit({editEntryId, setShowForm, setDeleteRender}) {
    let {id} = useParams()
    id = Number(id)
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)
    const entry = useSelector(state => state.entry.entry)

    const [title, setTitle] = useState(entry?.title ||'')
    const [content, setContent] = useState(entry?.content ||'')
    const [strengths, setStrengths] = useState(entry?.strengths ||'')
    const [deleteEntry, setDeleteEntry] = useState(false)


    const updatedTitle = (e) => setTitle(e.target.value)
    // const updatedContent = (e) =>setContent(e.target.value)
    const updatedContent = (value) => {
        setContent(value)
    }
    const updatedStrengths = (e) => setStrengths(e.target.value)

    useEffect(() => {
        dispatch(allJournalEntries(id))
        dispatch(getOneEntry(editEntryId))
    }, [dispatch, id, editEntryId, deleteEntry])


    const handleUpdateEntry = async(e) => {
        e.preventDefault()
        await dispatch(editEntry(title, content, strengths, sessionUser.id, id, ))
    }

    const handleDeleteEntry = async(e) => {
        e.preventDefault()
        await dispatch(deleteSingleEntry(entry.id))
        setDeleteRender(true)
        setDeleteEntry(true)
        setShowForm(false)
        history.push(`/journals/${id}/entries`)

    }

    const cancel = async(e)=> {
        e.preventDefault()
        setShowForm(true)

    }

    return (
        <div className="text-editor-container">
            <div className='text-editor'>
                <div className='form-edit-container'>
                    <form onSubmit={handleUpdateEntry}>
                        <div className='content-title'>
                            <label>Title</label>
                            <input type='text' onChange={updatedTitle} value={entry?.title}></input>
                        </div>
                        <div>
                            <input type='text' onChange={updatedContent} value={entry?.content}></input>

                        </div>
                    </form>
                </div>
                <form onSubmit={handleUpdateEntry}>
                    <button className='submit-entry-bttn' type='submit'>Submit</button>
                </form>
                <button className='submit-entry-bttn' onClick={cancel}>Cancel</button>
                <button className='submit-entry-bttn' onClick={handleDeleteEntry}>Delete</button>
            </div>
            <div>
                </div>

        </div>

    )
}

export default EntryEdit
