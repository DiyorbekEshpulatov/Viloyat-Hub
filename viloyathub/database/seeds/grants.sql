-- database/seeds/grants.sql

INSERT INTO grants (id, title, organization, amount_min, amount_max, deadline, region, sectors, description, requirements, status) VALUES
(
  gen_random_uuid(),
  'IT Park Startap Grant',
  'IT Park Uzbekistan',
  50000000,
  500000000,
  '2025-06-30',
  'all',
  ARRAY['IT', 'Startap', 'Texnologiya'],
  'IT Park rezidentlari uchun startap granti. Loyihangizni rivojlantirish uchun moliyaviy yordam.',
  'IT Park rezidenti bo''lish, loyiha taqdimoti',
  'active'
),
(
  gen_random_uuid(),
  'Yosh Tadbirkorlar Grant',
  'Innovatsion Rivojlanish Agentligi',
  100000000,
  500000000,
  '2025-05-15',
  'all',
  ARRAY['Yoshlar', 'Startap', 'Innovatsiya'],
  '25 yoshgacha bo''lgan tadbirkorlar uchun grant dasturi.',
  'Yoshi 25 dan oshmagan, biznes-reja',
  'active'
),
(
  gen_random_uuid(),
  'Qishloq Xo''jaligi Inkubatsiyasi',
  'Qishloq Xo''jaligi Vazirligi',
  50000000,
  200000000,
  '2025-07-20',
  'Farg''ona',
  ARRAY['Qishloq xo''jaligi', 'Agrotexnologiya'],
  'Farg''ona viloyatidagi fermer xo''jaliklari uchun inkubatsiya dasturi.',
  'Fermer xo''jaligi, yer maydoni 1 ga dan kam bo''lmasligi',
  'active'
),
(
  gen_random_uuid(),
  'Ayollar Tadbirkorlik Grant',
  'Oila va Xotin-Qizlar Qo''mitasi',
  30000000,
  150000000,
  '2025-08-10',
  'all',
  ARRAY['Ayollar', 'Kichik biznes'],
  'Ayol tadbirkorlar uchun maxsus grant dasturi.',
  'Ayol tadbirkor, biznes-reja',
  'active'
),
(
  gen_random_uuid(),
  'Raqamli Transformatsiya Grant',
  'Raqamli Texnologiyalar Vazirligi',
  100000000,
  1000000000,
  '2025-09-01',
  'all',
  ARRAY['IT', 'Raqamlashtirish', 'Texnologiya'],
  'Kichik bizneslarni raqamlashtirish uchun grant.',
  'Biznesni raqamlashtirish loyihasi',
  'active'
);

-- Map points seed
INSERT INTO map_points (id, name, type, lat, lng, address, phone, working_hours, region) VALUES
(
  gen_random_uuid(),
  'IT Park Farg''ona',
  'incubator',
  40.3864,
  71.7864,
  'Farg''ona shahri, Alisher Navoiy ko''chasi 15',
  '+998 73 123-45-67',
  '{"weekdays": "09:00-18:00", "saturday": "09:00-14:00", "sunday": "dam olish"}',
  'Farg''ona'
);