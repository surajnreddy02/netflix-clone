import { register, login, logout, addToMyList, removeFromMyList, getMyList } from './auth';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Mock Firebase functions
jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('Auth Service', () => {
    const mockUser = { uid: '123', email: 'test@example.com', displayName: 'Test User' };
    const mockDb = getFirestore();
    const mockAuth = getAuth();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('register should create a new user and document', async () => {
        // Mock implementation for createUserWithEmailAndPassword
        mockAuth.createUserWithEmailAndPassword.mockResolvedValue({ user: mockUser });
        await expect(register('test@example.com', 'password', 'Test User')).resolves.toEqual(mockUser);
    });

    test('login should sign in an existing user', async () => {
        mockAuth.signInWithEmailAndPassword.mockResolvedValue({ user: mockUser });
        await expect(login('test@example.com', 'password')).resolves.toEqual(mockUser);
    });

    test('logout should sign out the user', async () => {
        await expect(logout()).resolves.toBeUndefined();
    });

    test('addToMyList should add a movie to the user\'s list', async () => {
        const movie = { id: 'movie1', title: 'Movie 1' };
        await expect(addToMyList(mockUser.uid, movie)).resolves.toBeUndefined();
    });

    test('removeFromMyList should remove a movie from the user\'s list', async () => {
        const movie = { id: 'movie1', title: 'Movie 1' };
        await expect(removeFromMyList(mockUser.uid, movie)).resolves.toBeUndefined();
    });

    test('getMyList should return the user\'s list', async () => {
        const myList = [{ id: 'movie1', title: 'Movie 1' }];
        mockDb.getDoc.mockResolvedValue({ exists: () => true, data: () => ({ myList }) });
        await expect(getMyList(mockUser.uid)).resolves.toEqual(myList);
    });
});
