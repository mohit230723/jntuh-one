import React, { useState, useEffect } from 'react';
import { FileText, Search, ArrowRight, X, Pin } from 'lucide-react';
import { noticeService } from '../services/noticeService';
import { errorMessage } from '../services/mock';
import ErrorState from '../components/ErrorState';

export default function Examinations() {
  const [category, setCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    loadNotices();
  }, [category, search]);

  const loadNotices = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await noticeService.getNotices({
        category: category !== 'ALL' ? category : undefined,
        search: search.trim() || undefined
      });

      // Safely extract the array no matter how the API formats the response
      let list = [];
      if (Array.isArray(data)) {
        list = data;
      } else if (data && Array.isArray(data.content)) {
        list = data.content;
      } else if (data && Array.isArray(data.notices)) {
        list = data.notices;
      } else if (data && Array.isArray(data.data)) {
        list = data.data;
      }

      setNotices(list);
    } catch (err) {
      setNotices([]);
      setError(`Could not load notices. ${errorMessage(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['ALL', 'EXAM', 'ACADEMIC', 'EVENTS', 'GENERAL'];

  return (
    <div className="section-gap">
      <div className="layout-container">
        <div style={{ marginBottom: '40px' }}>
          <div className="eyebrow-pill" style={{ marginBottom: '16px' }}>EXAMINATION BRANCH</div>
          <h1 className="display-headline" style={{ fontSize: '48px', marginBottom: '16px' }}>
            Autonomous Examinations & Grading
          </h1>
          <p className="body-lead" style={{ maxWidth: '780px' }}>
            Governed by the autonomous controller of examinations with automated grading, digital marks memos, and continuous internal evaluations.
          </p>
        </div>

        {/* Grading Scale Table */}
        <div className="card-paper" style={{ padding: '32px', marginBottom: '48px' }}>
          <h3 className="heading-sm" style={{ marginBottom: '16px' }}>10-Point Absolute Letter Grading Scale</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-slate-900)' }}>
                  <th style={{ padding: '12px 16px' }}>Marks Percentage Range</th>
                  <th style={{ padding: '12px 16px' }}>Letter Grade</th>
                  <th style={{ padding: '12px 16px' }}>Grade Points</th>
                  <th style={{ padding: '12px 16px' }}>Performance Qualitative</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-frost)' }}>
                  <td style={{ padding: '12px 16px' }}>&gt;= 90%</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>O</td>
                  <td style={{ padding: '12px 16px' }}>10</td>
                  <td style={{ padding: '12px 16px', color: 'var(--color-success)', fontWeight: 600 }}>Outstanding</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-frost)' }}>
                  <td style={{ padding: '12px 16px' }}>80% to 89%</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>A+</td>
                  <td style={{ padding: '12px 16px' }}>9</td>
                  <td style={{ padding: '12px 16px' }}>Excellent</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-frost)' }}>
                  <td style={{ padding: '12px 16px' }}>70% to 79%</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>A</td>
                  <td style={{ padding: '12px 16px' }}>8</td>
                  <td style={{ padding: '12px 16px' }}>Very Good</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-frost)' }}>
                  <td style={{ padding: '12px 16px' }}>60% to 69%</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>B+</td>
                  <td style={{ padding: '12px 16px' }}>7</td>
                  <td style={{ padding: '12px 16px' }}>Good</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-frost)' }}>
                  <td style={{ padding: '12px 16px' }}>50% to 59%</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>B</td>
                  <td style={{ padding: '12px 16px' }}>6</td>
                  <td style={{ padding: '12px 16px' }}>Above Average</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-frost)' }}>
                  <td style={{ padding: '12px 16px' }}>40% to 49%</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>C</td>
                  <td style={{ padding: '12px 16px' }}>5</td>
                  <td style={{ padding: '12px 16px' }}>Pass</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px' }}>&lt; 40%</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-danger)' }}>F</td>
                  <td style={{ padding: '12px 16px' }}>0</td>
                  <td style={{ padding: '12px 16px', color: 'var(--color-danger)' }}>Fail</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Circulars List with Filter & Search */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <h3 className="heading-sm">Official Notifications & Circulars</h3>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Search box */}
              <div style={{ position: 'relative', width: '260px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '16px', color: 'var(--color-slate-600)' }} />
                <input
                  id="search-notices-input"
                  data-testid="search-notices-input"
                  type="text"
                  placeholder="Search notices..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '36px' }}
                />
              </div>

              {/* Category tabs */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {categories.map((c) => (
                  <button
                    key={c}
                    id={`category-tab-${c.toLowerCase()}`}
                    data-testid={`category-tab-${c.toLowerCase()}`}
                    onClick={() => setCategory(c)}
                    style={{
                      background: category === c ? 'var(--color-carbon)' : 'var(--color-paper)',
                      color: category === c ? '#ffffff' : 'var(--color-slate-700)',
                      border: '1px solid var(--color-cloud)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '8px 14px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="card-paper" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-slate-600)' }}>
              Loading announcements...
            </div>
          ) : error ? (
            <ErrorState message={error} onRetry={loadNotices} />
          ) : !Array.isArray(notices) || notices.length === 0 ? (
            <div className="card-paper" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-slate-600)' }}>
              No notices found matching "{search}" in category "{category}".
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Array.isArray(notices) && notices.map((n) => (
                <div 
                  key={n.id || Math.random()}
                  className="card-paper"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 24px',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease'
                  }}
                  onClick={() => setSelectedNotice(n)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', maxWidth: '85%' }}>
                    <div style={{
                      background: n.pinned ? 'rgba(228, 43, 12, 0.08)' : 'var(--color-vellum)',
                      padding: '10px',
                      borderRadius: 'var(--radius-lg)',
                      color: n.pinned ? 'var(--color-vermillion-signal)' : 'var(--color-slate-600)',
                      marginTop: '2px'
                    }}>
                      {n.pinned ? <Pin size={18} /> : <FileText size={18} />}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span className="eyebrow-pill" style={{ padding: '2px 8px', fontSize: '11px' }}>{n.category}</span>
                        {n.pinned && (
                          <span style={{ fontSize: '11px', color: 'var(--color-vermillion-signal)', fontWeight: 600 }}>PINNED</span>
                        )}
                        <span style={{ fontSize: '12px', color: 'var(--color-iron)' }}>{n.postedDate}</span>
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--color-slate-900)', marginBottom: '4px' }}>
                        {n.title}
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--color-slate-600)', margin: 0 }}>
                        {n.description}
                      </p>
                    </div>
                  </div>

                  <button 
                    className="btn-vermillion" 
                    style={{ padding: '8px 16px', fontSize: '12px', whiteSpace: 'nowrap' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNotice(n);
                    }}
                  >
                    View <ArrowRight size={14} style={{ marginLeft: '6px' }} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notice Detail Modal */}
        {selectedNotice && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div className="card-paper" style={{ maxWidth: '640px', width: '100%', padding: '32px', position: 'relative' }}>
              <button 
                onClick={() => setSelectedNotice(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-slate-600)'
                }}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
                <span className="eyebrow-pill">{selectedNotice.category}</span>
                <span style={{ fontSize: '13px', color: 'var(--color-iron)' }}>{selectedNotice.postedDate}</span>
                {selectedNotice.author && (
                  <span style={{ fontSize: '13px', color: 'var(--color-iron)' }}>• By {selectedNotice.author}</span>
                )}
              </div>

              <h2 className="heading-sm" style={{ marginBottom: '16px', lineHeight: 1.3 }}>
                {selectedNotice.title}
              </h2>

              <div style={{
                background: 'var(--color-vellum)',
                padding: '20px',
                borderRadius: 'var(--radius-lg)',
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'var(--color-slate-700)',
                marginBottom: '24px'
              }}>
                {selectedNotice.description}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button className="btn-carbon" onClick={() => setSelectedNotice(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
