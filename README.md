# PulseWatch AI - Real-Time Social Listening for Patient Experience & Safety Signals

An AI-powered healthcare ecosystem connecting hospitals, doctors, patients, pharmacies, and ambulances with predictive intelligence and real-time monitoring.

## Features

### 15 Flagship AI Features

1. **AI Life Threat Prediction Engine** - Predicts heart attacks, strokes, and emergency risks before escalation
2. **Real-Time Monitoring** - Continuous patient monitoring with wearable device integration
3. **Emergency SOS System** - One-click emergency response with GPS detection
4. **Smart Prescriptions** - AI-assisted diagnosis, drug interaction warnings, and blockchain-secured prescriptions
5. **Social Listening AI** - Monitors patient feedback and generates safety alerts
6. **Live Ambulance Tracking** - Real-time ambulance tracking with traffic-aware routing
7. **Digital Twin Health** - Virtual patient replicas for continuous organ monitoring
8. **Smart Pharmacy** - Controlled substance monitoring and dosage limitations
9. **AI Mental Health Monitoring** - Detects stress, anxiety, and emotional distress
10. **Smart Wearable Integration** - Connects smartwatches, ECG monitors, glucose sensors
11. **Hospital Crowd Prediction** - Predicts OPD crowd buildup and ICU overload
12. **Blockchain Medical Records** - End-to-end encrypted, secure medical records
13. **AI Medical Imaging** - Upload and analyze X-rays, MRIs, CT scans
14. **Smart Bed Allocation** - Real-time ICU and ward management
15. **Drone-Based Emergency Delivery** - AI-powered delivery for blood and emergency medicines

## Portals

### Super Admin Portal
- Full hospital ecosystem control
- Manage hospitals, doctors, pharmacies
- Real-time emergency management
- AI safety monitoring dashboard
- Government & private hospital categorization

**Demo Login:** `admin@pulsewatch.ai` / any password

### Doctor Portal
- Patient management and digital health records
- AI-assisted prescription system
- Smart diagnosis suggestions
- Telemedicine support
- Voice-to-text prescription writing
- Role: Write, Edit, Read, Execute

**Demo Login:** `doctor@pulsewatch.ai` / any password

### Patient Portal
- Easy onboarding and AI voice navigation
- One-click SOS emergency
- AI health chatbot for first aid
- Digital health records
- Appointment booking
- Medicine ordering
- Ambulance tracking
- Role: Read, Execute

**Demo Login:** `patient@pulsewatch.ai` / any password

### Pharmacy Portal
- Prescription validation and QR code verification
- Medicine stock management
- Controlled substance monitoring
- High-dosage medicine limitation
- Delivery confirmation system
- Role: Read Only

**Demo Login:** `pharmacy@pulsewatch.ai` / any password

## Pages

- `/` - Landing page with feature overview
- `/login?role=patient` - Login page (change role to doctor, pharmacy, super-admin)
- `/emergency` - SOS Emergency Response System
- `/dashboard/patient` - Patient Dashboard
- `/dashboard/doctor` - Doctor Dashboard
- `/dashboard/pharmacy` - Pharmacy Dashboard
- `/dashboard/super-admin` - Super Admin Dashboard
- `/history/doctor` - Doctor-Patient Consultation History
- `/history/pharmacy` - Pharmacy-Patient Medicine History
- `/hospitals` - Hospital Discovery with filters

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI Components:** Custom components with Radix UI primitives
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State Management:** React Context (Auth, Theme)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
pulsewatch-ai/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── dashboard/           # Role-based dashboards
│   │   │   ├── patient/
│   │   │   ├── doctor/
│   │   │   ├── pharmacy/
│   │   │   └── super-admin/
│   │   ├── history/             # History pages
│   │   │   ├── doctor/
│   │   │   └── pharmacy/
│   │   ├── emergency/           # SOS Emergency page
│   │   ├── hospitals/         # Hospital discovery
│   │   ├── login/             # Authentication
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   └── ui/                # UI components
│   ├── context/               # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   └── types/
│       └── index.ts           # TypeScript types
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Key Features Implemented

### Emergency Response System
- Giant animated SOS button with pulse effect
- GPS-based emergency detection
- Auto-alert nearest hospitals
- AI severity classification
- Live ambulance tracking
- Emergency type selection (Cardiac, Accident, Breathing, etc.)
- First aid quick guide

### AI Health Chatbot
- First aid guidance for minor accidents
- Symptom checking
- Emergency detection and auto-SOS escalation
- Voice interaction support
- Medical FAQs

### History Management
- **Doctor-Patient History:** Consultations, symptoms, diagnosis, prescriptions
- **Pharmacy-Patient History:** Medicine delivery status, dates, feedback

### Hospital Discovery
- Government vs Private hospital filtering
- Emergency 24/7 filtering
- Pet care filtering
- Search by specialty, treatment
- Real-time availability
- Wait time display

### Role-Based Access Control
- Super Admin: Full system control
- Doctor: Write, Edit, Read, Execute
- Patient: Read, Execute
- Pharmacy: Read Only

## AI Features

The platform simulates AI capabilities through:
- Smart alerts and predictions
- Emergency severity detection
- Drug interaction warnings
- Sentiment monitoring
- Healthcare analytics

## Security Features

- Mock authentication with role-based access
- Local storage for session persistence
- Theme switching (Light/Dark mode)
- Responsive design for all devices

## Future Enhancements

For production deployment, consider:
- Backend API integration (Node.js/Express)
- Real database (PostgreSQL/MongoDB)
- Real-time websockets (Socket.io)
- AI model integration (OpenAI API)
- Blockchain integration for prescriptions
- Google Maps API for location services
- Push notifications
- Mobile app (React Native/Flutter)

## License

MIT License - Built for healthcare innovation

## Emergency Contact

In a real emergency, always call your local emergency number (e.g., 108, 911, 112).

---

**PulseWatch AI** - Saving lives through intelligent healthcare 🏥❤️
