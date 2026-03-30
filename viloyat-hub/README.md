# ViloyatHub

**ViloyatHub** - bu O'zbekistonning har bir viloyatida tadbirkorlikni rivojlantirishga qaratilgan innovatsion platforma. Biz tadbirkorlarga o'z bizneslarini boshlash, rivojlantirish va kengaytirish uchun zarur bo'lgan barcha vositalarni bir joyda jamlaymiz.

## Platforma Komponentlari

Platformamiz quyidagi asosiy komponentlardan iborat:

*   **Grant Navigator:** Tadbirkorlarga mavjud grantlar, subsidiyalar va moliyaviy yordam dasturlari haqida ma'lumot topishga yordam beradigan aqlli qidiruv tizimi.
*   **AI Mentor:** Sun'iy intellektga asoslangan mentorlik tizimi. Foydalanuvchilarga biznes-rejalar tuzish, marketing strategiyalarini ishlab chiqish va boshqa ko'plab masalalarda yordam beradi.
*   **Hududiy Xarita:** Har bir viloyatning iqtisodiy salohiyati, mavjud resurslari va biznes imkoniyatlari haqida ma'lumot beruvchi interaktiv xarita.
*   **Onlayn Bozor:** Tadbirkorlar o'z mahsulot va xizmatlarini sotishlari, hamkorlar topishlari mumkin bo'lgan virtual bozor.
*   **Mentorlik Tizimi:** Yosh tadbirkorlarni tajribali biznes egalari va mutaxassislar bilan bog'laydigan dastur.
*   **Moliyalashtirish:** Startaplar va bizneslar uchun investitsiya jalb qilish, kreditlar olish va boshqa moliyaviy manbalarga chiqish imkoniyatlari.

'''mermaid
graph LR
    A[ViloyatHub] --> B[Grant Navigator]
    A --> C[AI Mentor]
    A --> D[Hududiy Xarita]
    A --> E[Onlayn Bozor]
    A --> F[Mentorlik Tizimi]
    A --> G[Moliyalashtirish]
'''

## API Endpoints

- **Development:** `https://api.dev.viloyathub.uz/v1`
- **Production:** `https://api.viloyathub.uz/v1`

## Authentication Endpoints

```
POST   /auth/register      # Ro'yxatdan o'tish
POST   /auth/login         # Kirish
POST   /auth/verify-otp    # SMS OTP tasdiqlash
POST   /auth/refresh       # Token yangilash
POST   /auth/logout        # Chiqish
```

## Grant Navigator Endpoints

```
GET    /grants             # Grantlar ro'yxati
GET    /grants/:id         # Grant detali
GET    /grants/match       # AI asosida mos grantlar
POST   /grants/apply       # Grantga ariza topshirish
GET    /grants/applications # Ariza tarixi
```

## Texnik Arxitektura

Quyida platformaning yuqori darajadagi texnik arxitekturasi keltirilgan:

'''mermaid
graph TD
    subgraph "Foydalanuvchi Interfeysi"
        A[Web Frontend (Next.js)]
        B[Mobil Ilova (Flutter)]
    end

    subgraph "Backend"
        C[API Gateway (Flask)]
    end

    subgraph "Mikroservislar"
        D[Foydalanuvchilar Servisi]
        E[Grantlar Servisi]
        F[AI Mentor Servisi]
        G[Bozor Servisi]
        H[...Boshqa servislar]
    end

    subgraph "Ma'lumotlar Bazasi"
        I[PostgreSQL]
        J[Redis (Cache)]
    end

    subgraph "Infratuzilma"
        K[Docker]
        L[Kubernetes]
        M[Terraform]
    end

    A --> C
    B --> C
    C --> D & E & F & G & H
    D & E & F & G & H --> I
    D & E & F & G & H --> J
'''

## Texnologik Stack

### Backend
- **Framework:** Node.js (Express) / Python (FastAPI)
- **Language:** TypeScript / Python 3.11+
- **Authentication:** JWT, OAuth2, SMS OTP
- **API Gateway:** Express Gateway / Kong
- **Message Queue:** RabbitMQ / Redis

### Frontend
- **Framework:** React 18+
- **State Management:** Redux Toolkit
- **Styling:** TailwindCSS
- **Build Tool:** Vite

### Mobile
- **Framework:** Flutter 3.16+
- **State Management:** Riverpod / BLoC
- **Platform:** iOS 13+, Android 6+

### Database
- **Primary:** PostgreSQL 15+
- **Secondary:** MongoDB 6+
- **Cache:** Redis 7+
- **Search:** Elasticsearch 8+

### Infrastructure
- **Cloud:** AWS / Azure
- **Container:** Docker
- **Orchestration:** Kubernetes (EKS/AKS)
- **CI/CD:** GitHub Actions
- **Monitoring:** Prometheus + Grafana
- **Logging:** ELK Stack

## Repository struktura

```
viloyathub/
├── docs/               # Hujjatlar
├── backend/            # Backend kodlari
├── frontend/           # Web frontend
├── mobile/             # Mobil ilova (Flutter)
├── infrastructure/     # Terraform, Kubernetes configs
├── database/           # Migrations, seeders
└── README.md           # Ushbu fayl
```