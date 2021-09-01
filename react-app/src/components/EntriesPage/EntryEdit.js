import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { editEntry, deleteSingleEntry} from '../../store/entry';
import {useParams} from 'react-router-dom'
import {allJournalEntries} from '../../store/journal'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import './EntriesPage.css'

function EntryEdit() {
    let {id} = useParams()
    id = Number(id)
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const entry = useSelector((state) => state.entry)

    const [title, setTitle] = useState(entry.title ||'')
    const [content, setContent] = useState(entry.content ||'')
    const [strengths, setStrengths] = useState(entry.strengths ||'')

    const updatedTitle = (e) => setTitle(e.target.value)
    const updatedContent = (e) =>setContent(e.target.value)
    const updatedStrengths = (e) => setStrengths(e.target.value)


    const handleUpdateEntry = async(e) => {
        e.preventDefault()
        await dispatch(editEntry(title, content, strengths, sessionUser.id, id, ))
    }

    const handleDeleteEntry = async(e) => {
        e.preventDefault()
        await dispatch(deleteSingleEntry(entry.id))

    }

    return (
        <h1>Edit</h1>
        // <div className="text-editor-container">
        //     <div className='text-editor'>
        //         <div className='form-edit-container'>
        //             <form onSubmit={handleUpdateEntry}>
        //                 <div className='content-title'>
        //                     <label>Title</label>
        //                     <input type='text' onChange={updatedTitle} value={title}></input>
        //                 </div>
        //                 <div className='editor-content'>
        //                 <Editor className='editor'
        //                     toolbarClassName="toolbarClassName"
        //                     wrapperClassName="wrapperClassName"
        //                     editorClassName="editorClassName"
        //                     placeholder="How's your day?"
        //                     onChange={updatedContent}
        //                     value={content}
        //                 />
        //                 </div>
        //             </form>
        //         </div>
        //         <form onSubmit={handleUpdateEntry}>
        //             <button className='submit-entry-bttn' type='submit'>Submit</button>
        //         </form>
        //     </div>
        //     <div>
        //         </div>



        // </div>

    )
}

export default EntryEdit
