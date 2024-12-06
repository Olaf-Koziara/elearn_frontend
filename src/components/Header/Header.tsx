import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {useGetUserDetailsQuery} from "../../features/auth/service/authService";
import {logout, setCredentials, setToken, AuthState} from "../../features/auth/reducer/authSlice";
import "./Header.scss"
import Row from "../Row/Row";
import Column from "../Column/Column";
import {useAppDispatch} from "../../store/store";

const Header = () => {
    const {userInfo, token} = useSelector((state: { auth: AuthState }) => state.auth)
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const dispatch = useAppDispatch()

    const {data, isFetching} = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 60000,
        skip: token === null
    })


    useEffect(() => {
        if (data) {
            dispatch(setCredentials(data))
        }
    }, [data])

    return (
        <header className="header navbar navbar-expand-lg navbar-light bg-light">
            <Row justifyContent={'center'}>
                <Column size={8}>
                    <nav className='navigation navbar-nav justify-content-between'>
                        <div className="d-flex">
                            <NavLink className="nav-link home-link" to='/'><i
                                className="bi bi-highlighter"/>Dashboard</NavLink>
                            <NavLink className="nav-link home-link" to='/courses'>Course</NavLink>
                        </div>


                        <div className='header-user'>
                            <button className="header-user_button btn">
                                <i className='header-user_icon bi bi-person-circle'
                                   onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                />
                            </button>
                            <div className={`header-user_dropdown ${isUserDropdownOpen ? 'open' : ''} card p-4`}>
                                {userInfo ? (
                                    <>
                                        <span className="pb-2">{userInfo.email}</span>
                                        <NavLink className="btn btn-outline-primary mb-2"
                                                 to='/user-profile'>Profile</NavLink>
                                        <button className='button btn btn-primary' onClick={() => dispatch(logout())}>
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <NavLink className='btn btn-primary mb-2' to='/login'>
                                            Login
                                        </NavLink>
                                        <NavLink className="btn btn-primary" to='/register'>Register</NavLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </Column>
            </Row>
        </header>
    )
}
export default Header