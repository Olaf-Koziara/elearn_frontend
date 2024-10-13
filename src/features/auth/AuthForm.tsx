import React, {FormEvent, useState} from 'react';
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import {login, register} from "../../services/authService";


type AuthFormProps = {
    type: 'login' | 'register'; // Określa, czy jest to formularz logowania, czy rejestracji

};

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
    const [email, setEmail] = useState<string>('olk@wp.pl');
    const [password, setPassword] = useState<string>('12olaf34');
    const [confirmPassword, setConfirmPassword] = useState<string>('12olaf34');
    const [name, setName] = useState<string>('olaf');
    const [surname, setSurname] = useState<string>('koziara')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Jeśli jest to rejestracja, przekazujemy confirmPassword, w przeciwnym razie tylko email i password
        if(type === "login"){
            login(email,password)
        }else{
            register(email,password,confirmPassword,name,surname)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{type === 'login' ? 'Login' : 'Register'}</h2>

            <FormField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />

            <FormField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
            />

            {type === 'register' && (
                <>
                <FormField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                />
                <FormField label="Name" value={name} onChange={(e)=>setName(e.target.value)}/><FormField label="Surname" value={surname} onChange={(e)=>setSurname(e.target.value)}/>


                </>
            )}

            <Button
                label={type === 'login' ? 'Login' : 'Register'}
                type="submit"
                className="auth-button"
            />
        </form>
    );
};

export default AuthForm;
