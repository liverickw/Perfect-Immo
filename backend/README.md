# Perfect-Immo Backend

Backend Express + TypeScript + Prisma for Perfect-Immo.

## Local Setup

1. Install dependencies:

```powershell
npm.cmd install
```

2. Configure `backend/.env` from `.env.example`.

Required variables:

```env
DATABASE_URL="..."
DIRECT_URL="..."
JWT_SECRET="..."
PORT=5000
FRONTEND_URL="http://localhost:3000"
```

Optional variables (the API runs fine without them, just with caching/upload disabled):

```env
REDIS_URL="redis://default:PASSWORD@HOST:6379"
CACHE_TTL_SECONDS=300

CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

Use a fresh database URL if a previous secret was shared.

3. Validate and generate Prisma:

```powershell
npm.cmd run prisma:validate
npm.cmd run prisma:generate
npm.cmd run db:push
```

4. Start the API:

```powershell
npm.cmd run dev
```

## Health Checks

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health" -Method GET
Invoke-RestMethod -Uri "http://localhost:5000/health/db" -Method GET
Invoke-RestMethod -Uri "http://localhost:5000/health/redis" -Method GET
Invoke-RestMethod -Uri "http://localhost:5000/api" -Method GET
```

`/health` confirms Express is running.

`/health/db` confirms Prisma can reach PostgreSQL.

`/health/redis` confirms whether the Redis cache is connected (caching is optional; the API still works without it).

## Auth Flow

Register admin:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:5000/api/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{
    "name": "Admin",
    "email": "admin@perfect-immo.com",
    "password": "password123"
  }'
```

Login admin:

```powershell
$login = Invoke-RestMethod `
  -Uri "http://localhost:5000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{
    "email": "admin@perfect-immo.com",
    "password": "password123"
  }'

$token = $login.data.token
```

Use the token for protected routes:

```powershell
$headers = @{ Authorization = "Bearer $token" }
```

## Main API Routes

Public:

- `GET /api/properties`
- `GET /api/properties/:id`
- `GET /api/projects`
- `GET /api/realisations`
- `GET /api/blogs`
- `GET /api/blogs/:id`
- `GET /api/blogs/slug/:slug`
- `POST /api/contacts`

Admin protected:

- `POST /api/properties`
- `PUT /api/properties/:id`
- `DELETE /api/properties/:id`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`
- `POST /api/blogs`
- `PUT /api/blogs/:id`
- `DELETE /api/blogs/:id`
- `GET /api/contacts`
- `POST /api/upload/image` (multipart field `image`, optional body field `folder` = `properties` | `projects` | `blogs`, default `properties`)

Upload flow: send the file to `POST /api/upload/image` first, get back `{ imageUrl }`, then use that URL in the `imageUrl` field when creating/updating a property, project, or blog. This endpoint returns 503 until `CLOUDINARY_*` env vars are set.

## Frontend Connection Map

- Frontend `/projets` -> `GET /api/properties`
- Frontend `/realisations` -> `GET /api/realisations`
- Frontend contact form -> `POST /api/contacts`

Use this base URL locally:

```text
http://localhost:5000
```

## Data Flow

```text
Browser
-> Next.js (Vercel CDN + SSL)
-> Express API (Zod validation, JWT middleware for admin routes)
-> Service layer (Redis cache-aside: check cache, else hit repository + store)
-> Repository layer
-> Prisma ORM
-> PostgreSQL

Images:
Browser -> POST /api/upload/image -> multer (memory) -> Cloudinary (auto WebP) -> imageUrl stored on the record
```

Redis and Cloudinary are both wired in and optional:

- No `REDIS_URL` set → every `getAll`/`getById` on properties, projects, and blogs just reads straight from PostgreSQL. No crash, no cache.
- No `CLOUDINARY_*` vars set → `POST /api/upload/image` returns `503`, everything else keeps working.

Cache keys are invalidated automatically on create/update/delete, so admin changes show up immediately for the next read.
