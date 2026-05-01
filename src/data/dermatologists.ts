export type DoctorAvailability = {
  date: string;
  slots: string[];
};

export type Dermatologist = {
  id: string;
  name: string;
  title: string;
  hospital: string;
  about: string;
  image: string;
  rating: number;
  experienceYears: number;
  patients: string;
  priceUsd: number;
  nextAvailable: string;
  languages: string[];
  specialties: string[];
  availability: DoctorAvailability[];
};

const BASE_SLOTS = [
  ['09:00', '09:30', '10:15', '11:00', '14:00', '15:30', '16:45'],
  ['08:45', '10:00', '10:45', '12:00', '13:30', '15:00'],
  ['09:15', '10:30', '11:30', '14:15', '16:00'],
  ['08:30', '09:45', '11:15', '13:00', '14:45', '17:00'],
];

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getAvailability(seed: number): DoctorAvailability[] {
  const today = new Date();
  const result: DoctorAvailability[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const date = formatDate(d);
    const slotIndex = (seed + i) % BASE_SLOTS.length;
    result.push({
      date,
      slots: BASE_SLOTS[slotIndex],
    });
  }
  return result;
}

export const DERMATOLOGISTS: Dermatologist[] = [
  {
    id: 'dr-amina',
    name: 'Dr. Amina Ochieng',
    title: 'Consultant Dermatologist',
    hospital: 'Nairobi Skin & Laser Institute',
    about:
      'Specialized in acne management, pigmentation correction, and sensitive skin treatment plans with evidence-based protocols.',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    experienceYears: 12,
    patients: '8.4k+',
    priceUsd: 70,
    nextAvailable: 'Today, 14:00',
    languages: ['English', 'Swahili'],
    specialties: ['Acne', 'Hyperpigmentation', 'Sensitive Skin'],
    availability: getAvailability(0),
  },
  {
    id: 'dr-kimani',
    name: 'Dr. Brian Kimani',
    title: 'Dermatologic Surgeon',
    hospital: 'Prime Aesthetic Dermatology',
    about:
      'Experienced in scar revision, eczema care, and advanced procedural dermatology with personalized skincare plans.',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    experienceYears: 10,
    patients: '6.9k+',
    priceUsd: 65,
    nextAvailable: 'Tomorrow, 10:00',
    languages: ['English', 'Swahili', 'French'],
    specialties: ['Eczema', 'Scar Care', 'Procedures'],
    availability: getAvailability(1),
  },
  {
    id: 'dr-zuri',
    name: 'Dr. Zuri Patel',
    title: 'Cosmetic Dermatologist',
    hospital: 'DermaGlow Medical Center',
    about:
      'Focuses on anti-aging protocols, texture improvement, and melasma treatment for diverse skin tones.',
    image:
      'https://images.unsplash.com/photo-1594824475317-e6f66f2f5be0?auto=format&fit=crop&w=900&q=80',
    rating: 4.7,
    experienceYears: 9,
    patients: '5.2k+',
    priceUsd: 75,
    nextAvailable: 'Today, 16:45',
    languages: ['English', 'Hindi'],
    specialties: ['Anti-aging', 'Melasma', 'Texture'],
    availability: getAvailability(2),
  },
  {
    id: 'dr-otieno',
    name: 'Dr. James Otieno',
    title: 'Clinical Dermatologist',
    hospital: 'Greenfield Dermatology Clinic',
    about:
      'Treats chronic skin concerns including rosacea and dermatitis with long-term maintenance routines.',
    image:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    experienceYears: 14,
    patients: '9.1k+',
    priceUsd: 68,
    nextAvailable: 'Tomorrow, 08:45',
    languages: ['English', 'Swahili'],
    specialties: ['Rosacea', 'Dermatitis', 'Long-term Care'],
    availability: getAvailability(3),
  },
];

export function getDermatologistById(id?: string): Dermatologist | undefined {
  return DERMATOLOGISTS.find((doctor) => doctor.id === id);
}

