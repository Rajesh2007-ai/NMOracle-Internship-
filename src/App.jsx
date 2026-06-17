import React, { useState } from 'react';

function App() {
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'React Components Assignment', subject: 'Web Dev', dueDate: '2026-06-20', status: 'Pending' },
    { id: 2, title: 'Python Loop Exercises', subject: 'Python', dueDate: '2026-06-15', status: 'Submitted' },
    { id: 3, title: 'ML Preprocessing Presentation', subject: 'Machine Learning', dueDate: '2026-06-12', status: 'Late' },
  ]);

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Web Dev');
  const [dueDate, setDueDate] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const total = assignments.length;
  const submitted = assignments.filter(a => a.status === 'Submitted').length;
  const pending = assignments.filter(a => a.status === 'Pending').length;
  const late = assignments.filter(a => a.status === 'Late').length;

  const handleAddAssignment = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return alert('Please enter all details, baby!');

    const newTrack = {
      id: Date.now(),
      title,
      subject,
      dueDate,
      status: 'Pending'
    };

    setAssignments([...assignments, newTrack]);
    setTitle('');
    setDueDate('');
  };

  const toggleStatus = (id, currentStatus) => {
    let nextStatus = 'Pending';
    if (currentStatus === 'Pending') nextStatus = 'Submitted';
    else if (currentStatus === 'Submitted') nextStatus = 'Late';
    
    setAssignments(assignments.map(a => a.id === id ? { ...a, status: nextStatus } : a));
  };

  const filteredAssignments = selectedFilter === 'All' 
    ? assignments 
    : assignments.filter(a => a.subject === selectedFilter);

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif', maxWidth: '850px', margin: '40px auto', padding: '25px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', color: '#1a1a1a', marginBottom: '30px', fontWeight: '700' }}>🎓 College Assignment Submission Tracker</h2>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <div style={{ flex: 1, padding: '15px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '10px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '28px' }}>{total}</h2> <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.9 }}>Total Tasks</p>
        </div>
        <div style={{ flex: 1, padding: '15px', backgroundColor: '#10b981', color: 'white', borderRadius: '10px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '28px' }}>{submitted}</h2> <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.9 }}>Submitted</p>
        </div>
        <div style={{ flex: 1, padding: '15px', backgroundColor: '#f59e0b', color: 'white', borderRadius: '10px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '28px' }}>{pending}</h2> <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.9 }}>Pending</p>
        </div>
        <div style={{ flex: 1, padding: '15px', backgroundColor: '#ef4444', color: 'white', borderRadius: '10px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '28px' }}>{late}</h2> <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.9 }}>Late</p>
        </div>
      </div>

      <form onSubmit={handleAddAssignment} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', marginBottom: '35px', border: '1px solid #e2e8f0' }}>
        <input type="text" placeholder="Enter Assignment Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ flex: 2, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
        <select value={subject} onChange={(e) => setSubject(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: 'white' }}>
          <option value="Web Dev">Web Dev</option>
          <option value="Python">Python</option>
          <option value="Machine Learning">Machine Learning</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
        <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: '#1e293b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>+ Add Task</button>
      </form>

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: '600', color: '#475569', fontSize: '14px' }}>Filter by Subject:</span>
        {['All', 'Web Dev', 'Python', 'Machine Learning'].map(sub => (
          <button type="button" key={sub} onClick={() => setSelectedFilter(sub)} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #e2e8f0', cursor: 'pointer', backgroundColor: selectedFilter === sub ? '#1e293b' : '#f1f5f9', color: selectedFilter === sub ? 'white' : '#475569' }}>{sub}</button>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '14px', color: '#64748b' }}>Assignment Details</th>
              <th style={{ padding: '14px', color: '#64748b' }}>Subject</th>
              <th style={{ padding: '14px', color: '#64748b' }}>Due Date</th>
              <th style={{ padding: '14px', color: '#64748b' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px', fontWeight: '600', color: '#334155' }}>{item.title}</td>
                <td style={{ padding: '14px' }}><span style={{ padding: '4px 10px', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '6px', fontSize: '12px' }}>{item.subject}</span></td>
                <td style={{ padding: '14px', color: '#64748b' }}>{item.dueDate}</td>
                <td style={{ padding: '14px' }}>
                  <button type="button" onClick={() => toggleStatus(item.id, item.status)} style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '12px', backgroundColor: item.status === 'Submitted' ? '#10b981' : item.status === 'Pending' ? '#f59e0b' : '#ef4444' }}>{item.status}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;