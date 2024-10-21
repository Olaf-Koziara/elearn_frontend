import React, {useEffect} from 'react';
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, registerUser} from "./authActions";
import {useAppDispatch} from "../../store/store";
import Error from "../../components/Error/Error";
import {SubmitHandler, useForm} from "react-hook-form";
import Loader from "../../components/Loader/Loader";


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

    const {loading, token, error, success} = useSelector(
        (state: any) => state.auth
    )
    const dispatch = useAppDispatch();
    useEffect(() => {
        register('email')

    }, [])
    const onSubmit: SubmitHandler<RegisterFormValues | LoginFormValues> = (data: RegisterFormValues | LoginFormValues) => {
        // Jeśli jest to rejestracja, przekazujemy confirmPassword, w przeciwnym razie tylko email i password
        if (type === "login") {
            console.log(data)
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

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-3 text-center">
                <Loader isLoading={loading}></Loader>
                <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
                {error && <Error>{error}</Error>}
                <form onSubmit={handleSubmit(onSubmit)} className="row card pt-4 ">

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
                    ></Button>
                </form>
            </div>
        </div>
    );
}


export default AuthForm;
