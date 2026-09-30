import { Hospital, SocialListeningSignal, MedicalImageScan, ConsultationHistoryRecord, PharmacyHistoryRecord, Prescription, DigitalTwinOrgan, VitalSigns, EmergencyRequest } from "@/types";

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'Apollo Apex Multispecialty & Trauma Center',
    type: 'PRIVATE',
    rating: 4.9,
    reviewCount: 1420,
    address: '42 Medical Enclave, Sector 62',
    city: 'Metro City',
    latitude: 28.6139,
    longitude: 77.2090,
    distanceKm: 2.1,
    emergency24x7: true,
    petCare: false,
    hasDroneDelivery: true,
    totalBeds: 450,
    availableBeds: 68,
    icuTotal: 80,
    icuAvailable: 14,
    activeAmbulances: 12,
    avgWaitTimeMinutes: 12,
    crowdLevel: 'LOW',
    specialties: ['Cardiology', 'Neurology', 'Emergency Trauma', 'Organ Transplant', 'Oncology'],
    phone: '+1 (800) 555-APEX',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'hosp-2',
    name: 'AIIMS Central Metropolitan Government Hospital',
    type: 'GOVERNMENT',
    rating: 4.7,
    reviewCount: 3890,
    address: 'Ring Road, Medical Hub Central',
    city: 'Metro City',
    latitude: 28.5672,
    longitude: 77.2100,
    distanceKm: 4.5,
    emergency24x7: true,
    petCare: false,
    hasDroneDelivery: true,
    totalBeds: 1200,
    availableBeds: 142,
    icuTotal: 180,
    icuAvailable: 23,
    activeAmbulances: 28,
    avgWaitTimeMinutes: 25,
    crowdLevel: 'HIGH',
    specialties: ['General Medicine', 'Neurosurgery', 'Pediatrics', 'Burn Unit', 'Pulmonology'],
    phone: '+1 (800) 555-AIIMS',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'hosp-3',
    name: 'Fortis Memorial Heart & Vascular Institute',
    type: 'PRIVATE',
    rating: 4.8,
    reviewCount: 980,
    address: 'Sector 44, Expressway Corridor',
    city: 'Metro City',
    latitude: 28.4595,
    longitude: 77.0266,
    distanceKm: 6.8,
    emergency24x7: true,
    petCare: false,
    hasDroneDelivery: true,
    totalBeds: 320,
    availableBeds: 54,
    icuTotal: 65,
    icuAvailable: 11,
    activeAmbulances: 9,
    avgWaitTimeMinutes: 10,
    crowdLevel: 'LOW',
    specialties: ['Interventional Cardiology', 'Electrophysiology', 'Vascular Surgery'],
    phone: '+1 (800) 555-FORTIS',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'hosp-4',
    name: 'St. Jude Children & Maternity Super Speciality',
    type: 'PRIVATE',
    rating: 4.9,
    reviewCount: 750,
    address: '88 Boulevard Heights',
    city: 'Metro City',
    latitude: 28.6353,
    longitude: 77.2250,
    distanceKm: 5.2,
    emergency24x7: true,
    petCare: false,
    hasDroneDelivery: false,
    totalBeds: 210,
    availableBeds: 39,
    icuTotal: 40,
    icuAvailable: 8,
    activeAmbulances: 6,
    avgWaitTimeMinutes: 15,
    crowdLevel: 'MODERATE',
    specialties: ['Pediatrics', 'Neonatal ICU', 'Obstetrics', 'Gynecology'],
    phone: '+1 (800) 555-JUDE',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'hosp-5',
    name: 'Paws & Care 24/7 Veterinary Emergency Hospital',
    type: 'PRIVATE',
    rating: 4.8,
    reviewCount: 430,
    address: '15 Green Park Avenue',
    city: 'Metro City',
    latitude: 28.5580,
    longitude: 77.2030,
    distanceKm: 3.4,
    emergency24x7: true,
    petCare: true,
    hasDroneDelivery: false,
    totalBeds: 60,
    availableBeds: 18,
    icuTotal: 12,
    icuAvailable: 5,
    activeAmbulances: 3,
    avgWaitTimeMinutes: 8,
    crowdLevel: 'LOW',
    specialties: ['Veterinary Trauma', 'Canine & Feline ICU', 'Pet Surgery', 'Poison Control'],
    phone: '+1 (800) 555-PAWS',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&auto=format&fit=crop&q=80'
  }
];

export const MOCK_INITIAL_VITALS: VitalSigns = {
  heartRate: 74,
  spO2: 98,
  systolicBP: 120,
  diastolicBP: 78,
  respiratoryRate: 16,
  temperature: 98.6,
  stressLevel: 22,
  bloodGlucose: 95,
  ecgStatus: 'NORMAL',
  timestamp: new Date().toISOString()
};

export const MOCK_DIGITAL_TWIN: DigitalTwinOrgan[] = [
  {
    name: 'Heart',
    healthScore: 94,
    status: 'OPTIMAL',
    metrics: { 'HRV': '68 ms', 'Stroke Volume': '72 mL', 'Arterial Elasticity': '97%', 'QTC Interval': '410 ms' },
    aiAlerts: ['Rhythm is harmonious. Normal sinus pattern observed.']
  },
  {
    name: 'Lungs',
    healthScore: 91,
    status: 'OPTIMAL',
    metrics: { 'Tidal Volume': '510 mL', 'SpO2 Efficiency': '99%', 'Airway Resistance': 'Normal' },
    aiAlerts: ['Clean breath sound symmetry. No wheezing.']
  },
  {
    name: 'Brain',
    healthScore: 88,
    status: 'STABLE',
    metrics: { 'Cortical Activity': 'Balanced', 'Sleep Quality Index': '84/100', 'Stress Score': '22/100' },
    aiAlerts: ['Mild evening fatigue detected; recommended 7.5 hours rest.']
  },
  {
    name: 'Kidneys',
    healthScore: 96,
    status: 'OPTIMAL',
    metrics: { 'eGFR': '>90 mL/min', 'Hydration Index': 'Adequate', 'Electrolyte Balance': 'Optimal' },
    aiAlerts: ['Hydration levels ideal. Electrolyte profile within normal limits.']
  },
  {
    name: 'Liver',
    healthScore: 92,
    status: 'OPTIMAL',
    metrics: { 'Metabolic Clearance': 'Good', 'Enzymatic Activity': 'Normal' },
    aiAlerts: ['Metabolic processing normal.']
  }
];

export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'RX-2026-98124',
    patientId: 'pat-001',
    patientName: 'Alex Mercer',
    doctorId: 'doc-001',
    doctorName: 'Dr. Sarah Jenkins, MD, FACC',
    doctorSpecialty: 'Cardiologist',
    hospitalName: 'Apollo Apex Multispecialty Hospital',
    date: '2026-09-28',
    diagnosis: 'Mild Stage-1 Hypertension with Exercise-Induced Arrhythmia prophylaxis',
    items: [
      {
        id: 'med-1',
        medicineName: 'Telmisartan 40mg',
        dosage: '1 tablet daily',
        frequency: 'Morning after breakfast',
        duration: '30 Days',
        instructions: 'Monitor BP once a week',
        isControlledSubstance: false
      },
      {
        id: 'med-2',
        medicineName: 'Metoprolol Succinate 25mg ER',
        dosage: '1 tablet daily',
        frequency: 'Evening',
        duration: '30 Days',
        instructions: 'Do not crush extended release tablet',
        isControlledSubstance: false
      },
      {
        id: 'med-3',
        medicineName: 'Omega-3 Marine Lipid 1000mg',
        dosage: '1 softgel twice daily',
        frequency: 'With meals',
        duration: '60 Days',
        instructions: 'Cardiovascular maintenance supplement',
        isControlledSubstance: false
      }
    ],
    blockchainHash: '0x7f9a2b84c01e687893a7d2b4510ce9a0f3d99e28bc01d9f8e4c7310aa81b239f',
    qrCodeData: 'PULSEWATCH_VERIFIED_HASH_0x7f9a2b84c01e687893a7d2b4510ce9a0f3d99e28bc01d9f8e4c7310aa81b239f',
    status: 'ISSUED',
    aiDrugInteractionWarnings: [
      'Verified: No severe drug-drug interactions detected between Telmisartan and Metoprolol.'
    ]
  },
  {
    id: 'RX-2026-87410',
    patientId: 'pat-001',
    patientName: 'Alex Mercer',
    doctorId: 'doc-002',
    doctorName: 'Dr. Vikram Sethi, MD',
    doctorSpecialty: 'Pulmonologist',
    hospitalName: 'AIIMS Central Hospital',
    date: '2026-08-15',
    diagnosis: 'Seasonal Bronchial Allergy with Reactive Cough',
    items: [
      {
        id: 'med-4',
        medicineName: 'Levocetirizine + Montelukast (5mg/10mg)',
        dosage: '1 tablet at bedtime',
        frequency: 'Night',
        duration: '10 Days',
        instructions: 'Take with warm water',
        isControlledSubstance: false
      },
      {
        id: 'med-5',
        medicineName: 'Budesonide 200mcg DPI Inhaler',
        dosage: '1 puff as needed',
        frequency: 'SOS Max 2 puffs/day',
        duration: '1 Device',
        instructions: 'Rinse mouth after inhalation',
        isControlledSubstance: false
      }
    ],
    blockchainHash: '0x1c4e98f02ba947ad5e908123fa765b4c12d87e56aa099182bf901c2384a11223',
    qrCodeData: 'PULSEWATCH_VERIFIED_HASH_0x1c4e98f02ba947ad5e908123fa765b4c12d87e56aa099182bf901c2384a11223',
    status: 'DISPENSED',
    pharmacyDispensed: {
      pharmacyName: 'MediLife 24/7 Super Pharmacy',
      dispensedAt: '2026-08-15T18:22:00Z',
      pharmacistName: 'Rajesh Sharma, R.Ph'
    },
    aiDrugInteractionWarnings: []
  }
];

export const MOCK_SOCIAL_SIGNALS: SocialListeningSignal[] = [
  {
    id: 'soc-1',
    source: 'TWITTER',
    hospitalName: 'Apollo Apex Multispecialty',
    author: '@HealthWatcher_99',
    sentiment: 'POSITIVE',
    content: 'Massive shoutout to @ApolloApex! Their PulseWatch AI SOS triage had an ambulance at our door in 4 minutes flat when my father had chest tightness.',
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    safetyCategory: 'PRAISE',
    aiConfidence: 0.98,
    actionTaken: 'Auto-logged to Super Admin commendation board'
  },
  {
    id: 'soc-2',
    source: 'HOSPITAL_FEEDBACK',
    hospitalName: 'AIIMS Central Metropolitan',
    author: 'Patient #49102',
    sentiment: 'URGENT_SAFETY',
    content: 'OPD Hall C ticket dispenser jammed, queue spilling over 70+ patients in cardiology wait area. Risk of patient fainting.',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    safetyCategory: 'LONG_WAIT_TIMES',
    aiConfidence: 0.94,
    actionTaken: 'Automated crowd diversion alert dispatched to floor manager'
  },
  {
    id: 'soc-3',
    source: 'GOOGLE_REVIEWS',
    hospitalName: 'St. Jude Children Hospital',
    author: 'Maria G.',
    sentiment: 'POSITIVE',
    content: 'The pediatric digital twin tracker gave our doctor instant insight before we even arrived. Clean, world-class staff and caring pediatricians.',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    safetyCategory: 'PRAISE',
    aiConfidence: 0.96
  },
  {
    id: 'soc-4',
    source: 'INTERNAL_AUDIT',
    hospitalName: 'Fortis Memorial Heart',
    author: 'AI Medication Safety Bot',
    sentiment: 'URGENT_SAFETY',
    content: 'Pharmacy safety gate intercepted high-dosage Morphine prescription for Patient #1093 without secondary oncologist authorization.',
    timestamp: new Date(Date.now() - 1000 * 60 * 190).toISOString(),
    safetyCategory: 'MEDICATION_ERROR',
    aiConfidence: 0.99,
    actionTaken: 'Prescription locked. Sent for Dr. Supervisor dual-signature verification.'
  }
];

export const MOCK_IMAGE_SCANS: MedicalImageScan[] = [
  {
    id: 'scan-1',
    patientId: 'pat-001',
    patientName: 'Alex Mercer',
    scanType: 'CHEST_XRAY',
    scanDate: '2026-09-29',
    imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
    aiFindings: [
      {
        condition: 'Clear Bilateral Lung Fields',
        confidence: 0.98,
        severity: 'NORMAL',
        description: 'No consolidation, pleural effusion, or pneumothorax identified.'
      },
      {
        condition: 'Cardiothoracic Ratio (CTR)',
        confidence: 0.95,
        severity: 'NORMAL',
        description: 'Heart size within normal physiological boundaries (CTR: 0.44).'
      }
    ],
    doctorVerified: true
  },
  {
    id: 'scan-2',
    patientId: 'pat-003',
    patientName: 'Eleanor Vance',
    scanType: 'BRAIN_MRI',
    scanDate: '2026-09-30',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80',
    aiFindings: [
      {
        condition: 'Early Microvascular Ischemic Changes',
        confidence: 0.91,
        severity: 'MILD',
        description: 'Punctate T2/FLAIR hyperintensities in deep white matter consistent with chronic small vessel disease.'
      }
    ],
    doctorVerified: false
  }
];

export const MOCK_ACTIVE_EMERGENCY: EmergencyRequest = {
  id: 'SOS-2026-7789',
  patientId: 'pat-001',
  patientName: 'Alex Mercer',
  patientAge: 34,
  patientGender: 'Male',
  patientPhone: '+1 (555) 019-2834',
  bloodGroup: 'O+ Positive',
  category: 'CARDIAC_ARREST',
  severity: 'CRITICAL',
  status: 'EN_ROUTE',
  latitude: 28.6145,
  longitude: 77.2105,
  address: 'Avenue 4, Central Park Residences, Flat 402',
  timestamp: new Date(Date.now() - 1000 * 180).toISOString(),
  assignedHospital: {
    id: 'hosp-1',
    name: 'Apollo Apex Multispecialty & Trauma Center',
    distanceKm: 1.8,
    etaMinutes: 4,
    phone: '+1 (800) 555-APEX'
  },
  assignedAmbulance: {
    id: 'amb-104',
    vehicleNumber: 'APEX-EMERGENCY-04',
    driverName: 'Officer Marcus Vance',
    driverPhone: '+1 (555) 902-1144',
    paramedicName: 'Paramedic Elena Rostova',
    currentLat: 28.6140,
    currentLng: 28.6140,
    speedKmH: 64
  },
  assignedDrone: {
    id: 'drn-08',
    droneCode: 'PULSE-AERO-08',
    payloadType: 'DEFIBRILLATOR_AED',
    batteryLevel: 92,
    etaMinutes: 2,
    currentLat: 28.6142,
    currentLng: 77.2102
  },
  aiTriageSummary: 'AI Telemetry detected acute ST-segment elevation & tachycardia (HR 142 bpm). Dispatched ALS Ambulance + AED Drone payload immediately.',
  vitalsSnapshot: {
    heartRate: 142,
    spO2: 91,
    systolicBP: 158,
    diastolicBP: 98,
    respiratoryRate: 26,
    temperature: 99.2,
    stressLevel: 94,
    bloodGlucose: 110,
    ecgStatus: 'ST_ELEVATION',
    timestamp: new Date().toISOString()
  }
};

export const MOCK_CONSULTATION_HISTORY: ConsultationHistoryRecord[] = [
  {
    id: 'CON-9812',
    date: '2026-09-28T14:30:00Z',
    patientId: 'pat-001',
    patientName: 'Alex Mercer',
    patientAge: 34,
    doctorId: 'doc-001',
    doctorName: 'Dr. Sarah Jenkins, MD',
    hospitalName: 'Apollo Apex Multispecialty',
    chiefComplaint: 'Occasional palpitations and elevated resting heart rate during high-stress meetings',
    symptoms: ['Palpitations', 'Mild dizziness', 'Tension headache'],
    diagnosis: 'Stage-1 Essential Hypertension with Sinus Tachycardia',
    treatmentPlan: 'Initiated Telmisartan 40mg and Metoprolol 25mg ER. Advised continuous wearable ECG monitoring.',
    prescriptionId: 'RX-2026-98124',
    followUpDate: '2026-10-28',
    aiSuggestedDiagnosis: '98% confidence: Autonomic arousal with borderline hypertension'
  },
  {
    id: 'CON-8421',
    date: '2026-08-15T11:00:00Z',
    patientId: 'pat-001',
    patientName: 'Alex Mercer',
    patientAge: 34,
    doctorId: 'doc-002',
    doctorName: 'Dr. Vikram Sethi, MD',
    hospitalName: 'AIIMS Central Hospital',
    chiefComplaint: 'Dry persistent nocturnal cough and pollen-triggered sneezing',
    symptoms: ['Sneezing', 'Nocturnal cough', 'Rhinorrhea'],
    diagnosis: 'Seasonal Allergic Rhinitis with reactive bronchial hypersensitivity',
    treatmentPlan: 'Prescribed Levocetirizine/Montelukast and Budesonide DPI inhaler.',
    prescriptionId: 'RX-2026-87410',
    followUpDate: '2026-09-01',
    aiSuggestedDiagnosis: '96% confidence: Allergic Airway Hyper-responsiveness'
  }
];

export const MOCK_PHARMACY_HISTORY: PharmacyHistoryRecord[] = [
  {
    id: 'PH-4421',
    date: '2026-09-28T16:15:00Z',
    prescriptionId: 'RX-2026-98124',
    patientName: 'Alex Mercer',
    patientPhone: '+1 (555) 019-2834',
    doctorName: 'Dr. Sarah Jenkins, MD',
    medicines: [
      { name: 'Telmisartan 40mg', quantity: 30, dosage: '1 tab daily', controlled: false },
      { name: 'Metoprolol 25mg ER', quantity: 30, dosage: '1 tab daily', controlled: false },
      { name: 'Omega-3 1000mg', quantity: 60, dosage: '2 softgels daily', controlled: false }
    ],
    totalAmount: 48.50,
    status: 'DELIVERED_BY_DRONE',
    blockchainTxHash: '0x88f01bca7298d0113ef400921bbd839201fba419082a938c11e5',
    patientFeedbackScore: 5
  },
  {
    id: 'PH-3190',
    date: '2026-08-15T18:22:00Z',
    prescriptionId: 'RX-2026-87410',
    patientName: 'Alex Mercer',
    patientPhone: '+1 (555) 019-2834',
    doctorName: 'Dr. Vikram Sethi, MD',
    medicines: [
      { name: 'Levocetirizine/Montelukast', quantity: 10, dosage: '1 tab night', controlled: false },
      { name: 'Budesonide 200mcg DPI', quantity: 1, dosage: '1 puff SOS', controlled: false }
    ],
    totalAmount: 24.00,
    status: 'COMPLETED',
    blockchainTxHash: '0x55aa0182ec88390bb91230ca9810fec50183921bda70019283f',
    patientFeedbackScore: 5
  }
];
