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
    
    // Check for URL query parameters (when coming from email verification link)
    const urlParams = new URLSearchParams(window.location.search);
    const isVerifiedFromLink = urlParams.get('verified') === 'true';
    
    // Get email from navigation state OR Firebase current user
    const email = location.state?.email || auth.currentUser?.email;
    console.log('Email from state:', email);
    console.log('Verified from link:', isVerifiedFromLink);
    
    if (isVerifiedFromLink && email) {
      // User clicked verification link and was redirected back
      console.log('✅ Email verified via link!');
      setIsVerified(true);
      setSuccessMessage('Email verified successfully! Redirecting...');
      
      // Update user context and redirect to home
      setTimeout(() => {
        login(email, ''); // Login with email
        navigate('/'); // Redirect to home page
      }, 2000);
      return;
    }
    
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
          navigate('/'); // Redirect to home page
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
                    padding: '20px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ textAlign: 'left', marginBottom: '12px' }}>
                      <p style={{ fontSize: '14px', color: '#fff', fontWeight: '600', marginBottom: '12px' }}>
                        📧 <strong>Next Steps:</strong>
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: '24px', 
                            height: '24px',
                            background: '#e01818',
                            color: '#fff',
                            borderRadius: '50%',
                            fontSize: '12px',
                            fontWeight: '700'
                          }}>1</span>
                          <span style={{ fontSize: '13px', color: '#ddd' }}>Open your email inbox</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: '24px', 
                            height: '24px',
                            background: '#e01818',
                            color: '#fff',
                            borderRadius: '50%',
                            fontSize: '12px',
                            fontWeight: '700'
                          }}>2</span>
                          <span style={{ fontSize: '13px', color: '#ddd' }}>Find the email from TFC</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: '24px', 
                            height: '24px',
                            background: '#e01818',
                            color: '#fff',
                            borderRadius: '50%',
                            fontSize: '12px',
                            fontWeight: '700'
                          }}>3</span>
                          <span style={{ fontSize: '13px', color: '#ddd' }}>Click the verification link</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: '24px', 
                            height: '24px',
                            background: '#e01818',
                            color: '#fff',
                            borderRadius: '50%',
                            fontSize: '12px',
                            fontWeight: '700'
                          }}>4</span>
                          <span style={{ fontSize: '13px', color: '#ddd' }}>Return to this page and sign in</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ 
                      borderTop: '1px solid rgba(224, 24, 24, 0.3)',
                      paddingTop: '12px',
                      marginTop: '12px'
                    }}>
                      <p style={{ fontSize: '12px', color: '#e01818', fontStyle: 'italic', margin: 0 }}>
                        ⏳ After verifying, return here and sign in with your credentials
                      </p>
                    </div>
                  </div>
                  
                  <div style={{
                    background: 'rgba(255, 165, 0, 0.1)',
                    border: '1px solid #ffa500',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '16px'
                  }}>
                    <p style={{ fontSize: '13px', color: '#ffa500', margin: 0 }}>
                      ℹ️ <strong>Note:</strong> After clicking the verification link in your email, you'll see a confirmation page. Simply click "Continue" or return to this page to sign in.
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
