# Production-Ready Next.js Authentication & Dashboard

A full-stack Next.js application with secure authentication, protected routes, and server-side rendered dashboard with TanStack Table.

## 🚀 Features

- ✅ **Secure Authentication**: JWT tokens stored in HTTP-only cookies
- ✅ **Route Protection**: Middleware-based route protection
- ✅ **Server-Side Data Table**: TanStack Table with pagination, sorting, filtering
- ✅ **TypeScript Strict Mode**: 100% type-safe
- ✅ **Responsive Design**: Mobile-first Tailwind CSS
- ✅ **API Protection**: Protected endpoints with JWT validation
- ✅ **Error Handling**: Proper error states and user feedback
- ✅ **Loading States**: Skeleton loaders and spinners
- ✅ **Debounced Search**: Optimized search performance
- ✅ **URL Query Sync**: Pagination/sorting persists in URL

## 📋 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Tables**: TanStack Table v8
- **HTTP Client**: Fetch API with custom wrapper
- **State**: React Hooks
- **Authentication**: JWT + HTTP-only Cookies

## 🏗️ Project Structure

```
app/
├── middleware.ts                 # Route protection
├── layout.tsx                   # Root layout
├── page.tsx                     # Home (redirect to login)
├── login/
│   └── page.tsx                # Login page
├── dashboard/
│   ├── layout.tsx              # Dashboard layout
│   ├── page.tsx                # Users table
│   └── profile/
│       └── page.tsx            # Profile page (protected)
├── api/
│   ├── login/
│   │   └── route.ts            # Authentication endpoint
│   ├── logout/
│   │   └── route.ts            # Logout endpoint
│   ├── users/
│   │   └── route.ts            # Users list (protected)
│   └── auth/
│       └── verify/
│           └── route.ts        # Token verification
└── layout.tsx                  # Root layout

components/
├── ui/
│   ├── Button.tsx              # Base button component
│   ├── Input.tsx               # Base input component
│   ├── Card.tsx                # Card container
│   ├── Skeleton.tsx            # Loading skeleton
│   └── Toast.tsx               # Toast notifications
├── table/
│   ├── DataTable.tsx           # Main table component
│   ├── TablePagination.tsx     # Pagination controls
│   ├── TableToolbar.tsx        # Search & filters
│   └── TableActions.tsx        # Row actions
├── auth/
│   ├── LoginForm.tsx           # Login form
│   └── LogoutButton.tsx        # Logout button
└── dashboard/
    ├── DashboardHeader.tsx     # Header with user info
    └── UserTableContainer.tsx  # Table wrapper

lib/
├── auth.ts                     # Auth utilities & JWT
├── api.ts                      # API client wrapper
├── utils.ts                    # Helper functions
└── constants.ts                # App constants

hooks/
├── useUsers.ts                 # Users data fetching
├── useDebounce.ts             # Debounce hook
├── useAuth.ts                 # Auth state hook
└── useTableState.ts           # Table pagination/sort state

types/
├── auth.ts                     # Auth types
├── user.ts                     # User types
└── api.ts                      # API response types

styles/
└── globals.css                 # Global styles
```

## 🔐 Authentication Flow

### Login Process
1. User fills email/password on `/login`
2. Form validates with Zod schema
3. API call to `POST /api/login` with credentials
4. Server authenticates and generates JWT
5. JWT stored in HTTP-only cookie (secure, httpOnly, sameSite)
6. User redirected to `/dashboard`

### Route Protection
- **Middleware** checks for valid token on protected routes
- **Server Actions** verify token on API endpoints
- If token is missing/invalid → redirect to `/login`
- Tokens include expiration (1 hour default)

### Logout
- Clear authentication cookie
- Clear any client-side state
- Redirect to `/login`

## 📊 Dashboard Features

### Data Table
- **Server-side pagination**: Configurable page size (default: 10)
- **Sorting**: Click headers to sort A-Z or Z-A
- **Searching**: Real-time search on name/email (debounced)
- **URL Query Params**: `?page=1&limit=10&sortBy=name&order=asc&search=john`

### Table Columns
- **ID**: Unique user identifier
- **Name**: User's full name
- **Email**: User's email address
- **Actions**: (Optional) Edit/Delete actions

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the project
cd nextjs-auth-dashboard

# Install dependencies
npm install

# Create .env.local (optional - has defaults)
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3000
JWT_SECRET=your-super-secret-key-change-this-in-production
EOF

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run start
```

## 🔑 Demo Credentials

**Email**: `demo@example.com`
**Password**: `password123`

(Mock authentication in `/api/login` - modify to use your database)

## 📝 Key Implementation Details

### API Client (`lib/api.ts`)
- Custom fetch wrapper with automatic error handling
- Includes Authorization header
- Handles JSON serialization
- Type-safe request/response

### useUsers Hook (`hooks/useUsers.ts`)
- Server-side pagination
- Debounced search
- URL query sync
- Error states and loading

### DataTable Component (`components/table/DataTable.tsx`)
- TanStack Table v8
- Server-side sorting/pagination
- Responsive design
- Accessibility features

### Token Management
- JWT generated server-side
- Stored in HTTP-only cookie (cannot access via JS)
- Automatically sent with requests
- Expires after 1 hour (customize in `lib/auth.ts`)

## 🧪 Testing the Features

### Test Authentication
```bash
# 1. Go to http://localhost:3000/login
# 2. Enter demo@example.com / password123
# 3. Should redirect to /dashboard
```

### Test Route Protection
```bash
# 1. Try accessing /dashboard without logging in
# 2. Should redirect to /login
# 3. Middleware prevents direct access
```

### Test Data Table
```bash
# 1. Pagination: Click page numbers
# 2. Search: Type in search box (debounced)
# 3. Sorting: Click column headers
# 4. All reflected in URL query params
```

### Test Logout
```bash
# 1. Click "Logout" button in dashboard header
# 2. Should redirect to /login
# 3. Cookies cleared automatically
```

## 🛡️ Security Considerations

- ✅ HTTP-only cookies prevent XSS attacks
- ✅ CSRF tokens could be added for mutations
- ✅ JWT expires to limit token lifetime
- ✅ Server-side validation on all API routes
- ✅ No sensitive data in JWT payload
- ✅ Password hashing recommended (use bcrypt in production)

## 📈 Production Checklist

- [ ] Add environment variables for JWT_SECRET
- [ ] Implement password hashing (bcrypt)
- [ ] Connect to real database
- [ ] Add CSRF protection for mutations
- [ ] Set secure cookie flags in production
- [ ] Add rate limiting on auth endpoints
- [ ] Implement refresh token rotation
- [ ] Add audit logging
- [ ] Set up error tracking (Sentry)
- [ ] Add email verification
- [ ] Implement password reset flow

## 🚀 Performance Optimizations

- Server-side pagination prevents loading all data
- Debounced search reduces API calls
- Tailwind CSS with purging
- Code splitting with dynamic imports
- Image optimization with Next.js Image
- Caching strategies for API responses

## 📚 File Reference

| File | Purpose |
|------|---------|
| `app/middleware.ts` | Route protection with JWT validation |
| `lib/auth.ts` | JWT generation and validation |
| `lib/api.ts` | Reusable API client |
| `hooks/useUsers.ts` | Server-side user data fetching |
| `components/table/DataTable.tsx` | Reusable TanStack Table |
| `app/api/login/route.ts` | Authentication API |
| `app/api/users/route.ts` | Protected users API |

## 🤝 Contributing

Follow these standards:
- Use TypeScript strict mode
- Components are PascalCase
- Functions/variables are camelCase
- Constants are UPPER_SNAKE_CASE
- Keep components small and focused
- Write proper error handling

## 📄 License

MIT

---

**Built with ❤️ for production-grade applications**
