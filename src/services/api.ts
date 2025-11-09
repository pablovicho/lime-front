const API_BASE_URL = 'http://localhost:3000/api';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber?: string;
  email?: string;
  medicalRecordNumber?: string;
}

export interface Note {
  id: string;
  patientId: string;
  title: string;
  content: string;
  inputType: 'text' | 'audio';
  originalInput: string;
  audioFileUrl?: string;
  status: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  patient?: Patient;
}

export const api = {
  // Patients
  async getPatients(): Promise<Patient[]> {
    const response = await fetch(`${API_BASE_URL}/patients`);
    const data = await response.json();
    return data.data;
  },

  async getPatient(id: string): Promise<Patient> {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`);
    const data = await response.json();
    return data.data;
  },

  // Notes
  async getNotes(): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/notes`);
    const data = await response.json();
    return data.data;
  },

  async getNotesByPatient(patientId: string): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/notes/patient/${patientId}`);
    const data = await response.json();
    return data.data;
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
    return data.data;
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
    return data.data.note;
  },
};
