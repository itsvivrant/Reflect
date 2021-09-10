import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getOneEntry, editEntry, deleteSingleEntry} from '../../store/entry';
import {useParams, useHistory} from 'react-router-dom'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

import './EntriesPage.css'

function EntryEdit({editEntryId, setShowForm, setRenderPage, renderPage, currentDate}) {
    let {id} = useParams()
    id = Number(id)
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)
    const entry = useSelector(state => state.entry.entry)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState(entry?.content.replace(/<[^>]*>/g, ''))
    const [strengths, setStrengths] = useState("")
    const [editRender, setEditRender] = useState(false)
    const [deleteEntry, setDeleteEntry] = useState(false)



    const updatedTitle = (e) => setTitle(e.target.value)
    const updatedContent = (value) => {setContent(value)}

    useEffect(() => {
        dispatch(getOneEntry(editEntryId))
        setTitle(entry?.title)
        setContent(entry?.content.replace(/<[^>]*>/g, ''))
        setStrengths(entry?.strengths)


    }, [dispatch, entry?.id, editEntryId, deleteEntry, editRender])


    const handleUpdateEntry = async(e) => {
        e.preventDefault()
        await dispatch(editEntry(title, content, strengths, sessionUser.id, editEntryId))
        setEditRender(true)
        renderPage? setRenderPage(false): setRenderPage(true)
    }

    const handleDeleteEntry = async(e) => {
        e.preventDefault()
        await dispatch(deleteSingleEntry(entry.id))
        setDeleteEntry(true)
        setRenderPage(true)
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

                <div className='form-edit-container'>
                    <div className='content-title'>
                        <form onSubmit={handleUpdateEntry}>
                            <input className='content-title-input' placeholder="edit" type='text' onChange={updatedTitle} value={title}></input>
                        </form>
                        <div>
                            <form onSubmit={handleUpdateEntry}>
                                <button className='submit-entry-bttn' type='submit'>Save</button>
                            </form>
                        </div>
                        <div>
                            <button className='cancel-entry-bttn' onClick={cancel}>Cancel</button>
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
                        <ReactQuill
                            className="editor"
                            name="content"
                            type="text"
                            value={content || ''}
                            onChange={updatedContent}
                        />
                    </div>


                </div>




    )
}

export default EntryEdit
