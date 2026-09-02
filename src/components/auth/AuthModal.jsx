import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, Eye, EyeOff, Waves, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { canManageAdmin } from '../../pages/admin/roles';
import './AuthModal.css';

export default function AuthModal() {
  const {
    authModalOpen,
    authModalTab,
    setAuthModalTab,
    closeAuthModal,
    login,
    register,
    isLoading,
    error,
    setError,
  } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordMismatch =
    authModalTab === 'register' && confirmPassword.length > 0 && password !== confirmPassword;

  // Reset fields on modal open / tab switch
  useEffect(() => {
    if (authModalOpen) {
      setError(null);
      setPassword('');
      setConfirmPassword('');
    }
  }, [authModalOpen, authModalTab, setError]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && authModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [authModalOpen, closeAuthModal]);

  if (!authModalOpen) return null;

  const goToDashboard = (user) => {
    navigate(canManageAdmin(user) ? '/admin' : '/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authModalTab === 'login') {
      const result = await login(email, password);
      if (result.success) goToDashboard(result.user);
    } else {
      if (!fullName.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please check and try again.');
        return;
      }
      const result = await register(fullName, email, password);
      if (result.success) goToDashboard(result.user);
    }
  };

  return (
    <div className="auth-overlay" onClick={closeAuthModal} role="dialog" aria-modal="true">
      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="auth-modal__close"
          onClick={closeAuthModal}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="auth-modal__header">
          <div className="auth-modal__badge">
            <Waves size={14} className="auth-modal__badge-icon" />
            <span>Blue Ocean Platform</span>
          </div>
          <h2 className="auth-modal__title">
            {authModalTab === 'login' ? 'Welcome Back' : 'Join Blue Ocean'}
          </h2>
          <p className="auth-modal__subtitle">
            {authModalTab === 'login'
              ? 'Access marine research, field dispatches, and saved expeditions.'
              : 'Create an account to explore Somalia’s ocean ecosystems and research initiatives.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-modal__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={authModalTab === 'login'}
            className={`auth-modal__tab ${authModalTab === 'login' ? 'auth-modal__tab--active' : ''}`}
            onClick={() => setAuthModalTab('login')}
          >
            Sign In
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={authModalTab === 'register'}
            className={`auth-modal__tab ${authModalTab === 'register' ? 'auth-modal__tab--active' : ''}`}
            onClick={() => setAuthModalTab('register')}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="auth-modal__alert" role="alert">
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form className="auth-modal__form" onSubmit={handleSubmit}>
          {authModalTab === 'register' && (
            <div className="auth-modal__field">
              <label className="auth-modal__label" htmlFor="auth-full-name">
                Full Name
              </label>
              <div className="auth-modal__input-wrapper">
                <User size={18} className="auth-modal__input-icon" />
                <input
                  id="auth-full-name"
                  type="text"
                  className="auth-modal__input"
                  placeholder="e.g. Farhiya Warsame"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>
          )}

          <div className="auth-modal__field">
            <label className="auth-modal__label" htmlFor="auth-email">
              Email Address
            </label>
            <div className="auth-modal__input-wrapper">
              <Mail size={18} className="auth-modal__input-icon" />
              <input
                id="auth-email"
                type="email"
                className="auth-modal__input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus={authModalTab === 'login'}
              />
            </div>
          </div>

          <div className="auth-modal__field">
            <div className="auth-modal__label-row">
              <label className="auth-modal__label" htmlFor="auth-password">
                Password
              </label>
            </div>
            <div className="auth-modal__input-wrapper">
              <Lock size={18} className="auth-modal__input-icon" />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                className="auth-modal__input"
                placeholder={authModalTab === 'login' ? '••••••••' : 'Min. 8 characters'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={authModalTab === 'register' ? 8 : undefined}
              />
              <button
                type="button"
                className="auth-modal__show-pass"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password — only on register tab */}
          {authModalTab === 'register' && (
            <div className="auth-modal__field">
              <label className="auth-modal__label" htmlFor="auth-confirm-password">
                Confirm Password
              </label>
              <div className="auth-modal__input-wrapper">
                <Lock size={18} className="auth-modal__input-icon" />
                <input
                  id="auth-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`auth-modal__input${passwordMismatch ? ' auth-modal__input--error' : ''}`}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-modal__show-pass"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwordMismatch && (
                <span className="auth-modal__field-error">Passwords do not match</span>
              )}
            </div>
          )}

          <button
            type="submit"
            className="auth-modal__submit btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="auth-modal__spinner" />
            ) : (
              <>
                <span>{authModalTab === 'login' ? 'Sign In to Account' : 'Create My Account'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Benefits / Trust micro-banner */}
        <div className="auth-modal__footer">
          <div className="auth-modal__perks">
            <span className="auth-modal__perk">
              <ShieldCheck size={14} className="auth-modal__perk-icon" />
              Secure Data & Auth
            </span>
            <span className="auth-modal__perk">
              <Sparkles size={14} className="auth-modal__perk-icon" />
              Open Marine Science
            </span>
          </div>
          <div className="auth-modal__switch">
            {authModalTab === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  className="auth-modal__link-btn"
                  onClick={() => setAuthModalTab('register')}
                >
                  Create one here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  className="auth-modal__link-btn"
                  onClick={() => setAuthModalTab('login')}
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
