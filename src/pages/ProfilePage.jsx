import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  Mail,
  Phone,
  Shield,
  Calendar,
  Camera,
  Pencil,
  Lock,
  Bell,
  Clock,
  BadgeCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { uploadMedia, mediaUrl } from '../lib/contentApi';
import './ProfilePage.css';

const NOTIFICATION_OPTIONS = [
  { key: 'new_contact_messages', label: 'New contact messages' },
  { key: 'volunteer_enquiries', label: 'Volunteer enquiries' },
  { key: 'partnership_enquiries', label: 'Partnership enquiries' },
  { key: 'new_article_published', label: 'New article published' },
  { key: 'system_updates', label: 'System updates' },
];

const ACTION_COPY = {
  created: 'Added',
  updated: 'Updated',
  published: 'Published',
};

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

function formatDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function ProfilePage() {
  const { user, isAuthenticated, token, updateProfile, changePassword, updateNotificationPreferences, fetchActivity } = useAuth();

  const [editingDetails, setEditingDetails] = useState(false);
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [nameStatus, setNameStatus] = useState('idle'); // idle | saving | success | error
  const [nameError, setNameError] = useState(null);
  const fileInputRef = useRef(null);

  const [securityOpen, setSecurityOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('idle');
  const [passwordError, setPasswordError] = useState(null);

  const [notifications, setNotifications] = useState(user?.notification_preferences || {});
  const [notificationsStatus, setNotificationsStatus] = useState('idle');

  const [activity, setActivity] = useState(null);

  useEffect(() => {
    document.title = 'My Profile — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      setPhone(user.phone || '');
      setAvatarUrl(user.avatar_url || '');
      setNotifications(user.notification_preferences || {});
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchActivity().then((result) => {
      if (result.success) setActivity(result.activity);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const initial = user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase();
  const roleDisplay = user.role?.replace('_', ' ') || 'Member';
  const memberSince = formatDate(user.created_at);

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const media = await uploadMedia(token, file);
      const url = mediaUrl(media);
      setAvatarUrl(url);
      await updateProfile(fullName || user.full_name || '', phone, url);
    } catch (err) {
      setNameStatus('error');
      setNameError(err.message);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    setNameStatus('saving');
    setNameError(null);
    const result = await updateProfile(fullName, phone, avatarUrl);
    if (result.success) {
      setNameStatus('success');
      setTimeout(() => {
        setNameStatus('idle');
        setEditingDetails(false);
      }, 900);
    } else {
      setNameStatus('error');
      setNameError(result.error);
    }
  };

  const cancelEditDetails = () => {
    setFullName(user.full_name || '');
    setPhone(user.phone || '');
    setNameStatus('idle');
    setNameError(null);
    setEditingDetails(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);

    if (newPassword.length < 8) {
      setPasswordStatus('error');
      setPasswordError('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus('error');
      setPasswordError('Passwords do not match.');
      return;
    }

    setPasswordStatus('saving');
    const result = await changePassword(currentPassword, newPassword);
    if (result.success) {
      setPasswordStatus('success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setPasswordStatus('idle');
        setSecurityOpen(false);
      }, 1400);
    } else {
      setPasswordStatus('error');
      setPasswordError(result.error);
    }
  };

  const toggleNotification = async (key) => {
    const next = { ...notifications, [key]: !notifications[key] };
    setNotifications(next);
    setNotificationsStatus('saving');
    const result = await updateNotificationPreferences({ [key]: next[key] });
    setNotificationsStatus(result.success ? 'saved' : 'error');
    setTimeout(() => setNotificationsStatus('idle'), 1500);
  };

  return (
    <main id="main-content" className="profile-page" aria-label="My Profile">
      <div className="container">
        <div className="profile-hero">
          <div className="profile-hero__banner" />
          <div className="profile-hero__body">
            <div className="profile-hero__avatar-wrap">
              {avatarUrl ? (
                <img src={avatarUrl} alt={user.full_name || user.email} className="profile-hero__avatar-img" />
              ) : (
                <div className="profile-hero__avatar">{initial}</div>
              )}
              <button
                type="button"
                className="profile-hero__avatar-edit"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPhoto}
                aria-label="Change profile photo"
                title="Change profile photo"
              >
                <Camera size={14} />
              </button>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden onChange={handlePhotoChange} />
            </div>

            <div className="profile-hero__info">
              <div className="profile-hero__name-row">
                <h1 className="profile-hero__name">{user.full_name || 'Blue Ocean User'}</h1>
                <span className="profile-hero__verified">
                  <BadgeCheck size={14} />
                  <span>Verified Profile</span>
                </span>
              </div>
              {memberSince && (
                <p className="profile-hero__since">
                  <Calendar size={14} />
                  <span>Member since {memberSince}</span>
                </p>
              )}
            </div>

            <button type="button" className="btn btn-outline btn-sm profile-hero__edit-btn" onClick={() => setEditingDetails(true)}>
              <Pencil size={14} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        <div className="profile-page__grid">
          <section className="profile-card profile-card--details">
            <div className="profile-card__header">
              <h2 className="profile-card__title">
                <span>Profile details</span>
              </h2>
              {!editingDetails && (
                <button type="button" className="profile-card__edit-link" onClick={() => setEditingDetails(true)}>
                  <Pencil size={13} />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {!editingDetails ? (
              <div className="profile-details-grid">
                <div className="profile-detail">
                  <div className="profile-detail__icon"><Mail size={16} /></div>
                  <div>
                    <span className="profile-detail__label">Email</span>
                    <span className="profile-detail__value">{user.email}</span>
                  </div>
                </div>
                <div className="profile-detail">
                  <div className="profile-detail__icon"><Phone size={16} /></div>
                  <div>
                    <span className="profile-detail__label">Phone</span>
                    <span className="profile-detail__value">{user.phone || '—'}</span>
                  </div>
                </div>
                <div className="profile-detail">
                  <div className="profile-detail__icon"><Shield size={16} /></div>
                  <div>
                    <span className="profile-detail__label">Role</span>
                    <span className="profile-detail__value profile-detail__value--capitalize">{roleDisplay}</span>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNameSubmit} className="profile-form">
                <div className="profile-form__group">
                  <label htmlFor="profile-full-name">Full Name</label>
                  <input
                    id="profile-full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    minLength={2}
                    required
                  />
                </div>
                <div className="profile-form__group">
                  <label htmlFor="profile-email">Email</label>
                  <input id="profile-email" type="email" value={user.email} disabled />
                  <span className="profile-form__hint">Email can't be changed here — contact an admin.</span>
                </div>
                <div className="profile-form__group">
                  <label htmlFor="profile-phone">Phone</label>
                  <input
                    id="profile-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Optional"
                  />
                </div>

                {nameStatus === 'error' && (
                  <div className="profile-form__banner profile-form__banner--error">
                    <AlertTriangle size={15} />
                    <span>{nameError}</span>
                  </div>
                )}
                {nameStatus === 'success' && (
                  <div className="profile-form__banner profile-form__banner--success">
                    <CheckCircle2 size={15} />
                    <span>Saved.</span>
                  </div>
                )}

                <div className="profile-form__actions">
                  <button type="submit" className="btn btn-primary" disabled={nameStatus === 'saving'}>
                    {nameStatus === 'saving' ? 'Saving…' : 'Save Changes'}
                  </button>
                  <button type="button" className="btn btn-outline" onClick={cancelEditDetails}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </section>

          <section className="profile-card profile-card--security">
            <div className="profile-security-banner">
              <div className="profile-security-banner__icon">
                <Lock size={20} />
              </div>
              <div className="profile-security-banner__copy">
                <h3>Account Security</h3>
                <p>Keep your account safe by using a strong, unique password.</p>
              </div>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setSecurityOpen((v) => !v)}>
                {securityOpen ? 'Close' : 'Manage'}
              </button>
            </div>

            {securityOpen && (
              <form onSubmit={handlePasswordSubmit} className="profile-form profile-form--security">
                <div className="profile-form__group">
                  <label htmlFor="profile-current-password">Current Password</label>
                  <input
                    id="profile-current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="profile-form__group">
                  <label htmlFor="profile-new-password">New Password</label>
                  <input
                    id="profile-new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                </div>
                <div className="profile-form__group">
                  <label htmlFor="profile-confirm-password">Confirm New Password</label>
                  <input
                    id="profile-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                </div>

                {passwordStatus === 'error' && (
                  <div className="profile-form__banner profile-form__banner--error">
                    <AlertTriangle size={15} />
                    <span>{passwordError}</span>
                  </div>
                )}
                {passwordStatus === 'success' && (
                  <div className="profile-form__banner profile-form__banner--success">
                    <CheckCircle2 size={15} />
                    <span>Password updated.</span>
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={passwordStatus === 'saving'}>
                  {passwordStatus === 'saving' ? 'Updating…' : 'Update Password'}
                </button>
              </form>
            )}
          </section>

          <section className="profile-card">
            <div className="profile-card__header">
              <h2 className="profile-card__title">
                <Bell size={18} />
                <span>Email Notifications</span>
              </h2>
              {notificationsStatus === 'saved' && <span className="profile-card__title-hint">Saved</span>}
            </div>
            <p className="profile-card__note">
              Choose what you'd hear about. (No emails send yet — Blue Ocean hasn't wired up outbound email;
              this just records your preference for when it does.)
            </p>
            <div className="profile-notifications">
              {NOTIFICATION_OPTIONS.map((opt) => (
                <div key={opt.key} className="profile-notifications__item">
                  <span>{opt.label}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={!!notifications[opt.key]}
                    className={`profile-switch ${notifications[opt.key] ? 'profile-switch--on' : ''}`}
                    onClick={() => toggleNotification(opt.key)}
                  >
                    <span className="profile-switch__thumb" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="profile-card">
            <div className="profile-card__header">
              <h2 className="profile-card__title">
                <Clock size={18} />
                <span>Recent Activity</span>
              </h2>
            </div>
            {activity === null && <p className="profile-card__note">Loading…</p>}
            {activity !== null && activity.length === 0 && (
              <p className="profile-card__note">No CMS activity yet — anything you publish or update will show up here.</p>
            )}
            {activity && activity.length > 0 && (
              <ul className="profile-activity">
                {activity.map((entry) => (
                  <li key={entry.id} className="profile-activity__item">
                    <span>
                      {ACTION_COPY[entry.action] || entry.action} <strong>"{entry.resource_label}"</strong>
                    </span>
                    <time>{timeAgo(entry.created_at)}</time>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
