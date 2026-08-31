import { ShieldAlert } from 'lucide-react';

export default function RestrictedNotice({ roleDisplay }) {
  return (
    <div className="admin__restricted">
      <ShieldAlert size={28} />
      <h2>Restricted to admins</h2>
      <p>
        Your role (<strong>{roleDisplay}</strong>) doesn't have access to this section.
        Ask a super admin if you need it.
      </p>
    </div>
  );
}
