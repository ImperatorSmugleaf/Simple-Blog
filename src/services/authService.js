import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

function SignIn() {
    return (
        <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>
            Sign In
        </button>
    );
}

function SignOut() {
    return (
        <div>
            Hello, {auth.currentUser.displayName} &nbsp;
            <button onClick={() => signOut(auth)}>Sign Out</button>
        </div>
    );
}

function useAuthentication() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            user ? setUser(user) : setUser(null);
        });
    }, []);
    return user;
}

export { SignIn, SignOut, useAuthentication };
