import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useParams} from 'react-router-dom';
import { createEntry, allJournalEntries} from '../../store/journal';


import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


import './EntriesPage.css'

function EntryCreate({ setRenderPage, currentDate}) {
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




    const entry = async(e) => {
        e.preventDefault()
        await dispatch(createEntry(title, content, strengths, sessionUser.id, id))
        setTitle('')
        setContent('')
        setStrengths('')
        setRenderPage(true)
    }


    return (
        <div className="text-editor-container">

                <div className='form-edit-container'>
                    <div className='content-title'>
                        <p>Title: </p>
                        <form onSubmit={entry}>
                            <input className='content-title-input' placeholder="........Your Title "type='text' onChange={newTitle} value={title}></input>
                        </form>
                        <div>
                            <form onSubmit={entry}>
                                <button className='submit-entry-bttn' type='submit'>Save</button>
                            </form>
                        </div>
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
                            placeholder="Tell a story. . ."
                            value={content}
                            onChange={newContent}
                        />
                    </div>


                </div>

        </div>

    )
}

export default EntryCreate
