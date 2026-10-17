import { BRAND, QUICK_SETTINGS } from '../config';

const REF_IMG = 'https://www.narayanihospital.com/images/';
export const img = (p) => REF_IMG + p;
export const IMAGES = {
  building: img('snhrc-building.webp'),
  care: img('best-hospital-in-vellore.webp'),
  eyeCamp: img('eye-camp-offered-by-snhrc-vellore.webp'),
  healthCamp: img('eye-camp-2.webp'),
  waves: img('bg/waves.webp'),
};

/* ---------------- Specialities (Centres of Excellence) ---------------- */
// [slug, name, tagline?, iconKey?]
const RAW = [
  ['anaesthesiology', 'Anaesthesiology'], ['andrology', 'Andrology'],
  ['cardiology', 'Cardiology', 'Advanced and complex cardiac procedures under one department.', 'heart'],
  ['cardiovascular-thoracic-surgery', 'Cardiovascular & Thoracic Surgery'],
  ['community-medicine', 'Community Medicine'], ['critical-care', 'Critical Care'],
  ['dental', 'Dentistry', 'A broad range of dental treatments across dental sub-specialities.', 'tooth'],
  ['dermatology', 'Dermatology', 'Cosmetic, medical and surgical skin care in one department.', 'skin'],
  ['department-of-laboratory-medicine', 'Department of Laboratory Medicine'],
  ['diabetology', 'Diabetology'], ['emergency', 'Emergency'], ['endocrinology', 'Endocrinology'],
  ['ent', 'ENT & Head Neck Surgery'], ['general-medicine', 'General Medicine'],
  ['general-surgery', 'General Surgery'], ['geriatic-medicine', 'Geriatric Medicine'],
  ['hematology', 'Hematology'], ['interventional-radiology', 'Interventional Radiology'],
  ['liver-transplantation', 'Liver Transplantation', 'A dedicated division for liver and pancreatic care.', 'liver'],
  ['gastroenterology', 'Medical Gastroenterology', 'Care for complex gastrointestinal and hepatobiliary conditions.', 'gut'],
  ['medical-oncology', 'Medical Oncology'], ['microbiology', 'Microbiology'], ['nephrology', 'Nephrology'],
  ['neurology', 'Neuro Medicine'],
  ['neuro-surgery', 'Neuro Surgery', 'Experienced in complex brain and spine surgeries.', 'brain'],
  ['obstetric-care', 'Obstetrics and Gynaecology'], ['ophthalmology', 'Ophthalmology'],
  ['orthopaedics', 'Orthopaedics'], ['paediatrics', 'Paediatrics & Neonatology'],
  ['paediatrics-surgery', 'Paediatric Surgery'],
  ['pathology', 'Pathology', 'Histopathology, cytopathology and haematopathology services.', 'micro'],
  ['cosmetology-plastic-surgery', 'Plastic, Cosmetology & Reconstructive Surgery'],
  ['pulmonology', 'Pulmonary Medicine', 'Care for complex chest and respiratory problems.', 'lungs'],
  ['psychiatry', 'Psychiatry', 'Support for mental health conditions and de-addiction.', 'mind'],
  ['renal-transplant', 'Renal Transplantation'], ['rehabilitation', 'Rehabilitation'],
  ['radiology', 'Radiology, Imaging and Science'], ['rheumatology', 'Rheumatology'],
  ['reproductive-medicine', 'Reproductive Medicine'],
  ['surgical-gastroenterology', 'Surgical Gastroenterology'], ['surgical-oncology', 'Surgical Oncology'],
  ['urology', 'Urology', 'Modern, minimally invasive equipment for urological disorders.', 'kidney'],
  ['vascular-surgery', 'Vascular Surgery'],
];
export const SPECIALITIES = RAW.map(([slug, name, tagline, icon]) => ({
  slug, name, icon: icon || 'stetho',
  desc: tagline || `${name} care at ${BRAND} - sample department description.`,
  featured: Boolean(tagline),
}));
export const specialityBySlug = Object.fromEntries(SPECIALITIES.map((s) => [s.slug, s]));
export const FEATURED = SPECIALITIES.filter((s) => s.featured);

/* ---------------- Services ---------------- */
export const SERVICES = [
  { title: 'Insurance Services', text: 'Convenient, hassle-free hospitalisation for insured patients.', to: '/insurance', image: img('services/insurance-services-in-snhrc-vellore.webp'), icon: 'shield' },
  { title: 'Laboratory Services', text: 'A well-equipped lab for accurate, reliable results.', to: '/department-of-laboratory-medicine', image: img('services/laboratory-services-snhrc-vellore.webp'), icon: 'flask' },
  { title: 'Emergency Services', text: 'Swift response and compassionate care, around the clock.', to: '/emergency', image: img('services/emergency-services-in-vellore.webp'), icon: 'ambulance' },
  { title: 'Rehabilitation Services', text: 'Comprehensive care tailored to strengthen your recovery.', to: '/rehabilitation', image: img('services/rehablitation-services.webp'), icon: 'activity' },
  { title: 'Home Care Services', text: 'Caring for you at home, ensuring comfort and well-being.', to: '/home-care', image: img('services/homecare-services-snhrc-vellore.webp'), icon: 'home' },
  { title: 'Transfusion Services', text: 'Lifeline services, providing vital support in times of need.', to: '/blood-bank', image: img('services/transfusion-services-snhrc-vellore.webp'), icon: 'drop' },
];

export const WHY = [
  ['Medical Research', 'Our bio-medical research wing works on approved projects and trains research students in several disciplines.', 'flask'],
  ['Emergency', 'A well-equipped emergency department, open 24/7.', 'ambulance'],
  ['Laboratory', 'Careful, complete documentation is maintained for every laboratory activity.', 'micro'],
  ['General Surgery', 'Several surgical procedures are offered on a short-stay admission basis.', 'stetho'],
  ['Sleep Laboratory', 'A sleep laboratory to manage sleep-related problems effectively.', 'moon'],
  ['Pharmacy', 'A fully stocked pharmacy operating 24/7.', 'pill'],
  ['Paediatrics', 'Experienced paediatricians available 24x7, all 365 days.', 'baby'],
  ['Express Care', 'Round-the-clock quick-response emergency care.', 'clock'],
];
export const HIGHLIGHTS = [
  'Government health-scheme support in selected departments (sample)',
  'One of the larger dialysis departments in the district (sample)',
  'All specialities available under one roof',
  'Long-term rehab facilities in a calm, eco-friendly setting',
  'Well-equipped emergency department, 24/7',
  'Robotic surgery capabilities (sample)',
  'A highly advanced radiology department',
  'Gastroenterology department offering all procedures',
];
export const INTERNATIONAL = [
  'Expert Medical Opinion', 'Cost Estimation', 'Treatment Plan', 'Medical Visa Invitation Letter',
  'Admission Process', 'Round the Clock Helpline', '24 / 7 Assistance & Support', 'Discharge Process',
  'Local Accommodation', 'Easy Communication', 'Airport Pickup & Drop', 'Convenient Billing & Payments',
];
export const STATS = [
  { value: 120, label: 'Experienced Doctors' },
  { value: 800, label: 'Successful Renal Transplants' },
  { value: 25000, label: 'Successful Surgeries' },
  { value: 1200, label: 'Out-Patients Daily' },
];
export const CLINICS = [
  `${BRAND} Hospital - Location A`, `${BRAND} Clinic - Location B`,
  `${BRAND} Speciality Clinic - Location C`, `${BRAND} Clinic - Location D`,
];

export const FAQS = [
  { q: 'What services does the multi-specialty hospital offer?', a: 'A wide range of services including cardiology, orthopaedics, neurology, oncology, general medicine, paediatrics and more - comprehensive care under one roof. See the Specialities page for details.' },
  { q: `Where is ${BRAND} located?`, a: `${QUICK_SETTINGS.contact.address}. This is a demo address - replace it with your own.` },
  { q: 'How can I make an appointment?', a: 'Use the Contact page form, call the helpline, or visit the hospital directly. (In this demo the form does not send anything.)' },
  { q: 'How can I schedule an appointment?', a: 'Through the website or by contacting the front desk. We try to accommodate your preferred timing and schedule promptly.' },
  { q: 'How can I book an appointment online?', a: 'An online appointment desk helps schedule visits based on doctor availability. Please use the contact details on the Contact page.' },
  { q: 'Does the hospital have advanced diagnostic facilities?', a: 'Yes - digital radiography, fluoroscopy, mammography, OPG, multislice CT, 1.5T MRI and ultrasound units (sample list based on the reference site).' },
  { q: 'Does the hospital offer emergency services?', a: 'Yes. The emergency department operates 24/7.' },
  { q: 'Does the hospital provide 24/7 ambulance support?', a: 'Yes. Staffed ambulance services are available round the clock.' },
  { q: 'What insurance and TPA partners are accepted?', a: 'Major Indian health insurers are accepted, and we work with third-party administrators (TPAs) for cashless hospitalisation.' },
  { q: 'What facilities are available for international patients?', a: 'Expert medical opinions, treatment plans, cost estimations, visa invitation letters, admission and discharge guidance, 24/7 helpline, local accommodation help, airport pickup and billing assistance.' },
  { q: 'Are lab and imaging services available on-site?', a: 'Yes - pathology, CT, MRI, ultrasound and radiology are available on-site.' },
  { q: 'How do I reach the hospital from the city centre?', a: 'By taxi or car from the city centre; the nearest major railway hub is the best starting point, followed by road transport. (Sample directions.)' },
  { q: 'Does the hospital support international medical insurance?', a: 'The insurance department helps confirm eligibility and guides you through pre-authorisation, cashless treatment or reimbursement.' },
];

/* ---------------- Navigation ---------------- */
const L = (label, to) => ({ label, to });
export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About Us', children: [
    L('Hospital Overview', '/about-us'), L('Our Founder', '/founder'), L("Director's Message", '/director-message'),
    L('Vision And Mission', '/vision-mission'), L('Charity Initiatives', '/charity-initiatives'), L('Awards', '/awards'),
  ] },
  { label: 'Centres of Excellence', mega: true, children: [...SPECIALITIES.map((s) => L(s.name, `/${s.slug}`)), L('All Specialities', '/specialities')] },
  { label: 'Patient Care Service', children: [
    L('Master Health Check Up', '/master-health-check-up'), L('Department of Dietetics', '/department-of-dietetics'),
    L('Insurance Service', '/insurance'), L('International Patients', '/international-patient'),
    L('Home Care Services', '/home-care'), L('Blood Bank', '/blood-bank'),
  ] },
  { label: 'Facilities', to: '/facilities' },
  { label: 'More Info', children: [
    L('In the Media', '/news'), L('Latest Events', '/events'), L('Photo Gallery', '/photo-gallery'),
    L('Video Gallery', '/video-gallery'), L('Annual BMW', '/annual-bmw'), L('Careers', '/careers'),
    L('Academics', '/academics'), L('FAQ', '/faq'),
  ] },
  { label: 'Contact', to: '/contact' },
];

/* ---------------- Content pages (slug -> page) ---------------- */
const P = (title, intro, sections = [], extra = {}) => ({ title, intro, sections, type: 'content', ...extra });
const S = (h, p, list) => ({ h, p: Array.isArray(p) ? p : [p], list });
const SAMPLE = 'Sample content for the demo - replace with your organisation\'s own text.';

export const PAGES = {
  'about-us': P('Hospital Overview', `${BRAND} was built with a simple purpose: to provide quality medical care to less privileged rural communities at a standard on par with metropolitan hospitals.`, [
    S('Our story', ['From day one, our focus has been bridging the gap - offering advanced care, compassionate support and reliable treatment close to home, where it is needed most.', SAMPLE]),
    S('What sets us apart', 'A multi-speciality setup with experienced teams, modern diagnostics and a patient-first culture.', HIGHLIGHTS),
  ], { image: IMAGES.building }),
  founder: P('Our Founder', 'The vision that shaped the hospital: healthcare as service.', [
    S('A life of service', ['"The ultimate goal of human life is service to others." This guiding thought shapes everything we do.', SAMPLE]),
  ]),
  'director-message': P("Director's Message", 'A note to patients, families and partners.', [
    S('Welcome', ['Your health is our priority, and we are honoured to be your trusted multi-speciality hospital.', SAMPLE]),
  ]),
  'vision-mission': P('Vision And Mission', 'Where we are headed and how we get there.', [
    S('Vision', 'Accessible, advanced and compassionate healthcare for every family.'),
    S('Mission', 'Deliver evidence-based, ethical care; invest in people and technology; serve the community through outreach.', ['Patient-first care', 'Clinical excellence', 'Community outreach', 'Continuous learning']),
  ]),
  'charity-initiatives': P('Charity Initiatives', 'Healthcare camps, awareness programmes and compassionate community support.', [
    S('Free camps', 'Regular free health check-up and eye camps in nearby villages (sample).'),
    S('How to support', SAMPLE),
  ], { image: IMAGES.healthCamp }),
  awards: P('Awards', 'Recognition for quality, safety and service.', [
    S('Accreditations & awards', SAMPLE, ['Quality accreditation (sample)', 'Patient-safety recognition (sample)', 'Community-service award (sample)']),
  ]),
  'master-health-check-up': P('Master Health Check Up', 'Structured packages to screen your health.', [
    S('Packages (sample)', 'Choose a package that fits your age and risk profile.', ['Basic screening', 'Comprehensive adult check-up', 'Cardiac screening', "Women's wellness", 'Senior citizen package']),
    S('Book', 'Use the Contact page to request a slot. Demo only - no booking is created.'),
  ]),
  'department-of-dietetics': P('Department of Dietetics', 'Personalised nutrition guidance for recovery and everyday health.', [
    S('Services', SAMPLE, ['Inpatient diet planning', 'Diabetes and weight-management counselling', 'Renal and cardiac diets']),
  ]),
  insurance: P('Insurance Service', 'Convenient and hassle-free hospitalisation for insured patients.', [
    S('Cashless hospitalisation', 'Major insurers are accepted, and TPAs are supported for cashless admission.'),
    S('Our desk helps with', '', ['Eligibility checks', 'Pre-authorisation', 'Claim documentation', 'International insurance guidance']),
  ]),
  'international-patient': P('International Patients', 'World-class treatment tailored to your needs, with a supportive journey from enquiry to discharge.', [
    S('Services for international patients', '', INTERNATIONAL),
  ]),
  'home-care': P('Home Care Services', 'Caring for you at home, ensuring comfort and well-being.', [
    S('What is included (sample)', SAMPLE, ['Nursing care', 'Physiotherapy at home', 'Sample collection', 'Post-surgical follow-up']),
  ]),
  'blood-bank': P('Blood Bank', 'Lifeline transfusion services, providing vital support in times of need.', [
    S('Services', SAMPLE, ['Blood component separation', 'Voluntary donation drives', '24/7 availability']),
  ]),
  facilities: P('Facilities', 'Modern infrastructure designed around patient comfort and accurate diagnostics.', [
    S('Diagnostics', 'Digital radiography, fluoroscopy, mammography, OPG, multislice CT, 1.5T MRI and ultrasound.', null),
    S('Patient amenities', SAMPLE, ['24/7 emergency & ambulance', '24/7 pharmacy', 'Dialysis unit', 'Sleep laboratory', 'Rehabilitation centre']),
  ], { image: IMAGES.care }),
  'annual-bmw': P('Annual BMW Report', 'Annual bio-medical waste management disclosures.', [S('Reports', 'Sample page - upload your yearly reports here.')]),
  academics: P('Academics', 'Training, research and continuing medical education.', [
    S('Programmes', SAMPLE, ['Postgraduate training', 'Nursing and allied health', 'Research projects', 'Continuing medical education']),
  ]),
  'terms-services': P('Terms & Services', 'Terms of use for this demo website.', [S('Demo notice', 'This is a demonstration website. Nothing here is medical advice, and no real appointment, payment or submission takes place.')]),
  'privacy-policy': P('Privacy Policy', 'How this demo handles your data.', [
    S('Browser storage only', 'Preferences, saved items and drafts are kept in your own browser (localStorage). They never leave your device and do not sync across devices.'),
  ]),
  disclaimer: P('Disclaimer', 'Please read before using this site.', [S('Not medical advice', 'Content is sample material for design demonstration. Consult a qualified clinician for any health concern.')]),
  // special page types (rendered by dedicated components)
  specialities: { title: 'All Specialities', type: 'specialities', intro: 'Comprehensive, accessible and trusted care across every stage of life.' },
  faq: { title: "Health Care FAQ's", type: 'faq', intro: 'Reach out to our staff if you have additional questions. Your comfort is our priority.' },
  contact: { title: 'Contact Us', type: 'contact', intro: 'Give us a call or send a message.' },
  news: { title: 'In the Media', type: 'list', intro: 'Sample media coverage.', items: [1, 2, 3, 4, 5, 6].map((n) => ({ title: `Sample media feature ${n}`, date: `2026-0${n}-10`, text: SAMPLE })) },
  events: { title: 'Latest Events', type: 'list', intro: 'Camps, CMEs and community events (sample).', items: [
    { title: 'Free eye camp', date: '2026-03-14', text: 'Community eye screening camp in a nearby village.' },
    { title: 'World Kidney Day awareness', date: '2026-03-12', text: 'Awareness talk and free screening.' },
    { title: 'Free health check-up camp', date: '2026-05-02', text: 'General health screening for the local community.' },
    { title: 'Anniversary celebration', date: '2026-08-21', text: 'Celebrating another year of service.' },
  ] },
  'photo-gallery': { title: 'Photo Gallery', type: 'gallery', intro: 'Moments from our hospital and community programmes.' },
  'video-gallery': { title: 'Video Gallery', type: 'video', intro: 'Informative healthcare videos (sample placeholders).' },
  careers: { title: 'Careers', type: 'careers', intro: 'Join a team that puts patients first. Openings below are sample data.' },
  sitemap: { title: 'Sitemap', type: 'sitemap', intro: 'Every page on this site.' },
};

export const GALLERY = [IMAGES.building, IMAGES.care, IMAGES.eyeCamp, IMAGES.healthCamp, ...SERVICES.map((s) => s.image)];
export const JOBS = [
  { id: 'j1', title: 'Staff Nurse', dept: 'Nursing', type: 'Full time' },
  { id: 'j2', title: 'Lab Technician', dept: 'Laboratory', type: 'Full time' },
  { id: 'j3', title: 'Resident Medical Officer', dept: 'General Medicine', type: 'Full time' },
  { id: 'j4', title: 'Physiotherapist', dept: 'Rehabilitation', type: 'Part time' },
  { id: 'j5', title: 'Front Desk Executive', dept: 'Administration', type: 'Full time' },
  { id: 'j6', title: 'Radiology Technician', dept: 'Radiology', type: 'Full time' },
];
