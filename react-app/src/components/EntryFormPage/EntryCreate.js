import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useParams} from 'react-router-dom';
import { createEntry, allJournalEntries} from '../../store/journal';



function EntryCreate({ setEntryRender}) {
    let {id} = useParams()
    id = Number(id)
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [strengths, setStrengths] = useState('')

    const [showEntryForm, setShowEntryForm] =useState(false)

    const newTitle = (e) => setTitle(e.target.value)
    const newContent = (e) => setContent(e.target.value)
    const newStrengths = (e) => setContent(e.target.value)

    useEffect(() => {
        dispatch(allJournalEntries())
    }, [dispatch])

    const entry = async(e) => {
        e.preventDefault()
        await dispatch(createEntry(title, content, strengths, sessionUser.id, id))
        setTitle('')
        setContent('')
        setStrengths('')
        setEntryRender(true)
    }


    return (
        <>
        <i className="fas fa-plus" onClick={() => setShowEntryForm(true)}>
            <p>Entry</p>
        </i>

        {showEntryForm ?
            <form onSubmit={entry}>
                <input type='text' value={title} onChange={newTitle}></input>
                <input type='text' value={content} onChange={newContent}></input>
                <input type='text' value={strengths} onChange={newStrengths}></input>
                <button type='submit'>Submit</button>
            </form>
        : ''}
        </>
    )
}

export default EntryCreate
