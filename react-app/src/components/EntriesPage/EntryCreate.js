import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useParams} from 'react-router-dom';
import { createEntry, allJournalEntries} from '../../store/journal';

import b2 from '../EntriesPage/background-img/b2.jpg'
import b3 from '../EntriesPage/background-img/b3.jpg'
import b4 from '../EntriesPage/background-img/b4.jpg'
import b5 from '../EntriesPage/background-img/b5.jpg'
import b6 from '../EntriesPage/background-img/b6.jpg'
import b9 from '../EntriesPage/background-img/b9.jpg'
import b10 from '../EntriesPage/background-img/b10.jpg'


import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


import './EntriesPage.css'

function EntryCreate({ setEntryRender, currentDate}) {
    let {id} = useParams()
    id = Number(id)
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [strengths, setStrengths] = useState('');

    const newTitle = (e) => setTitle(e.target.value)
    const newContent = (value) => {
        setContent(value)
    }
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

                <div className='form-edit-container'>
                    <div className='content-title'>
                        <p>Title</p>
                        <form onSubmit={entry}>
                            <input placeholder="Title..."type='text' onChange={newTitle} value={title}></input>
                        </form>
                    </div>
                    <div className='content-date'>
                        <i className="far fa-calendar">
                            <h5>{currentDate}</h5>
                        </i>
                    </div>

                    <div className='editor-content'>
                        {/* <form onSubmit={entry}>
                            <input type='text' onChange={newContent} value={content}></input>
                        </form> */}
                        <ReactQuill
                            className="editor"
                            name="content"
                            type="text"
                            placeholder="Content"
                            value={content}
                            onChange={newContent}
                        />
                    </div>

                    <div>
                        <form onSubmit={entry}>
                            <button className='submit-entry-bttn' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
        </div>

    )
}

export default EntryCreate
