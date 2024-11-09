import React, {useEffect} from 'react';
import FormField from "../../../components/FormField/FormField";
import Button from "../../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, registerUser} from "../actions/authActions";
import {useAppDispatch} from "../../../store/store";
import Error from "../../../components/Error/Error";
import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import Loader from "../../../components/Loader/Loader";
import {useNavigate} from "react-router-dom";


type AuthFormProps = {
    type: 'login' | 'register'; // Określa, czy jest to formularz logowania, czy rejestracji


};
type RegisterFormValues = {
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    surname: string
}
type LoginFormValues = {
    email: string,
    password: string
}

const AuthForm: React.FC<AuthFormProps> = ({type}) => {
    const {register, handleSubmit} = useForm<RegisterFormValues | LoginFormValues>();

    const {loading, token, error, success, userInfo} = useSelector(
        (state: any) => state.auth
    )
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [userInfo, navigate])

    const onSubmit: SubmitHandler<RegisterFormValues | LoginFormValues> = (data: RegisterFormValues | LoginFormValues) => {
        if (type === "login") {
            console.info('login')
            const formData = data as LoginFormValues;
            dispatch(loginUser({email: formData.email, password: formData.password}))
        } else {
            const formData = data as RegisterFormValues;
            dispatch(registerUser({
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                name: formData.name,
                surname: formData.surname
            }))
        }
    };
    const onError: SubmitErrorHandler<RegisterFormValues | LoginFormValues> = (error) => {
        console.error(error)
    }

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-3 text-center">
                <Loader isLoading={loading}></Loader>
                <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
                {error && <Error>{error}</Error>}
                <form onSubmit={handleSubmit(onSubmit, onError)} className="row card pt-4 ">

                    <div className="col-md-12 pb-3">
                        <FormField
                            type="email"
                            placeholder="Enter your email"
                            {...register('email', {required: true})}
                        />
                    </div>
                    <div className='col-md-12 pb-4'>

                        <FormField
                            type="password"
                            placeholder="Enter your password"
                            required
                            {...register('password', {required: true})}
                        />
                    </div>

                    {type === 'register' && (
                        <>
                            <div className="col-md-12 pb-3">
                                <FormField
                                    type="password"
                                    placeholder="Confirm your password"
                                    {...register('confirmPassword')}

                                />

                            </div>
                            <div className="col-md-12 pb-3">
                                <FormField  {...register('name')}/>
                            </div>
                            <div className="col-md-12 pb-3">
                                <FormField {...register('surname')}/>
                            </div>
                        </>
                    )}

                    <Button
                        icon="door-open"
                        label={type === 'login' ? 'Login' : 'Register'}
                        type="submit"
                        className="auth-button"
                    >Submit</Button>
                </form>
            </div>
        </div>
    );
}


export default AuthForm;
