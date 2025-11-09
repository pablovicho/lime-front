import { useState } from 'react';

interface NoteFormProps {
  onSubmitText: (title: string, content: string) => void;
  onSubmitAudio: (title: string, audioFile: File) => void;
  disabled: boolean;
}

export default function NoteForm({ onSubmitText, onSubmitAudio, disabled }: NoteFormProps) {
  const [inputType, setInputType] = useState<'text' | 'audio'>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputType === 'text' && title && content) {
      onSubmitText(title, content);
      setTitle('');
      setContent('');
    } else if (inputType === 'audio' && title && audioFile) {
      onSubmitAudio(title, audioFile);
      setTitle('');
      setAudioFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>Create Note</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '20px' }}>
          <input
            type="radio"
            value="text"
            checked={inputType === 'text'}
            onChange={() => setInputType('text')}
            style={{ marginRight: '5px' }}
          />
          Text Note
        </label>
        <label>
          <input
            type="radio"
            value="audio"
            checked={inputType === 'audio'}
            onChange={() => setInputType('audio')}
            style={{ marginRight: '5px' }}
          />
          Audio Note
        </label>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="note-title" style={{ display: 'block', marginBottom: '5px' }}>
          Title:
        </label>
        <input
          id="note-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          required
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {inputType === 'text' ? (
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="note-content" style={{ display: 'block', marginBottom: '5px' }}>
            Content:
          </label>
          <textarea
            id="note-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note content"
            required
            rows={6}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </div>
      ) : (
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="audio-file" style={{ display: 'block', marginBottom: '5px' }}>
            Audio File:
          </label>
          <input
            id="audio-file"
            type="file"
            accept=".mp3,.wav,.m4a,.webm,.ogg"
            onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
          {audioFile && <p style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>Selected: {audioFile.name}</p>}
        </div>
      )}

      <button
        type="submit"
        disabled={disabled}
        style={{
          padding: '12px 24px',
          fontSize: '14px',
          backgroundColor: disabled ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {disabled ? 'Select a patient first' : 'Create Note'}
      </button>
    </form>
  );
}
