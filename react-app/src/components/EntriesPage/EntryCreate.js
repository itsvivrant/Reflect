import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useParams} from 'react-router-dom';
import { createEntry} from '../../store/journal';


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
    const [errors, setErrors] = useState([])

    const newTitle = (e) => setTitle(e.target.value)
    const newContent = (value) => {
        setContent(value)
    }

    const entry = async(e) => {
        e.preventDefault()
        const data = await dispatch(createEntry(title, content, strengths, sessionUser.id, id))
        if (data) {
            setErrors(data)
        } else {
            setTitle('')
            setContent('')
            setStrengths('')
            setRenderPage(true)
            setErrors([])
        }
    }


    return (
        <div className='form-edit-container'>
            <div className='errors-div'>
                {errors.length > 0 &&
                    <>
                    <p className='errors_message'>
                    {errors[0].title}
                    </p>
                        <p className='errors_message'>
                        {errors[0].content}
                        </p>
                        </>
                }
            </div>
            <div className='content-title'>
                <div className='content-title-input-container'>
                    <p>Title: </p>
                    <form onSubmit={entry}>
                        <input className='content-title-input' placeholder="Your title "type='text' onChange={newTitle} value={title}></input>
                    </form>
                </div>
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
                <ReactQuill
                    className="editor"
                    name="content"
                    type="text"
                    placeholder="Tell a story"
                    value={content }
                    onChange={newContent}
                />
            </div>
        </div>



    )
}

export default EntryCreate
