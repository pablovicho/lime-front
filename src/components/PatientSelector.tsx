import type { Patient } from '../models';

interface PatientSelectorProps {
  patients: Patient[];
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
}

export default function PatientSelector({ patients, selectedPatientId, onSelectPatient }: PatientSelectorProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="patient-select" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
        Select Patient:
      </label>
      <select
        id="patient-select"
        value={selectedPatientId}
        onChange={(e) => onSelectPatient(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '14px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      >
        <option value="">-- Select a patient --</option>
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.firstName} {patient.lastName} - MRN: {patient.medicalRecordNumber}
          </option>
        ))}
      </select>
    </div>
  );
}
