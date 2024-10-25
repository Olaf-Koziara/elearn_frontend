import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {useGetUserDetailsQuery} from "../../features/auth/authService";
import {logout, setCredentials, SliceState} from "../../features/auth/authSlice";
import "./Header.scss"

const Header = () => {
    const {userInfo} = useSelector((state: { auth: SliceState }) => state.auth)
    const [isUserInfoClicked, setIsUserInfoClicked] = useState(false);
    const dispatch = useDispatch()

    // automatically authenticate user if token is found
    const {data, isFetching} = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 300000, // 15mins
    })


    useEffect(() => {
        if (data) dispatch(setCredentials(data))
    }, [data, dispatch])

    return (
        <header className="header navbar navbar-expand-lg navbar-light bg-light">

            <nav className='container navigation navbar-nav justify-content-between'>
                <NavLink className="nav-link home-link" to='/'><i
                    className="bi bi-highlighter"></i>Dashboard</NavLink>
                {!userInfo && <>
                    <NavLink className="nav-link" to='/register'>Register</NavLink>
                </>
                }
                <div className='header-user'>
                    <i className='header-user_icon bi bi-person-circle'
                       onClick={() => setIsUserInfoClicked(!isUserInfoClicked)}
                    ></i>
                    <div className={`header-user_dropdown ${isUserInfoClicked ? 'open' : ''} card p-4`}>
                        {userInfo ? (
                            <>
                                <span className="pb-2">{userInfo.email}</span>
                                <NavLink className="btn btn-outline-primary mb-2" to='/user-profile'>Profile</NavLink>
                                <button className='button btn btn-primary' onClick={() => dispatch(logout())}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <NavLink className='button' to='/login'>
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Header