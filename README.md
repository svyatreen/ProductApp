# Multi-Vendor E-commerce Platform

## Overview

This is a full-stack multi-vendor e-commerce platform built with a modern tech stack. The application allows multiple vendors to sell products through a unified marketplace, with features for product management, shopping cart functionality, order processing, and user management.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **2025-07-24**: Successfully migrated project from Replit Agent to Replit environment
  - Fixed product addition functionality in Vendor Dashboard
  - Corrected data type handling for product prices and API integration
  - Enhanced cache invalidation to ensure products display immediately on Products page
  - Added proper Russian localization for success messages ("Ваш товар добавлен")
  - Ensured proper client/server separation and security practices
  - Verified all API endpoints are working correctly
  - **Implemented complete navigation system**: Added all footer pages including Careers, Contact, and updated all routing
  - **Enhanced user experience**: All footer links now properly navigate to functional pages with comprehensive content
  - **Database setup**: Created and configured PostgreSQL database with proper schema migration

- **2025-01-24**: Enhanced Vendor Dashboard with full authentication integration
  - Replaced hardcoded "John" with actual logged-in user name
  - Added comprehensive product management functionality with real API integration
  - Implemented sales charts using Recharts library
  - Enhanced supplier management system with proper forms and validation
  - Improved order tracking with Russian localization
  - Added quick action buttons for navigation and store management
  - Integrated user authentication state for dashboard access control

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared code:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand for client-side state (cart functionality)
- **Data Fetching**: TanStack Query (React Query) for server state management

## Key Components

### Frontend Architecture
- **Client Directory**: Contains the React application with TypeScript
- **Component Structure**: Organized into UI components, layout components, and page components
- **Routing**: Uses Wouter for client-side routing
- **Styling**: Tailwind CSS with custom design tokens and shadcn/ui component library
- **State Management**: 
  - Zustand for cart state with persistence
  - React Query for server state and caching

### Backend Architecture
- **Express Server**: RESTful API with TypeScript
- **Route Organization**: Centralized route registration in `server/routes.ts`
- **Storage Layer**: Abstracted storage interface in `server/storage.ts`
- **Development Setup**: Vite integration for development with HMR support

### Database Schema
The application uses Drizzle ORM with PostgreSQL, featuring these main entities:
- **Users**: User authentication and profile management
- **Vendors**: Vendor registration and store management
- **Categories**: Product categorization system
- **Products**: Product catalog with vendor association
- **Orders**: Order management and tracking
- **Order Items**: Individual items within orders
- **Reviews**: Product review system
- **Cart Items**: Shopping cart functionality

### UI Component System
- **shadcn/ui**: Comprehensive component library with Radix UI primitives
- **Design System**: Consistent theming with CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Built-in accessibility features through Radix UI components

## Data Flow

1. **User Interaction**: Users interact with React components
2. **State Management**: 
   - Local cart state managed by Zustand
   - Server data managed by React Query
3. **API Communication**: React Query handles API requests to Express backend
4. **Database Operations**: Express routes use storage layer to interact with PostgreSQL via Drizzle ORM
5. **Response Handling**: Data flows back through the same chain with proper error handling

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with hooks and modern patterns
- **Express.js**: Backend web framework
- **Drizzle ORM**: Type-safe database ORM for PostgreSQL
- **Neon Database**: Serverless PostgreSQL database provider

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI component library
- **Lucide React**: Icon library
- **shadcn/ui**: Pre-built component library

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the stack
- **ESBuild**: Fast JavaScript bundler for production builds

### State Management and Data Fetching
- **TanStack Query**: Server state management and caching
- **Zustand**: Lightweight state management for client state
- **React Hook Form**: Form handling with validation

## Deployment Strategy

### Build Process
- **Frontend Build**: Vite builds the React application to `dist/public`
- **Backend Build**: ESBuild bundles the Express server to `dist/index.js`
- **Development**: Vite dev server with Express backend integration

### Environment Configuration
- **Database**: Configured via `DATABASE_URL` environment variable
- **Development**: Uses Vite's development server with HMR
- **Production**: Serves static files from Express with built React app

### Database Management
- **Migrations**: Drizzle Kit manages database schema migrations
- **Schema**: Centralized in `shared/schema.ts` for type safety across client and server
- **Connection**: Uses Neon serverless PostgreSQL with connection pooling

The architecture prioritizes type safety, developer experience, and scalability while maintaining a clear separation of concerns between the frontend, backend, and database layers.