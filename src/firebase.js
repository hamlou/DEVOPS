import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDyptN2m-wIxze1jRJya1hGzqueKe510r4",
  authDomain: "tfcq-32a8b.firebaseapp.com",
  projectId: "tfcq-32a8b",
  storageBucket: "tfcq-32a8b.firebasestorage.app",
  messagingSenderId: "1027395831145",
  appId: "1:1027395831145:web:969f6de4cf9517755e29f8",
  measurementId: "G-1DWPEPHZDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

/**
 * Sign up a new user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} - User credential object or error
 */
export const signUp = async (email, password) => {
  try {
    // Create Firebase account immediately
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Send verification email with link
    // For localhost development, we'll use a simpler approach
    // The verification will be handled by listening to auth state changes
    await sendEmailVerification(userCredential.user);
    
    return { 
      success: true, 
      user: userCredential.user,
      requiresVerification: true,
      message: 'Verification email sent! Please check your inbox and click the verification link.'
    };
  } catch (error) {
    // Handle specific Firebase errors with user-friendly messages
    let errorMessage = 'Failed to create account. Please try again.';
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email address is already registered. Please sign in or use a different email.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address format.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak. Please choose a stronger password.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { success: false, error: errorMessage };
  }
};

/**
 * Sign in an existing user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} - User credential object or error
 */
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Sign in with Google
 * @returns {Promise<Object>} - User credential object or error
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Sign out the current user
 * @returns {Promise<Object>} - Success status or error
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Complete registration after email verification
 * This creates the actual Firebase account
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} code - Verification code
 * @returns {Promise<Object>} - User credential object or error
 */
export const completeRegistration = async (email, password, code) => {
  try {
    // First verify the code
    const verificationResult = verifyCode(email, code);
    
    if (!verificationResult.valid) {
      return { success: false, error: verificationResult.message };
    }
    
    // Code is valid - now create the Firebase account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Mark email as verified since they proved ownership
    // Note: Firebase doesn't allow manually setting emailVerified during creation
    // You'd need to use admin SDK on backend for that
    
    return { 
      success: true, 
      user: userCredential.user,
      emailVerified: true
    };
  } catch (error) {
    let errorMessage = 'Failed to complete registration. Please try again.';
    
    if (error.code === 'auth/email-already-in-use') {
      // This shouldn't happen, but handle it
      errorMessage = 'This email is already registered. Please sign in instead.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address format.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak. Please choose a stronger password.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { success: false, error: errorMessage };
  }
};

/**
 * Generate a random 6-digit verification code
 * @returns {string} - 6-digit code
 */
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Store verification code temporarily (in production, use backend/Firestore)
 * For demo purposes, we'll use localStorage
 */
export const storeVerificationCode = async (email, code) => {
  try {
    const verificationData = {
      code,
      timestamp: Date.now(),
      email
    };
    localStorage.setItem('verificationCode', JSON.stringify(verificationData));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Verify the code entered by user
 * @param {string} email - User's email
 * @param {string} code - Code entered by user
 * @returns {Object} - Verification result
 */
export const verifyCode = (email, code) => {
  try {
    const stored = localStorage.getItem('verificationCode');
    if (!stored) {
      return { valid: false, message: 'No verification code found. Please request a new code.' };
    }
    
    const verificationData = JSON.parse(stored);
    
    // Check if code matches and is for the same email
    if (verificationData.email === email && verificationData.code === code) {
      // Check if code is older than 10 minutes
      const tenMinutesAgo = Date.now() - (10 * 60 * 1000);
      if (verificationData.timestamp < tenMinutesAgo) {
        return { valid: false, message: 'Verification code has expired. Please request a new code.' };
      }
      
      localStorage.removeItem('verificationCode');
      return { valid: true, message: 'Email verified successfully!' };
    }
    
    return { valid: false, message: 'Invalid verification code. Please check your email and try again.' };
  } catch (error) {
    return { valid: false, message: 'Verification failed. Please try again.' };
  }
};

/**
 * Resend verification email using Firebase
 * @param {string} email - User's email
 * @returns {Promise<Object>} - Result object
 */
export const resendVerificationEmail = async (email) => {
  try {
    // Note: This requires the user to be signed in to Firebase
    const currentUser = auth.currentUser;
    
    if (currentUser && currentUser.email === email) {
      await sendEmailVerification(currentUser);
      return { success: true, message: `Verification email sent to ${email}` };
    } else {
      // If no user is signed in, we can't resend via Firebase
      // In production, you'd use a backend function to send this
      console.log('No authenticated user. In production, use Cloud Functions to send verification emails.');
      return { 
        success: false, 
        message: 'Unable to resend. Please try signing up again or contact support.' 
      };
    }
  } catch (error) {
    return { success: false, message: error.message || 'Failed to resend verification email' };
  }
};
