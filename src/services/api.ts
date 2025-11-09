import type { Patient, Note } from '../models';

const API_BASE_URL = 'http://localhost:3000/api';

interface PatientResponse extends Omit<Patient, 'dateOfBirth' | 'createdAt' | 'updatedAt'> {
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
}

interface NoteResponse extends Omit<Note, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
  patient?: PatientResponse;
}

// Helper to convert API response to model
const toPatient = (data: PatientResponse): Patient => ({
  ...data,
  dateOfBirth: new Date(data.dateOfBirth),
  createdAt: new Date(data.createdAt),
  updatedAt: new Date(data.updatedAt),
});

const toNote = (data: NoteResponse): Note => ({
  ...data,
  originalInput: data.originalInput || '',
  createdAt: new Date(data.createdAt),
  updatedAt: new Date(data.updatedAt),
});

export const api = {
  // Patients
  async getPatients(): Promise<Patient[]> {
    const response = await fetch(`${API_BASE_URL}/patients`);
    const data = await response.json();
    return data.data.map(toPatient);
  },

  async getPatient(id: string): Promise<Patient> {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`);
    const data = await response.json();
    return toPatient(data.data);
  },

  // Notes
  async getNotes(): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/notes`);
    const data = await response.json();
    return data.data.map(toNote);
  },

  async getNotesByPatient(patientId: string): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/notes/patient/${patientId}`);
    const data = await response.json();
    return data.data.map(toNote);
  },

  async createTextNote(patientId: string, title: string, content: string, createdBy?: string): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientId,
        title,
        content,
        inputType: 'text',
        originalInput: content,
        status: 'completed',
        createdBy,
      }),
    });
    const data = await response.json();
    return toNote(data.data);
  },

  async createAudioNote(
    audioFile: File,
    patientId: string,
    title: string,
    createdBy?: string
  ): Promise<Note> {
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('patientId', patientId);
    formData.append('title', title);
    if (createdBy) formData.append('createdBy', createdBy);

    const response = await fetch(`${API_BASE_URL}/notes/audio`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return toNote(data.data.note);
  },
};
