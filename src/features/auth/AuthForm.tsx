import React, {ChangeEvent, FormEvent, useCallback, useState} from 'react';
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import {useAuth} from "../../hooks/useAuth";


type AuthFormProps = {
    type: 'login' | 'register'; // Określa, czy jest to formularz logowania, czy rejestracji

};

const AuthForm: React.FC<AuthFormProps> = ({type}) => {
    const [email, setEmail] = useState<string>('olk@wp.pl');
    const [password, setPassword] = useState<string>('12olaf34');
    const [confirmPassword, setConfirmPassword] = useState<string>('12olaf34');
    const [name, setName] = useState<string>('olaf');
    const [surname, setSurname] = useState<string>('koziara')
    const {login, register} = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Jeśli jest to rejestracja, przekazujemy confirmPassword, w przeciwnym razie tylko email i password
        if (type === "login") {
            login(email, password).then(result => {
                console.log(result)
            }).catch(err => {
                console.log(err)
            })
        } else {
            register(email, password, confirmPassword, name, surname)
        }
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-3 text-center">
                <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit} className="row card pt-4 ">

                    <div className="col-md-12 pb-3">
                        <FormField
                            type="email"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className='col-md-12 pb-4'>

                        <FormField
                            type="password"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {type === 'register' && (
                        <>
                            <FormField
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                placeholder="Confirm your password"
                                required
                            />
                            <FormField label="Name" value={name} onChange={(e) => setName(e.target.value)}/><FormField
                            label="Surname" value={surname} onChange={(e) => setSurname(e.target.value)}/>


                        </>
                    )}

                    <Button
                        label={type === 'login' ? 'Login' : 'Register'}
                        type="submit"
                        className="auth-button"
                    />
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
