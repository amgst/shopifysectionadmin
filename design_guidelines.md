# Admin Dashboard Design Guidelines

## Design Approach
**Selected System:** Ant Design
**Justification:** Admin dashboard requires robust data management components, form handling, and consistent enterprise UX patterns. Ant Design provides comprehensive component library perfect for CRUD operations and data-intensive interfaces.

**Core Principles:**
- Efficiency and clarity over visual flair
- Consistent, predictable interactions
- Data visibility and quick access to actions
- Professional enterprise aesthetic

## Color Palette

**Light Mode:**
- Primary: 217 91% 60% (Ant Design blue - trust and professionalism)
- Background: 0 0% 100% (pure white)
- Surface: 0 0% 96% (light gray for cards/panels)
- Text Primary: 0 0% 15%
- Text Secondary: 0 0% 45%
- Border: 0 0% 88%
- Success: 141 54% 53% (green for confirmations)
- Warning: 38 92% 50% (amber for alerts)
- Danger: 0 84% 60% (red for deletions)

**Dark Mode:**
- Primary: 217 91% 60%
- Background: 0 0% 8%
- Surface: 0 0% 12%
- Text Primary: 0 0% 90%
- Text Secondary: 0 0% 65%
- Border: 0 0% 20%
- Success: 141 54% 53%
- Warning: 38 92% 50%
- Danger: 0 84% 60%

## Typography
**Font Family:** System default (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto) for optimal readability
**Scale:**
- Headings: 24px (page titles), 20px (section headers), 16px (card headers)
- Body: 14px (primary content, table data)
- Small: 12px (metadata, captions)
- Weights: 400 (regular), 500 (medium for emphasis), 600 (semibold for headers)

## Layout System
**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: mb-6 to mb-8
- Card spacing: p-6
- Form elements: gap-4

**Grid Structure:**
- Sidebar: 256px fixed width with collapsible option
- Main content: Fluid with max-width constraint (max-w-7xl)
- Responsive breakpoints: md (768px), lg (1024px), xl (1280px)

## Component Library

### Navigation
- **Sidebar:** Fixed left navigation with icon + label menu items, collapsible state, active item highlighting with primary color background
- **Top Header:** Logo left, user profile/logout right, breadcrumb navigation for context

### Data Display
- **Actions Table:** 
  - Columns: Thumbnail (60px preview), Title, Category (tag), Description (truncated), Downloads (number), Premium (badge), Actions (edit/delete icons)
  - Sticky header on scroll
  - Row hover state with subtle background
  - Pagination: 10/25/50 items per page options at bottom
  - Search bar above table (full-width input with search icon)
  - Filter dropdowns: Category, Premium Status (inline with search)

### Forms & Modals
- **Create/Edit Modal:**
  - 600px width, centered overlay
  - Form layout: Single column, label above input
  - Image Upload: Drag-drop zone showing thumbnail preview (200x200px)
  - Input fields: Title (text), Category (select dropdown), Description (textarea 4 rows), Downloads (number), Premium (toggle switch), Filters (tags input)
  - Footer: Cancel (ghost button) + Save (primary button) aligned right

### Interactive Elements
- **Buttons:**
  - Primary: Filled with primary color (Add New Action, Save)
  - Ghost: Transparent with border (Cancel, Secondary actions)
  - Danger: Red filled for destructive actions (Delete)
  - Icon buttons: 32px circle for table actions

- **Status Indicators:**
  - Premium badge: Gold/yellow tag with crown icon
  - Category tags: Soft colored backgrounds (blue, green, purple variants)
  - Success/error messages: Toast notifications top-right, 4s duration

### Cards & Containers
- **Action Cards (optional gallery view):**
  - 280px width in grid layout
  - Thumbnail image top (16:9 aspect ratio)
  - Content padding: p-4
  - Action buttons overlay on hover

## Interaction Patterns

**Delete Confirmation:**
- Modal overlay with warning icon
- "Are you sure?" messaging
- Show item title being deleted
- Confirm (danger) + Cancel actions

**Form Validation:**
- Real-time validation with red error text below inputs
- Required field indicators (red asterisk)
- Disabled save button until valid

**Loading States:**
- Skeleton screens for table initial load
- Spinner overlay for form submissions
- Disabled state for buttons during API calls

## Image Strategy
**Thumbnail Display:**
- Table: 60x60px rounded corners, object-cover
- Modal preview: 200x200px with border
- Gallery cards: Full width, 16:9 aspect ratio
- Placeholder: Gray background with image icon when no thumbnail

**No hero images needed** - this is a functional admin interface focused on data management

## Animation Guidelines
**Minimal, purposeful motion only:**
- Modal entrance: Fade + scale from 0.95 to 1 (200ms)
- Sidebar toggle: Width transition (300ms ease)
- Form validation: Error shake (200ms)
- NO hover animations, scroll effects, or decorative motion