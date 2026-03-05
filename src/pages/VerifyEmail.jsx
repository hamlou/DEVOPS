import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import SEO from '../components/SEO';
import { auth } from '../firebase';
import { sendEmailVerification } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    console.log('VerifyEmail mounted, location.state:', location.state);
    // Get email from navigation state
    const email = location.state?.email;
    console.log('Email from state:', email);
    
    if (!email) {
      setErrorMessage('No email provided. Please sign up again.');
      setTimeout(() => navigate('/login'), 3000);
    } else {
      setUserEmail(email);
      console.log('✅ Verification email sent to:', email);
    }

    // Listen for Firebase auth state changes (when user clicks verification link)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === email && user.emailVerified) {
        console.log('✅ Email verified successfully!');
        setIsVerified(true);
        setSuccessMessage('Email verified successfully! Redirecting...');
        
        // Update user context and redirect
        setTimeout(() => {
          login(email, ''); // Login with email
          navigate('/');
        }, 2000);
      }
    });

    return () => unsubscribe();
  }, [navigate, location.state, login]);

  const handleResendEmail = async () => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.email === userEmail) {
        await sendEmailVerification(currentUser);
        setSuccessMessage('✅ Verification email resent! Check your inbox.');
      } else {
        setErrorMessage('Unable to resend. Please try signing up again.');
      }
    } catch (error) {
      setErrorMessage('Failed to resend. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <SEO
        title="Verify Email"
        description="Verify your email address to complete registration."
      />

      {/* Background */}
      <div className="bg"></div>
      <div className="grid-overlay"></div>

      <div className="wrapper">
        <div className="card">
          <div className="logo-wrap">
            <div className="logo-tfc">TFC</div>
          </div>
          <div className="tagline">The Total Full Contact Championship</div>

          {/* Verification Form */}
          <form
            className="form active"
            id="form-verification"
          >
            {/* Error/Success Messages */}
            {errorMessage && (
              <div style={{ 
                background: '#e01818', 
                color: 'white', 
                padding: '12px', 
                borderRadius: '8px', 
                marginBottom: '16px', 
                textAlign: 'center',
                border: '2px solid #8b0000'
              }}>
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div style={{ 
                background: '#1a1a1a', 
                color: '#e01818', 
                padding: '12px', 
                borderRadius: '8px', 
                marginBottom: '16px', 
                textAlign: 'center',
                border: '2px solid #e01818',
                fontWeight: '600'
              }}>
                {successMessage}
              </div>
            )}

            {isVerified && (
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <svg style={{ width: '64px', height: '64px', color: '#e01818' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>
                {isVerified ? 'Email Verified!' : 'Check Your Email'}
              </h3>
              
              {!isVerified ? (
                <>
                  <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '16px' }}>
                    We've sent a verification link to<br />
                    <span style={{ color: '#e01818', fontWeight: '600' }}>{userEmail}</span>
                  </p>
                  
                  <div style={{ 
                    background: 'rgba(224, 24, 24, 0.1)', 
                    border: '1px solid #e01818',
                    borderRadius: '8px', 
                    padding: '16px',
                    marginBottom: '16px'
                  }}>
                    <p style={{ fontSize: '13px', color: '#ccc', margin: 0 }}>
                      📧 <strong>Next steps:</strong>
                    </p>
                    <ol style={{ fontSize: '13px', color: '#ccc', margin: '8px 0 0 0', paddingLeft: '20px' }}>
                      <li style={{ marginBottom: '4px' }}>Open your email inbox</li>
                      <li style={{ marginBottom: '4px' }}>Find the email from TFC</li>
                      <li>Click the verification link in the email</li>
                    </ol>
                    <p style={{ fontSize: '12px', color: '#999', marginTop: '12px', fontStyle: 'italic' }}>
                      ⏳ You'll be automatically redirected after verification.
                    </p>
                  </div>
                </>
              ) : (
                <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '16px' }}>
                  Your email has been verified. Redirecting you to the home page...
                </p>
              )}
            </div>

            {!isVerified && (
              <>
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={handleResendEmail}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Resend Verification Email'}
                </button>

                <div className="switch-text" style={{ marginTop: '24px' }}>
                  Wrong email?{' '}
                  <span 
                    onClick={() => navigate('/login')} 
                    style={{ cursor: 'pointer', color: '#e01818' }}
                  >
                    Go back
                  </span>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
