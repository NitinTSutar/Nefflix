import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utilts/validations";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth } from "../utilts/firebase";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utilts/userSlice";

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        console.log("Button clicked");
        console.log("Email:", email.current.value);
        console.log("Password:", password.current.value);

        // Validating the form data.
        const message = checkValidData(
            email.current.value,
            password.current.value
        );
        setErrorMessage(message);

        if (message) return;

        if (!isSignIn) {
            // Sign up logic
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL:
                            "https://avatars.githubusercontent.com/u/100094915?v=4",
                    })
                        .then(() => {
                            // Profile updated!
                            const { uid, email, displayName, photoURL } = auth.currentUser;
                                            dispatch(
                                                addUser({
                                                    uid: uid,
                                                    email: email,
                                                    displayName: displayName,
                                                    photoURL: photoURL,
                                                }))
                            navigate("/browse");
                        })
                        .catch((error) => {
                            // An error occurred
                            dispatch()
                            setErrorMessage(error.message);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            // Sign in logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
    };

    const toggleSignInForm = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    className="h-dvh w-dvw "
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs"
                    alt="background"
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="text-white absolute p-12 w-[450px] bg-black/80 rounded-xl border-0 my-36 mx-auto right-0 left-0 "
            >
                <h1 className="font-bold text-3xl py-4">
                    {isSignIn ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignIn && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        className="p-2 my-2 w-full bg-gray-700/70 border-[0.5px] border-gray-400 rounded-sm"
                    />
                )}
                <input
                    ref={email}
                    type="text"
                    placeholder="Email"
                    className="p-2 my-2 w-full bg-gray-700/70 border-[0.5px] border-gray-400 rounded-sm"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-2 my-2 w-full bg-gray-700/70 border-[0.5px] border-gray-400 rounded-sm"
                />
                <p className="text-red-600 text-lg py-2">{errorMessage}</p>
                <button
                    className="p-2 my-4 bg-[#d9232e] w-full rounded-sm cursor-pointer"
                    onClick={() => handleButtonClick()}
                >
                    {isSignIn ? "Sign In" : "Sign UP"}
                </button>
                <p
                    className="py-4 cursor-pointer"
                    onClick={() => toggleSignInForm()}
                >
                    {isSignIn
                        ? "New to Nefflix? Sign Up Now"
                        : "Already Registered? Sign In Now"}
                </p>
            </form>
        </div>
    );
};

export default Login;