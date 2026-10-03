# Careflow Clinic & Pharmacy

Offline-first clinic and pharmacy management MVP built with React, Express, Node.js and MongoDB. The current phase provides a web dashboard and local API; Electron packaging is a later milestone.

## Requirement in plain language

This application brings the clinic's day-to-day work into one place:

- Reception registers patients and issues daily queue tokens.
- The doctor calls the next patient and records consultation notes, diagnosis and prescriptions.
- Reception records consultation payments and prints receipts.
- Pharmacy staff track medicine batches, expiry dates, quantities and reorder alerts.
- Admin manages staff, reports and local backup/restore.
- Each role sees only the work it is allowed to do.

The supplied plan contains two different database suggestions: MongoDB for MERN and SQLite/NeDB for a self-contained desktop install. This starter follows the requested MERN stack and connects to MongoDB on `127.0.0.1`; it does not install or bundle MongoDB. Electron, database bundling, backup/restore, A4/thermal print templates, Urdu typography, appointments and lab entry are not implemented yet.

## Prerequisites

- Node.js 20 or newer
- MongoDB running locally (default: `mongodb://127.0.0.1:27017/clinic_pharmacy`)

## Start development

1. Copy `server/.env.example` to `server/.env`. Set a private, long `JWT_SECRET` before using real records.
2. Install dependencies from the project root:

   ```sh
   npm run install:all
   ```

3. Create the initial administrator:

   ```sh
   npm --prefix server run seed -- admin 'ChangeMe123!'
   ```

   Pass your own username and password. Change the password after the first sign-in.

4. Start both applications:

   ```sh
   npm run dev
   ```

5. Open `http://localhost:5173`. The API listens on `http://localhost:4000`.

## Current API surface

- `POST /api/auth/login`, `GET /api/auth/me`, `PATCH /api/auth/password`
- `POST /api/auth/signup`, `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`
- `GET|POST /api/patients`, `GET /api/patients/:id/history`
- `GET|POST /api/queue`, `PATCH /api/queue/:id/next`
- `GET|POST /api/stock`, `PATCH /api/stock/:id`
- `POST /api/billing`, `GET /api/reports/daily`
- `GET /api/dashboard`, `GET /api/users`

The schemas also define visits, prescriptions and stock transactions. Doctor consultation/prescription screens, bill/receipt UI, staff management UI, settings and backup/restore remain to be built. User roles enforced in the initial API are admin, doctor, receptionist and pharmacist.

### Sign up and password recovery

People can create a receptionist account with a name, email, username and password. Existing seeded accounts can still sign in with their username; accounts with an email can sign in with either email or username. Password recovery sends a one-hour, single-use reset link through Resend. Configure `RESEND_API_KEY` and a verified `RESEND_FROM_EMAIL` in `server/.env` to enable it. The reset link uses `CLIENT_ORIGIN`; set that to the public address of the frontend in deployed environments. Signup is open and new accounts receive the receptionist role.

## Suggested next steps

1. Add consultation and prescription APIs/UI with printable A4 output.
2. Add billing UI and thermal receipt layout.
3. Add user management, report filters and backup/restore.
4. Decide whether to ship a local MongoDB runtime or move the embedded desktop build to SQLite before adding Electron packaging.
5. Validate permissions and printing on the target Windows machines before using real clinic data.
