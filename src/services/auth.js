import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { firebaseConfig } from "../config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Register a new user
export const register = async (email, password, name) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Update the user profile with the name
        await updateProfile(user, {
            displayName: name
        });

        // Create user document in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email,
            name,
            myList: []
        });

        return user;

    } catch (error) {
        throw error;
    }
};

// Sign in existing user
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

// Sign out user
export const logout = () => {
    return signOut(auth);
};

// Get current user
export const getCurrentUser = () => {
    return auth.currentUser;
};

// Add movie to My List
export const addToMyList = async (userId, movie) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { myList: arrayUnion(movie) });
};

// Remove movie from My List
export const removeFromMyList = async (userId, movie) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { myList: arrayRemove(movie) });
};

// Get user's My List
export const getMyList = async (userId) => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        return docSnap.data().myList;
    } else {
        return [];
    }
};

// Observer for auth state changes
export const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};