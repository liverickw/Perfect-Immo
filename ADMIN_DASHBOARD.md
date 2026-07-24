# Perfect-Immo Admin CMS

## Architecture

- Public website: `app/*`
- Admin UI: `app/admin/*`
- Admin shared components: `components/admin/*`
- Frontend API helpers: `lib/api/*`
- Backend REST API: `backend/src/routes/*`
- Backend layers: `controllers -> services -> repositories -> Prisma`

## Authentication

Admins log in at `/admin/login`.

The backend returns `{ user, token }` from `POST /api/auth/login`. The frontend stores the token in local storage for API calls and stores a non-sensitive session cookie used by `proxy.ts` to protect `/admin/*` routes.

Roles:

- `SUPER_ADMIN`: full access
- `ADMIN`: content and user management, except Super Admin deletion
- `EDITOR`: create/edit content, no user management

## Database Models

Extended existing models:

- `User`: role enum, active flag, soft delete
- `Project`: slug, gallery, status, published, featured, SEO, soft delete
- `Property`: slug, gallery, published, featured, SEO, soft delete
- `Blog`: excerpt, category, tags, status, scheduling, SEO, soft delete
- `Contact`: read/archive/reply status

New CMS models:

- `Service`
- `Realisation`
- `MediaAsset`
- `Setting`
- `AuditLog`

## API Routes

Public:

- `GET /api/projects`
- `GET /api/projects/:id`
- `GET /api/properties`
- `GET /api/properties/:id`
- `GET /api/services`
- `GET /api/services/:id`
- `GET /api/realisations`
- `GET /api/realisations/:id`
- `GET /api/blogs`
- `GET /api/blogs/:id`
- `GET /api/blogs/slug/:slug`
- `POST /api/contacts`

Protected:

- `GET /api/admin/dashboard`
- `GET|POST|PUT|DELETE /api/admin/settings`
- `GET|POST|DELETE /api/admin/media`
- `GET /api/admin/audit-logs`
- CRUD for `projects`, `properties`, `services`, `realisations`, `blogs`
- `GET|PUT|DELETE /api/contacts`
- `GET|POST|PUT|DELETE /api/auth/users`
- `POST /api/upload/image`

## Environment Variables

Frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Backend:

```env
DATABASE_URL=
DIRECT_URL=
JWT_SECRET=
PORT=5000
FRONTEND_URL=http://localhost:3000
REDIS_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Installation

Frontend:

```powershell
npm install
npm run dev
```

Backend:

```powershell
cd backend
npm install
npm run prisma:generate
npm run db:push
npm run dev
```

## Notes

Cloudinary uploads use `POST /api/upload/image` and support folders:

- `properties`
- `projects`
- `blogs`
- `services`
- `realisations`
- `media`

Redis remains optional. If `REDIS_URL` is absent, cache helpers fall back to direct database reads.
