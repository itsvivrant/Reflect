import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Modal} from '../../context/Modal'
import LogoutButton from '../auth/LogoutButton'
import {getUserHappiness} from '../../store/happiness'


function Profile() {
    const sessionUser = useSelector((state) => state.session.user)
    const userHappiness = useSelector((state) => state.happiness.happiness)
    const dispatch = useDispatch()
    const [overallHappiness, setOverallHappiness] = useState(userHappiness?.overall_happiness);
    const [happinessDate, setHappinessDate] = useState(userHappiness?.happiness_date);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getUserHappiness())
    },[dispatch])

    const cancel =(e) => {
        setShowModal(false)
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
                                {/* <p className='profile-username'>{sessionUser.username}</p> */}
                            </div>
                            <div className='happiness-scale'>
                                <h4>{sessionUser.username}'s Happiness Scale: </h4>
                                <h3>{userHappiness?.overall_happiness} </h3>
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
