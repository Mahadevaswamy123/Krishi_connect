# Booking System Documentation

## Overview
The Krishi Connect booking system allows farmers to book agricultural products and Krishikendra to manage (approve/reject) those bookings.

## User Roles
1. **FARMER** - Can view products and book them
2. **KRISHI_KENDRA** - Can manage bookings (approve/reject)

## Booking Flow

### 1. Farmer Side
- **View Products**: Farmers can browse available products in the "Available Products" tab
- **Book Products**: Click "Book Now" to create a booking request
- **View Bookings**: Check booking status in the "My Bookings" tab
- **Booking Statuses**:
  - `Pending` - Waiting for Krishikendra approval
  - `Approved` - Booking approved, product reserved
  - `Rejected` - Booking rejected

### 2. Krishikendra Side
- **View All Bookings**: See all booking requests from farmers
- **Status Summary**: Dashboard showing counts of Pending/Approved/Rejected bookings
- **Manage Bookings**: Approve or reject pending bookings
- **Auto Inventory**: When booking is approved, product quantity is automatically reduced

## API Endpoints

### Farmer Endpoints
- `POST /api/farmer/bookproduct` - Create a new booking
- `GET /api/farmer/bookings` - Get farmer's own bookings

### Krishikendra Endpoints
- `GET /api/krishikendra/bookings` - Get all bookings
- `PATCH /api/krishikendra/bookings` - Update booking status

## Features Implemented

### Security
- Role-based access control
- Session authentication using NextAuth
- Input validation and error handling

### User Experience
- Real-time status updates
- Loading states and error messages
- Responsive design with dark mode support
- Tab-based navigation for better organization

### Business Logic
- Prevents duplicate bookings for the same product
- Checks product availability before booking
- Automatic inventory management
- Status-based UI updates

## Database Schema
The booking system uses the following Prisma models:
- `User` - Stores farmer and krishikendra accounts
- `Product` - Stores agricultural products
- `Booking` - Links users to products with status tracking

## Getting Started
1. Install dependencies: `npm install`
2. Set up database: `npx prisma migrate dev`
3. Run development server: `npm run dev`
4. Create accounts for both farmer and krishikendra roles
5. Add products through the krishikendra dashboard
6. Test the booking flow

## Testing the System
1. **As a Farmer**:
   - Login with farmer role
   - Go to Dashboard > Bookings
   - Browse products and make bookings
   - Check booking status in "My Bookings" tab

2. **As a Krishikendra**:
   - Login with krishikendra role
   - Go to KrishiKendra Dashboard > Manage Bookings
   - View all booking requests
   - Approve or reject bookings as needed
