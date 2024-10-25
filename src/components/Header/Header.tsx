import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {useGetUserDetailsQuery} from "../../features/auth/authService";
import {logout, setCredentials, SliceState} from "../../features/auth/authSlice";

const Header = () => {
    const {userInfo} = useSelector((state: { auth: SliceState }) => state.auth)
    const dispatch = useDispatch()

    // automatically authenticate user if token is found
    const {data, isFetching} = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 900000, // 15mins
    })

    useEffect(() => {
        if (data) dispatch(setCredentials(data))
    }, [data, dispatch])

    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='header-status'>
        <span>
          {isFetching
              ? `Fetching your profile...`
              : userInfo !== null
                  ? `Logged in as ${userInfo.email}`
                  : "You're not logged in"}
        </span>
                <div className='cta'>
                    {userInfo ? (
                        <button className='button' onClick={() => dispatch(logout())}>
                            Logout
                        </button>
                    ) : (
                        <NavLink className='button' to='/login'>
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
            <nav className='container navigation'>
                <NavLink to='/'>Home</NavLink>
                {!userInfo && <>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/register'>Register</NavLink>
                </>
                }
                {userInfo && <NavLink to='/user-profile'>Profile</NavLink>}
            </nav>
        </header>
    )
}
export default Header