# Lime Frontend - AI Scribe Notes

Minimal frontend for the lime-backend API endpoints.

## Features

- **Patient Selector**: Dropdown to select patients
- **Note Form**: Create notes via text input or audio file upload
- **Notes List**: View all notes for selected patient with click-to-view details
- **Patient Sidebar**: Display patient information panel
- **Note Detail Modal**: Full note content viewer with transcription for audio notes

## Running the App

```bash
pnpm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in terminal).

## Backend Requirement

Make sure the backend is running at `http://localhost:3000` before using the frontend.

```bash
cd ../lime-backend
pnpm run dev
```

## Usage

1. Select a patient from the dropdown
2. Patient info will appear in the sidebar
3. Create notes using either:
   - Text input: Enter title and content
   - Audio upload: Select an audio file (mp3, wav, m4a, webm, ogg)
4. View created notes in the list below
5. Click any note to view full details in a modal

## API Integration

The app connects to these backend endpoints:
- `GET /api/patients` - Load all patients
- `GET /api/patients/:id` - Get patient details
- `GET /api/notes/patient/:patientId` - Get notes for a patient
- `POST /api/notes` - Create text note
- `POST /api/notes/audio` - Create audio note (with transcription)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.