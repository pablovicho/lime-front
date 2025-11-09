import type { Note } from '@/models';

interface NoteDetailProps {
  note: Note | null;
  onClose: () => void;
}

export default function NoteDetail({ note, onClose }: NoteDetailProps) {
  if (!note) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          maxWidth: '700px',
          maxHeight: '80vh',
          overflow: 'auto',
          width: '90%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>{note.title}</h2>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              backgroundColor: '#f0f0f0',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>

        <div style={{ marginBottom: '15px', fontSize: '14px', color: '#666' }}>
          <p><strong>Type:</strong> {note.inputType === 'audio' ? '🎤 Audio' : '📝 Text'}</p>
          <p><strong>Status:</strong> {note.status}</p>
          <p><strong>Created:</strong> {new Date(note.createdAt).toLocaleString()}</p>
          {note.createdBy && <p><strong>Created by:</strong> {note.createdBy}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Content</h3>
          <div style={{ 
            whiteSpace: 'pre-wrap', 
            backgroundColor: '#f9f9f9', 
            padding: '15px', 
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
            fontSize: '14px',
            lineHeight: '1.6',
          }}>
            {note.content}
          </div>
        </div>

        {note.inputType === 'audio' && (
          <div style={{ marginBottom: '20px' }}>
            <h3>Original Transcription</h3>
            <div style={{ 
              whiteSpace: 'pre-wrap', 
              backgroundColor: '#f0f0f0', 
              padding: '15px', 
              borderRadius: '4px',
              border: '1px solid #d0d0d0',
              fontSize: '14px',
              lineHeight: '1.6',
            }}>
              {note.originalInput}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
