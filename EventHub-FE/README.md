<p align="center">
  <img src="https://i.pinimg.com/736x/e1/90/f4/e190f4e1f594847db60a00cccebf4c04.jpg" alt="EventHub FE Banner" width="100%" height="50%"/>
</p>

# Frontend application for EventHub built with React, Redux Toolkit & Vite

---

### Project frontend for EventHub BE with React 19
<br><br><br>

# 🛠️ Technologies
- **React** [![React](https://img.shields.io/badge/React-v%2019.2-green?logo=React&logoColor=f5f5f5)](https://react.dev/)
- **Vite** [![Vite](https://img.shields.io/badge/Vite-v%208.2-green?logo=Vite&logoColor=f5f5f5)](https://vite.dev/)
- **Redux Toolkit** [![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-v%202.12-green?logo=Redux&logoColor=f5f5f5)](https://redux-toolkit.js.org/)
- **Redux Persist** [![Redux Persist](https://img.shields.io/badge/Redux%20Persist-v%206.0-green?logo=Redux&logoColor=f5f5f5)](https://github.com/rt2zz/redux-persist)
- **React Router** [![React Router](https://img.shields.io/badge/React%20Router-v%208.3-green?logo=ReactRouter&logoColor=f5f5f5)](https://reactrouter.com/)
- **React Hook Form** [![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-v%207.86-green?logo=ReactHookForm&logoColor=f5f5f5)](https://react-hook-form.com/)
- **Tailwind CSS** [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v%204.3-green?logo=TailwindCSS&logoColor=f5f5f5)](https://tailwindcss.com/)
- **Chart.js** [![Chart.js](https://img.shields.io/badge/Chart.js-v%204.5-green?logo=Chartdotjs&logoColor=f5f5f5)](https://www.chartjs.org/)

### 📚 Other libraries
- `react-chartjs-2` - Chart.js wrapper for React (admin dashboard charts)
- `react-icons` - Icon set
- `react-toastify` - Toast notifications
- `react-loader-spinner` - Loading indicators
- `eslint` - Linting (with `react-hooks` and `react-refresh` plugins)
<br><br><br>

# 🚀 Features

### 🔐 Authentication
- Register, login and logout connected to the backend
- Session (token and user data) is persisted with Redux Persist
- Guest mode: browse the app without signing in

### 📅 Events
- Explore all events with search and category filter
- Event detail page
- Upcoming events and personalized recommendations
- Join and leave an event
- Create a new event
- My events (created or joined)

### 👥 Communities
- Popular communities
- Community detail page

### 👤 Profile
- View profile information
- Partial update for `bio`, `location` and `job`: only changed fields are sent
- Upload profile photo (multipart/form-data)

### 🔔 Notifications & Testimonials
- User notifications
- Read and submit testimonials

### 🛠️ Admin Panel
- Dashboard overview with charts

### 🎨 UI
- Responsive layout with Tailwind CSS
- Dark mode toggle
- Form validation with React Hook Form
- Toast feedback for every action
<br><br><br>

# 🧠 State Management

Redux Toolkit store with Redux Persist. Async requests are handled with `createAsyncThunk` and registered in `extraReducers`.

| Thunk | Endpoint | Description |
|---|---|---|
| `RegisThunk` | `POST /auth/regis` | Register a new account |
| `LoginThunk` | `POST /auth/login` | Login, saves token as `Bearer <token>` and user data |
| `LogoutThunk` | `POST /auth/logout` | Invalidate token on the server, then clear state |
| `EditProfileThunk` | `PATCH /events/changeuserprofile` | Partial update of profile and photo |

Protected requests send the token in the `Authorization` header.
<br><br><br>

# 🔌 Backend Connection

This app needs [EventHub BE](https://github.com/fatawaimamalmuftin/eventhub-be) to be running.

| Item | Value |
|---|---|
| API base URL | `http://localhost:5678` |
| Frontend dev URL | `http://localhost:1234` |
| Static files (profile photo) | `http://localhost:5678/uploads/...` |

Make sure the backend CORS middleware allows:
- Origin `http://localhost:1234`
- Methods `GET, POST, PUT, PATCH, DELETE, OPTIONS`
- Headers `Authorization, Content-Type, Accept`
<br><br><br>

# ⚙️ Getting Started

### Prerequisites
- **Node.js** `>= 22.22.0` (required by React Router 8)
- **npm**
- EventHub BE running on `localhost:5678`

### Running locally

1. **Clone repository:**
```bash
$ git clone https://github.com/fatawaimamalmuftin/eventhub-fe.git
$ cd eventhub-fe
```
2. **Install dependencies**
```bash
$ npm ci
```
3. **Jalankan development server**
```bash
$ npm run dev
```
4. **Buka di browser**
```
http://localhost:1234
```

### Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production into `dist/` |

### Running with Docker

1. **Buat `Dockerfile` di direktori utama project:**
```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```
2. **Build image**
```bash
$ docker build -t eventhub-fe .
```
3. **Jalankan container**
```bash
$ docker run -d -p 1234:80 --name eventhub-fe eventhub-fe
```
4. **Cek log dan status container**
```bash
$ docker logs -f eventhub-fe
```
<br><br><br>

# 📝 Notes
- Jika halaman seperti `/myprofile` menampilkan 404 setelah refresh di nginx, tambahkan konfigurasi `try_files $uri /index.html;` agar routing SPA berjalan.
- Jangan commit file `.env` atau token ke repository.

### 1. Perbedaan Linux Kernel dan Distro

Kernel adalah inti dari OS, tugasnya menjembatani dari software ke hardwere. Distro adalah macam2 paket Linux yg berisi seperti GUI, CLI, env, DLL.

---

### 2. Linux FHS beserta dengan penjelasan dan contoh kegunaannya

Filesystem Hierarchy Standard. Contoh kegunaan tiap dir:

- `/` = root
- `/home` = tempat dir user
- `/etc` = tempat config
- `/var` = tempat data yg sering berubah
- `/tmp` = tempat file sementara
- `/usr` = berisi source program
- `/dev` = berisi device
- `/proc` = berisi tentang informasi
- `/boot` = berisi keperluan booting

---

### 3. Sistem permission dan owner pada Linux

Permission: mengatur izin dari file dan dir.

Owner: kepemilikan dari file dan dir.

---

### 4. Perbedaan antara bash, sh dan jenis-jenis shell lain

Shell adalah program yang menerima perintah dari user dan menjalankannya.

`sh` adalah shell yang lebih sederhana dan merupakan standar historis.

Bash: Bourne Again SHell merupakan salah satu shell yg populer di Linux.

Beberapa shell lainnya:

- Bash
- sh
- zsh
- fish
- ksh
- dash

---

### 5. Prinsip enkripsi pada SSH

SSH = Secure Shell.

Digunakan untuk mengakses komputer/server secara remote dengan aman.

Prinsip enkripsi: kombinasi **Encryption, Authentication, dan SSH Key**.

---

### 6. Perbedaan antara HTTP dan HTTPS

HTTP adalah protokol komunikasi antara client dan server.

HTTPS hampir sama dengan HTTP cuma HTTPS lebih aman karna si enkrip.

Port HTTP: `80`

Port HTTPS: `443`

---

### 7. Docker OCI Compliance Standard

OCI = Open Container Initiative / standar container images.

---

### 8. Perbedaan antara Container dan VM

VM / Virtual Mecine itu memiliki OS sendiri yg membuat nya lebih berat ketimbang container.

Container itu ada di dalam kernel host yg membuat lebih ringan.

---

### 9. Definisi dan manfaat dari image layer pada Docker

Lapisan yang bersifat read-only (hanya-baca) yang saling menumpuk dan membentuk sebuah Docker image secara keseluruhan, membuatnya lebih compec dan bersih, karna sisah dari produksi ga ada dan hanya menyisakan produk jadi.

---

### 10. Kegunaan dari penggunaan Docker volume dan network beserta contohnya

Volume menjadi tempat menyimpan data dari container yg bisa membuat data itu persist.

Network virtual jaringan yg memungkinkan untuk berkomunikasi antar container.

Contohnya:

```text
Container
   ↓
Volume
   ↓
Data tetap persist
```

dan:

```text
Container 1
     ↓
  Network
     ↓
Container 2
```

---

### 11. Definisi dan tujuan dari penggunaan web server dan reverse-proxy

Server adalah layanan web yg bisa menerima request dari client dan mengembalikan respon.

Reverse proxy bermanfaat untuk mengatur web yg ingin di tampilkan dan tidak, contoh nya untuk menyembunyikan internal backend biar ga bisa di akses.