# Multi‑Vendor E‑Commerce Platform

## Overview

A full‑stack marketplace application that enables multiple vendors to sell products through a single storefront. Key features include product management, shopping cart functionality, order processing, and user account management.

## Recent Updates

- Migrated project environment
- Fixed vendor dashboard product‑addition workflow
- Corrected data type handling for product prices and API requests
- Improved cache invalidation to display new products immediately
- Added Russian localization for success messages (e.g., “Ваш товар добавлен”)
- Enforced clear separation of client and server responsibilities
- Verified full functionality of all API endpoints
- Completed and refined site navigation (including Careers, Contact, etc.)
- Ensured all footer links navigate to fully populated pages
- Established PostgreSQL database and applied initial schema migrations
- Integrated authentication into Vendor Dashboard
- Replaced hard‑coded username with the logged‑in user’s name
- Added full product management via real API calls
- Displayed sales charts using the Recharts library
- Enhanced supplier management forms and validation
- Localized order‑tracking messages into Russian
- Introduced quick‑action navigation buttons
- Restricted dashboard access to authenticated vendors

## Architecture

This project uses a monorepo structure:

- **Frontend**: React + TypeScript, built with Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL via Drizzle ORM
- **Shared**: Common types and schema definitions

### Frontend

- **Tech Stack**: React 18, TypeScript, Tailwind CSS, shadcn/ui (Radix UI), Lucide React
- **State Management**:
  - **Zustand** for client‑side cart persistence
  - **React Query (TanStack Query)** for server data and caching
- **Routing**: Wouter for declarative client‑side routing
- **Forms & Validation**: React Hook Form

### Backend

- **Server**: Express.js serving a RESTful API
- **Routing**: Centralized in `server/routes.ts`
- **Data Layer**: Abstracted storage interface in `server/storage.ts`
- **Build**: Bundled with ESBuild

### Database

- Defined with Drizzle ORM in `shared/schema.ts`
- Main entities: Users, Vendors, Categories, Products, Orders, OrderItems, CartItems, Reviews

## Data Flow

1. **User Actions** trigger React UI events.
2. **Client State** (cart) is managed by Zustand; **Server State** is fetched and cached via React Query.
3. **API Requests** are sent to the Express server.
4. **Database Operations** use Drizzle ORM to read/write PostgreSQL data.
5. **Responses** propagate back through the same layers with error handling at each step.

## Dependencies

- **React 18**, **Express.js**, **Drizzle ORM** (PostgreSQL)
- **Tailwind CSS**, **Radix UI**, **Lucide React**, **shadcn/ui**
- **Vite**, **ESBuild**, **TypeScript**
- **React Query**, **Zustand**, **React Hook Form**
