Create UI/UX wireframes for an Admin Dashboard of an Equipment Borrowing System web application.

DASHBOARD LAYOUT:
- Left sidebar navigation (collapsible)
- Top header with search and admin profile
- Main content area with grid layout

SIDEBAR MENU ITEMS:
- Dashboard (home)
- Requests
- Inventory
- Tickets
- Users
- Settings

DASHBOARD PAGE:
- Top stats cards (4 cards in a row):
  - Pending Requests (with count and icon)
  - Active Loans (with count)
  - Open Tickets (with count)
  - Total Equipment (with count)
- Recent Requests table (showing last 5 pending)
  - Columns: Request #, Student, Date, Items, Action
  - Action buttons: Approve (green), Deny (red)
- Recent Tickets list
- Equipment availability chart (bar chart)
- Quick actions section: Add New Item, Generate Report

REQUEST QUEUE PAGE:
- Filter bar: Date range, Status dropdown, Search
- Table of all pending requests
- Click row to open detailed view modal
- Modal shows:
  - Student information
  - Requested items with quantities
  - Selected dates
  - Purpose/notes
  - Approve/Deny buttons with reason field

INVENTORY MANAGEMENT PAGE:
- "Add New Item" button (top right)
- Search and filter bar
- Table with columns:
  - Image (thumbnail)
  - Name
  - Category
  - Total Qty
  - Available Qty
  - Status (badge)
  - Actions (Edit, Delete)
- Edit modal with form fields
- Delete confirmation dialog

TICKET MANAGEMENT PAGE:
- Tabs: Open, In Progress, Resolved
- Ticket cards in list view
- Each card shows:
  - Ticket number
  - Lab location and PC number
  - Reporter name
  - Description preview
  - Status badge
  - "View" and "Update" buttons
- Click "Update" opens status dropdown

Style: Professional, clean admin dashboard with data tables, cards, modals, and charts. Use white background, subtle shadows, and blue accent colors. Include loading states and empty states. Suitable for university system documentation.