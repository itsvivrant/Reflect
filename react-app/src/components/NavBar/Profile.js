import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import {Modal} from '../../context/Modal'
import LogoutButton from '../auth/LogoutButton'


function Profile() {
    const sessionUser = useSelector((state) => state.session.user)
    const [showModal, setShowModal] = useState(false);

    console.log('lksdjflksdjfklds', sessionUser)

    const cancel =(e) => {
        setShowModal(false)
    }
    return (
        <>
        <i className="fas fa-portrait" onClick={() => setShowModal(true)}></i>
        {showModal && (
            <Modal>
                <div className='profile-container'>
                    <div className='exit-profile'>
                        <i onClick={cancel} className="fas fa-times"></i>
                    </div>
                    <div className='profile-pic'>
                        <i className="fas fa-portrait"></i>
                    </div>
                    <div className='profile-username'>
                        <p>{sessionUser.username}</p>
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
            </Modal>
        )}
        </>
    )
}

export default Profile
