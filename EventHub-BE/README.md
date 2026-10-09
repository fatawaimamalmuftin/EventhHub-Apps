<p center>
  <img src="https://i.pinimg.com/736x/e1/90/f4/e190f4e1f594847db60a00cccebf4c04.jpg" alt="EventHub BE Banner" width="100%" height="50%"/>
</p>

# Backend service for EventHub application built with Go (Gin Framework)

---

### Project backend for Eventhub FE with Gin Gonic
<br><br><br>

# 🛠️ Technologies
- **Gin-Gonic** [![Gin Gonic](https://img.shields.io/badge/Gin%20Gonic-v%201.12.0-green?logo=Gin&logoColor=f5f5f5)](https://gin-gonic.com/)
- **PostgreSQL** [![PosgreSQL](https://img.shields.io/badge/Postgre%20SQL-v%2018-green?logo=Postgresql&logoColor=f5f5f5)](https://www.postgresql.org/)
- **Redis** [![Redis](https://img.shields.io/badge/Redis-v%208.10.2-green?logo=Redis&logoColor=f5f5f5)](https://redis.io/)
- **Swaggo** [![Swaggo](https://img.shields.io/badge/Swaggo-v%201.0.1-green?logo=Swagger&logoColor=f5f5f5)](https://github.com/swaggest/swaggo)
<br><br><br>

# 🚀 Features & API Endpoints

### 📦 Static Files & Documentation
- `GET /uploads/*filepath` - Serve static media files
- `GET /documentation/*any` - Swagger UI documentation.

### 🔐 Authentication
- `POST /auth/regis` - Register a new user account
- `POST /auth/login` - Authenticate user and issue access token
- `POST /auth/logout` - Invalidate current session and logout

### 📅 Event Management
- `GET /events` - Retrieve a list of all available events and filter
- `GET /events/:id` - Fetch detailed information for a specific event
- `GET /events/my` - Fetch events created or joined by the authenticated user
- `GET /events/upcoming` - Retrieve a list of upcoming events
- `POST /events/createEvent` - Create a new event

### 👤 User & Event Participation
- `GET /user/profile` - Fetch profile details for the authenticated user
- `PATCH /events/changeuserprofile` - Update user profile information
- `GET /user/:eventId/join` - Join participation for a specific event
- `GET /user/:eventId/leave` - Leave participation in a specific event

### 👥 Communities
- `GET /communities/popular` - Retrieve a list of popular communities
- `GET /communities/:id` - Fetch detailed information for a specific community

### 🔔 Notifications & Testimonials
- `GET /notification/my` - Fetch notifications user
- `GET /testimonials` - Retrieve all user testimonials
- `POST /testimonials` - Submit a testimonial

### 🛠️ Admin Panel
- `GET /admin/dashboard` - Fetch overview admin dashboard
<br><br><br>

# ⚙️ Environment Variables
Buat file `.env.exaple` seperti di direktori utama project ini dan sesuaikan nilainya dengan konfigurasi kamu

### Running with Docker

1. **Clone repository:**
```bash
$ git clone https://github.com/fatawaimamalmuftin/eventhub-be.git 
$ cd eventhub-be
```
2. **Setup environment file**
```bash
$ mv .env.example .env
```
3. **Jalankan container**
```bash
$ docker-compose up -d --build
```
4. **Cek log dan status container**
```bash
$ docker-compose logs -f eventhub-be
```