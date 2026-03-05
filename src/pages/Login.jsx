import { useState } from "react";
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { signIn, signUp, signInWithGoogle } from '../firebase';
import './Login.css';

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'

  // Firebase authentication state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  /* ── Password strength logic (mirrors checkPw in tfc-auth.html) ── */
  const [signupPassword, setSignupPassword] = useState('');
  const tests = [
    { id: 'rule-len', label: '8+ characters', ok: signupPassword.length >= 8 },
    { id: 'rule-upper', label: 'Uppercase letter', ok: /[A-Z]/.test(signupPassword) },
    { id: 'rule-num', label: 'Number', ok: /[0-9]/.test(signupPassword) },
    { id: 'rule-special', label: 'Special character', ok: /[^A-Za-z0-9]/.test(signupPassword) },
  ];
  const score = tests.filter(t => t.ok).length;
  const strengthColors = ['', '#e01818', '#e07018', '#d4b800', '#55d080'];

  /* ── Password visibility ── */
  const [loginPwVisible, setLoginPwVisible] = useState(false);
  const [signupPwVisible, setSignupPwVisible] = useState(false);
  const [confirmPwVisible, setConfirmPwVisible] = useState(false);

  const eyeOpen = <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>;
  const eyeClosed = <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const email = document.getElementById('login-email')?.value;
    const password = document.getElementById('login-password')?.value;

    try {
      const result = await signIn(email, password);
      
      if (result.success) {
        // Login successful - update your app's user context
        login(email, password);
        setSuccessMessage('Welcome back!');
      } else {
        // Login failed - show error with better message
        const errorMsg = result.error || 'Failed to sign in. Please check your credentials.';
        
        // Handle specific Firebase errors
        let friendlyMessage = errorMsg;
        if (errorMsg.includes('auth/invalid-credential') || errorMsg.includes('invalid-credential')) {
          friendlyMessage = 'Invalid email or password. Please try again.';
        } else if (errorMsg.includes('auth/user-not-found')) {
          friendlyMessage = 'No account found with this email address.';
        } else if (errorMsg.includes('auth/wrong-password')) {
          friendlyMessage = 'Incorrect password. Please try again.';
        }
        
        setErrorMessage(friendlyMessage);
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const email = document.getElementById('signup-email')?.value;
    const password = document.getElementById('signup-password')?.value;
    const confirmPassword = document.getElementById('signup-confirm')?.value;

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please try again.');
      setIsLoading(false);
      return;
    }

    // Password validation
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    if (!hasMinLength) {
      setErrorMessage('Password must be at least 8 characters long.');
      setIsLoading(false);
      return;
    }

    if (!hasUppercase) {
      setErrorMessage('Password must contain at least one uppercase letter.');
      setIsLoading(false);
      return;
    }

    if (!hasNumber) {
      setErrorMessage('Password must contain at least one number.');
      setIsLoading(false);
      return;
    }

    if (!hasSpecialChar) {
      setErrorMessage('Password must contain at least one special character.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp(email, password);
      console.log('Signup result:', result);
      
      if (result.success) {
        console.log('Navigating to /verify-email with email:', email);
        // Signup successful - redirect to verification page with credentials
        navigate('/verify-email', { state: { email, password } });
      } else {
        // Signup failed - show error
        setErrorMessage(result.error || 'Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };



  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        // Google sign-in successful - update your app's user context
        login(result.user.email, 'google-oauth');
        setSuccessMessage(`Welcome, ${result.user.displayName || result.user.email}!`);
      } else {
        // Google sign-in failed - show error
        setErrorMessage(result.error || 'Failed to sign in with Google.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Login"
        description="Login to your TFC account to access exclusive live events and premium content."
      />

      {/* Identical background from tfc-auth.html */}
      <div className="bg"></div>
      <div className="grid-overlay"></div>

      <div className="wrapper">
        <div className="card">

          <div className="logo-wrap">
            <div className="logo-tfc">TFC</div>
          </div>
          <div className="tagline">The Total Full Contact Championship</div>

          {/* TABS - using React state for stable switching */}
          <div className="tabs">
            <div className={`tab-indicator${activeTab === 'signup' ? ' right' : ''}`} id="tab-indicator"></div>
            <div
              className={`tab${activeTab === 'login' ? ' active' : ''}`}
              id="tab-login"
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </div>
            <div
              className={`tab${activeTab === 'signup' ? ' active' : ''}`}
              id="tab-signup"
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </div>
          </div>

          {/* ── LOGIN FORM ── */}
          <form
            className={`form${activeTab === 'login' ? ' active' : ''}`}
            id="form-login"
            onSubmit={handleLoginSubmit}
          >
            {/* Error/Success Messages */}
            {errorMessage && (
              <div style={{ background: '#e01818', color: 'white', padding: '12px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center', border: '2px solid #8b0000' }}>
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div style={{ background: '#1a1a1a', color: '#e01818', padding: '12px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center', border: '2px solid #e01818', fontWeight: '600' }}>
                {successMessage}
              </div>
            )}

            <div className="field">
              <div className="field-inner">
                <div className="field-content">
                  <input type="email" id="login-email" placeholder=" " autoComplete="email" required />
                  <span className="field-label">Email address</span>
                </div>
              </div>
            </div>

            <div className="field">
              <div className="field-inner">
                <div className="field-content">
                  <input
                    type={loginPwVisible ? "text" : "password"}
                    id="login-password"
                    placeholder=" "
                    autoComplete="current-password"
                    required
                  />
                  <span className="field-label">Password</span>
                </div>
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setLoginPwVisible(!loginPwVisible)}
                  aria-label="Toggle"
                >
                  <svg id="eye-login-password" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {loginPwVisible ? eyeOpen : eyeClosed}
                  </svg>
                </button>
              </div>
            </div>

            <div className="row-options">
              <label className="remember">
                <input type="checkbox" /> Remember me
              </label>
              <a className="forgot" href="#">Forgot password?</a>
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            <div className="switch-text">First time here? <span onClick={() => setActiveTab('signup')}>Create account</span></div>
            <div className="divider"><span>or continue with</span></div>
            <button type="button" className="btn-google" onClick={handleGoogleSignIn}>
              <svg viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              Continue with Google
            </button>
          </form>

          {/* ── SIGN UP FORM ── */}
          <form
            className={`form${activeTab === 'signup' ? ' active' : ''}`}
            id="form-signup"
            onSubmit={handleSignupSubmit}
          >
            {/* Error/Success Messages */}
            {errorMessage && (
              <div style={{ background: '#e01818', color: 'white', padding: '12px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center', border: '2px solid #8b0000' }}>
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div style={{ background: '#1a1a1a', color: '#e01818', padding: '12px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center', border: '2px solid #e01818', fontWeight: '600' }}>
                {successMessage}
              </div>
            )}

            <div className="field">
              <div className="field-inner">
                <div className="field-content">
                  <input type="text" id="signup-username" placeholder=" " autoComplete="username" />
                  <span className="field-label">Username</span>
                </div>
              </div>
            </div>

            <div className="field">
              <div className="field-inner">
                <div className="field-content">
                  <input type="email" id="signup-email" placeholder=" " autoComplete="email" />
                  <span className="field-label">Email address</span>
                </div>
              </div>
            </div>

            <div className="field">
              <div className="field-inner">
                <div className="field-content">
                  <input
                    type={signupPwVisible ? "text" : "password"}
                    id="signup-password"
                    placeholder=" "
                    autoComplete="new-password"
                    onInput={(e) => setSignupPassword(e.target.value)}
                  />
                  <span className="field-label">Password</span>
                </div>
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setSignupPwVisible(!signupPwVisible)}
                  aria-label="Toggle"
                >
                  <svg id="eye-signup-password" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {signupPwVisible ? eyeOpen : eyeClosed}
                  </svg>
                </button>
              </div>
            </div>

            {/* STRENGTH BAR - exactly as in HTML, powered by React state */}
            <div className="strength-bar">
              <div
                className="strength-fill"
                id="strength-fill"
                style={{
                  width: `${(score / 4) * 100}%`,
                  background: strengthColors[score] || 'transparent',
                  boxShadow: score === 4 ? '0 0 8px rgba(85,208,128,0.5)' : 'none'
                }}
              ></div>
            </div>

            {/* PASSWORD RULES - matching the PASS/FAIL logic perfectly */}
            <div className="pw-rules">
              {tests.map(t => (
                <div
                  key={t.id}
                  className={`pw-rule${t.ok ? ' pass' : signupPassword.length > 0 ? ' fail' : ''}`}
                  id={t.id}
                >
                  <span className="dot"></span>{t.label}
                </div>
              ))}
            </div>

            <div className="field">
              <div className="field-inner">
                <div className="field-content">
                  <input type={confirmPwVisible ? "text" : "password"} id="signup-confirm" placeholder=" " autoComplete="new-password" />
                  <span className="field-label">Confirm password</span>
                </div>
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setConfirmPwVisible(!confirmPwVisible)}
                  aria-label="Toggle"
                >
                  <svg id="eye-signup-confirm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {confirmPwVisible ? eyeOpen : eyeClosed}
                  </svg>
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
            <div className="switch-text">Already a member? <span onClick={() => setActiveTab('login')}>Sign in</span></div>
          </form>

        </div>
      </div>
    </>
  );
}
