import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useParams} from 'react-router-dom';
import { createEntry, allJournalEntries} from '../../store/journal';



import './EntriesPage.css'

function EntryCreate({ setEntryRender}) {
    let {id} = useParams()
    id = Number(id)
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [strengths, setStrengths] = useState('');

    const newTitle = (e) => setTitle(e.target.value)
    const newContent = (e) => setContent(e.target.value)
    const newStrengths = (e) => setStrengths(e.target.value)


    useEffect(() => {
        dispatch(allJournalEntries(id))
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
        <div className="text-editor-container">
            <div className='text-editor'>
                <div className='form-edit-container'>
                    <form onSubmit={entry}>
                        <div className='content-title'>
                            <label>Title</label>
                            <input type='text' onChange={newTitle} value={title}></input>
                            {/* <input type='text' onChange={newContent} value={content}></input> */}
                        </div>
                        <div className='editor-content'>
                        <input type='text' onChange={newContent} value={content}></input>


                        </div>
                    </form>
                </div>
                <form onSubmit={entry}>
                    <button className='submit-entry-bttn' type='submit'>Submit</button>
                </form>
            </div>
            <div>
                </div>



        </div>

    )
}

export default EntryCreate
