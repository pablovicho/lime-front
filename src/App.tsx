import { useState, useEffect } from 'react';

import type { Note } from './models/Note';
import type { Patient } from './services/api';

import { api } from './services/api';
import PatientSelector from './components/PatientSelector';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import NoteDetail from './components/NoteDetail';
import PatientSidebar from './components/PatientSidebar';

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    if (selectedPatientId) {
      loadPatient(selectedPatientId);
      loadNotes(selectedPatientId);
    } else {
      setSelectedPatient(null);
      setNotes([]);
    }
  }, [selectedPatientId]);

  const loadPatients = async () => {
    try {
      const data = await api.getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error loading patients:', error);
      alert('Failed to load patients');
    }
  };

  const loadPatient = async (id: string) => {
    try {
      const data = await api.getPatient(id);
      setSelectedPatient(data);
    } catch (error) {
      console.error('Error loading patient:', error);
    }
  };

  const loadNotes = async (patientId: string) => {
    try {
      const data = await api.getNotesByPatient(patientId);
      setNotes(data);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleCreateTextNote = async (title: string, content: string) => {
    if (!selectedPatientId) return;

    setLoading(true);
    try {
      await api.createTextNote(selectedPatientId, title, content);
      await loadNotes(selectedPatientId);
      alert('Note created successfully!');
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAudioNote = async (title: string, audioFile: File) => {
    if (!selectedPatientId) return;

    setLoading(true);
    try {
      await api.createAudioNote(audioFile, selectedPatientId, title);
      await loadNotes(selectedPatientId);
      alert('Audio note created successfully!');
    } catch (error) {
      console.error('Error creating audio note:', error);
      alert('Failed to create audio note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>AI Scribe Notes</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
        <div>
          <PatientSelector
            patients={patients}
            selectedPatientId={selectedPatientId}
            onSelectPatient={setSelectedPatientId}
          />

          {loading && (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              Processing... Please wait.
            </div>
          )}

          <NoteForm
            onSubmitText={handleCreateTextNote}
            onSubmitAudio={handleCreateAudioNote}
            disabled={!selectedPatientId || loading}
          />

          <NotesList notes={notes} onSelectNote={setSelectedNote} />
        </div>

        <div>
          <PatientSidebar patient={selectedPatient} />
        </div>
      </div>

      <NoteDetail note={selectedNote} onClose={() => setSelectedNote(null)} />
    </div>
  );
}

export default App;
