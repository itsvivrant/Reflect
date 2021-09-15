import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Modal} from '../../context/Modal';
import LogoutButton from '../auth/LogoutButton';
import {getUserHappiness, createHappiness, editHappiness, deleteUserHappiness} from '../../store/happiness';


function Profile() {
    const sessionUser = useSelector((state) => state.session.user);
    const userHappiness = useSelector((state) => state.happiness);
    const dispatch = useDispatch();
    const history = useHistory();
    const [overall_happiness, setOverallHappiness] = useState('');
    const [happiness_date, setHappinessDate] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [renderPage, setRenderPage] = useState(false);
    const [deleteRender, setDeleteRender] = useState(false);


    const newOverallHappiness = (e) => setOverallHappiness(e.target.value)
    const newHappinessDate = (e) => setHappinessDate(e.target.value)


    useEffect(() => {
        dispatch(getUserHappiness(sessionUser.id))
    },[dispatch, renderPage, sessionUser.id, deleteRender, userHappiness.id])

    const cancel =() => {
        setShowModal(false)
        setShowCreate(false)
        history.push('/')
    }

    const handleCreateSubmit = async(e) => {
        e.preventDefault()
        await dispatch(createHappiness(overall_happiness, happiness_date, sessionUser.id))
        setOverallHappiness('')
        setHappinessDate('')
        setRenderPage(true)
        setShowCreate(false)
    }

    const handleDelete = async(e) => {
        e.preventDefault();
        await dispatch(deleteUserHappiness(userHappiness.id))
        setDeleteRender(true)

    }

    const showCreateDiv = () =>  {
        setShowCreate(true)
    }


    let create
    if (Object.keys(userHappiness).length >= 1 && userHappiness.user_id === sessionUser.id) {
        create = (
            <div className='happiness-scale'>
                <h4>{sessionUser.username}'s Happiness Scale: </h4>
                <h3>{userHappiness?.overall_happiness} </h3>
                <span>Since {userHappiness?.happiness_date?.slice(0,17)}</span>
                <button onClick={handleDelete}>Delete</button>
            </div>
        )
    } else {
        create = (
            <div >
                <button className='create-happiness-bttn' onClick={showCreateDiv} button>Add your happiness scale</button>
            </div>
        )
    }


    return (
        <>
        <i className="fas fa-portrait" onClick={() => setShowModal(true)}></i>
        {showModal && (
            <Modal>
                <div className='profile-container'>
                    <div className='user-profile'>
                        <div className='exit-profile'>
                            <i onClick={cancel} className="fas fa-times"></i>
                        </div>
                        <div className='profile-pic'>
                            <div className='profile-pic-content'>
                                <i className="fas fa-portrait"></i>
                            </div>
                            <div>
                                {create}
                            </div>
                            <div>
                            {showCreate ?

                                    <form onSubmit={handleCreateSubmit}>
                                        <div className='create-happiness-div'>
                                        <input type='text' placeholder='0-5' value={overall_happiness} onChange={newOverallHappiness}></input>
                                        <input type='date' value={happiness_date} onChange={newHappinessDate}></input>
                                        <button type='submit'>Submit</button>
                                        </div>
                                    </form>

                            :""}
                            </div>
                        </div>
                        <div className='profile-content-container'>
                            <div className='profile-content'>
                                <p>{sessionUser.email}</p>
                                <p>{sessionUser.first_name} {sessionUser.last_name}</p>

                            </div>
                            <div>
                                <LogoutButton />
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
        )}
        </>
    )
}

export default Profile
