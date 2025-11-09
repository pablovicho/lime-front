import type { Patient } from '../models';

interface PatientSidebarProps {
  patient: Patient | null;
}

export default function PatientSidebar({ patient }: PatientSidebarProps) {
  if (!patient) {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #ddd',
      }}>
        <h3>Patient Info</h3>
        <p style={{ color: '#666', fontStyle: 'italic' }}>No patient selected</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      border: '1px solid #ddd',
    }}>
      <h3 style={{ marginTop: 0 }}>Patient Info</h3>
      <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
        <p><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
        <p><strong>MRN:</strong> {patient.medicalRecordNumber}</p>
        <p><strong>DOB:</strong> {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        {patient.phoneNumber && <p><strong>Phone:</strong> {patient.phoneNumber}</p>}
        {patient.email && <p><strong>Email:</strong> {patient.email}</p>}
      </div>
    </div>
  );
}
