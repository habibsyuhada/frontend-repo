import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAYvv_7BBl9jd4_-bAYzIT93SUhMmG6yp4" || 'mock_key',
  authDomain: "tt-ebuddy.firebaseapp.com",
  projectId: "tt-ebuddy",
  storageBucket: "tt-ebuddy.appspot.com",
  messagingSenderId: "442943671787",
  appId: "1:442943671787:web:507cda2f53dea7e12d1dae",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const API_BASE_URL = 'http://localhost:5001/tt-ebuddy/us-central1/api';

export const loginUser = async (email: string, password: string) => {

	const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

	if (user) {
    const token = await user.getIdToken();
    const response = await fetch(`${API_BASE_URL}/user/fetch-id-by-email/${email}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const { userId } = await response.json();

      return { token, userId };
    } else {
      throw new Error('User not found in Firestore');
    }
  }

  throw new Error('Login failed');
};

export const logoutUser = async () => {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
  await signOut(auth);
};
