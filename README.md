# ☕ Get Me A Coffee — Patreon Clone

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&pause=1000&color=F59E0B&center=true&vCenter=true&width=640&lines=Get+Me+A+Coffee+%E2%80%94+Patreon+Clone;Full+Stack+Next.js+%7C+MongoDB+%7C+Razorpay;Google+%26+GitHub+OAuth+Login;Deployed+on+Vercel" alt="Typing SVG" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/NextAuth-4-9333EA?style=for-the-badge&logo=auth0&logoColor=white" />
  <img src="https://img.shields.io/badge/Razorpay-Test_Mode-0C2451?style=for-the-badge&logo=razorpay&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<p align="center">
  <a href="https://get-me-a-coffee-patreon-clone.vercel.app/"><b>🔗 Live Demo</b></a>
</p>

> ⚠️ **Test mode only.** Payments use Razorpay in test mode, so no real money is charged.

---

## 🌟 Why This Project Stands Out

This is a real full-stack app, not just a UI clone. It has **OAuth login** (Google and GitHub), a **MongoDB database**, **Next.js Server Actions**, **API routes**, and a complete **Razorpay payment flow** with signature verification. It is deployed on Vercel, and every creator connects their own Razorpay keys.

---

## 📖 The Story Behind This Project

I built this by following **CodeWithHarry's Sigma Web Development course (video 131)**. His version used older versions of the tools, and I built mine on the **current versions** (Next.js 16, React 19, Tailwind CSS 4, Mongoose 9, and the React Compiler). Because of that, a lot of the code ended up different from the video. I had to read the docs, debug breaking changes, and rewrite parts myself. I also set up **Vercel deployment, Razorpay, and GitHub and Google OAuth** on my own. It was one of my best learning experiences so far.

---

## ✨ Features

- 🔐 **Login with Google or GitHub** using NextAuth. A user is created in MongoDB on first sign-in.
- 👤 **Public creator page** at `/[username]` with cover image, profile picture, supporter count, and total raised
- 💸 **Donate flow** with name, amount, and an optional message, plus quick buttons for ₹100, ₹200, and ₹500
- 🧾 **Razorpay Checkout** where each creator's own Razorpay keys receive the money
- ✅ **Server-side payment verification** by checking the Razorpay signature before marking a payment `completed`
- 🏆 **Supporters list** sorted by highest amount, showing the messages
- ✏️ **Username changes** with a uniqueness check, and old payments are moved to the new username
- 🍞 **Toast notifications** for validation errors and payment success
- 🌙 **Dark UI** built with Tailwind CSS 4

---

## 🏗️ Architecture

```
┌──────────────┐    ┌───────────────────────────────┐    ┌──────────────┐
│   Browser    │───▶│  Next.js (App Router)         │───▶│   MongoDB    │
│  React 19    │    │  Server Actions + API Routes  │    │  Users,      │
└──────┬───────┘    └──────────────┬────────────────┘    │  Payments    │
       │                           │                     └──────────────┘
       │ Razorpay Checkout         │ verify signature
       ▼                           ▼
┌────────────────────────────────────────────┐
│ Razorpay (test mode)  →  /api/razorpay     │
└────────────────────────────────────────────┘
```

---

## 💳 Payment Flow

1. A supporter fills in name, amount, and message, then clicks **Donate**.
2. A **Server Action** (`initiate`) looks up the creator's Razorpay keys and creates a Razorpay **order**.
3. A `Payment` document is saved in MongoDB with status `pending`.
4. **Razorpay Checkout** opens in the browser, and the supporter pays.
5. Razorpay calls `/api/razorpay` with the order ID, payment ID, and signature.
6. The route **verifies the signature** with the creator's secret, sets the status to `completed`, and redirects back to the creator's page with a success toast.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 (App Router) | Pages, dynamic routes, API routes, Server Actions |
| React 19 + React Compiler | UI and automatic memoization |
| Tailwind CSS 4 | Styling |
| MongoDB + Mongoose 9 | Database and schemas |
| NextAuth 4 | Google and GitHub OAuth |
| Razorpay | Payment orders and signature verification |
| react-toastify | Toast notifications |
| Vercel | Hosting |

---

## 🧠 Concepts Used

| Concept | Where |
|---------|-------|
| Server Actions (`"use server"`) | `actions/useractions.js` for `initiate`, `fetchuser`, `fetchpayments`, `updateProfile` |
| Dynamic routes | `app/[username]` |
| Route handlers | `app/api/razorpay/route.js` and `app/api/auth/[...nextauth]/route.js` |
| NextAuth callbacks | `signIn` creates the DB user, and `session` attaches the username |
| Cached DB connection | `DB/connectdb.js` reuses one Mongoose connection |
| Mongoose models | `models/user.js` and `models/payments.js` |
| Client and server split | `paymentpage.js` is a client component that calls server actions |
| Environment variables | Secrets kept out of the code |

---

## 📂 Project Structure

```
GetMeACoffee-PatreonClone/
├── app/
│   ├── [username]/        # Public creator page
│   ├── about/
│   ├── dashboard/
│   ├── login/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.js
│   │   └── razorpay/route.js
│   ├── layout.js
│   └── page.js
├── actions/useractions.js  # Server Actions
├── components/             # navbar, footer, paymentpage, dashboard, ...
├── models/                 # user.js, payments.js
├── DB/connectdb.js
└── public/
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/mayurdhanurkar/GetMeACoffee-PatreonClone.git
cd GetMeACoffee-PatreonClone
npm install
```

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret
NEXT_PUBLIC_URL=http://localhost:3000
GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret
GOOGLE_ID=your_google_oauth_client_id
GOOGLE_SECRET=your_google_oauth_client_secret
```

```bash
npm run dev
```

Open `http://localhost:3000`. Each creator adds their own **Razorpay test key ID and secret** from their dashboard.

---

## ⚠️ Known Limitations

I would rather be upfront about these. They are my to-do list for the next version.

- **Razorpay secret storage:** the secret is currently saved in the database as plain text and should be encrypted before storage.
- **Access control:** `updateProfile` trusts the username sent from the client instead of checking the logged-in session, so it needs an ownership check.
- **Dashboard:** the dashboard component is still being finished, so the profile form is not complete yet.
- **Hardcoded checkout values:** the business name, description, logo, and prefill details in Razorpay Checkout are placeholders.
- **Auth callback:** the `signIn` callback only handles Google and GitHub.
- **Test mode only:** payments are not live.

---

## 📚 What I Learned

- ✅ Building a full-stack app with the **Next.js App Router** and **Server Actions**
- ✅ Adapting an older tutorial to **current versions** of the tools, which meant reading docs and fixing breaking changes
- ✅ Setting up **OAuth with Google and GitHub** using NextAuth
- ✅ Integrating **Razorpay** orders and verifying payment signatures on the server
- ✅ Designing **MongoDB schemas** with Mongoose and caching the connection
- ✅ Deploying to **Vercel** and managing environment variables
- ✅ Thinking about security: secrets, access control, and server-side verification

---

## 🔮 Future Enhancements

- [ ] Encrypt the Razorpay secret before storing it
- [ ] Add a session-based ownership check to `updateProfile`
- [ ] Finish the dashboard form for profile and cover images
- [ ] Replace the hardcoded Razorpay checkout values
- [ ] Add a payment webhook as a backup to the redirect callback
- [ ] Show payment history on the dashboard
- [ ] Add email notifications with Nodemailer
- [ ] Move from test mode to live mode

---

> Made by [Mayur Dhanurkar](https://github.com/mayurdhanurkar). Learned from CodeWithHarry's Sigma Web Development course and rebuilt on current versions.
