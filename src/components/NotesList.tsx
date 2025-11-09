import type { Note } from '../models';

interface NotesListProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
}

export default function NotesList({ notes, onSelectNote }: NotesListProps) {
  if (notes.length === 0) {
    return <p style={{ color: '#666', fontStyle: 'italic' }}>No notes available. Create one to get started.</p>;
  }

  return (
    <div>
      <h3>Notes</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => onSelectNote(note)}
            style={{
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              cursor: 'pointer',
              backgroundColor: '#fff',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{note.title}</h4>
                <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
                  {note.inputType === 'audio' ? '🎤 Audio' : '📝 Text'} | {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span style={{ fontSize: '12px', color: '#999' }}>Click to view</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
