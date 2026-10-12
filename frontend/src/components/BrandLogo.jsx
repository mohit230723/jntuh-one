import React from 'react';

// JNTUH logo + site name. size = logo height in px.
export default function BrandLogo({ size = 40, subtitle = true }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', flexShrink: 0, whiteSpace: 'nowrap', marginRight: '24px' }}>
      <img
        src="/jntuh-logo.png"
        alt="JNTUH logo"
        width={Math.round(size * 0.93)}
        height={size}
        style={{ display: 'block', objectFit: 'contain' }}
      />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span style={{ fontWeight: 700, fontSize: size > 36 ? '19px' : '16px', color: 'var(--color-brand-navy)' }}>
          UCEST One
        </span>
        {subtitle && (
          <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-brand-magenta)' }}>
            JNTUH College of Engineering, Science &amp; Technology
          </span>
        )}
      </span>
    </span>
  );
}
