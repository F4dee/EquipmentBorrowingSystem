Create a complete set of UI/UX wireframes for an Equipment Borrowing System web application. Include a fully functional sidebar navigation that allows access to all pages. Design for desktop view only (1024px+).

## SIDEBAR NAVIGATION STRUCTURE:
┌─────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────┐ │
│ │ EQUIPMENT │ MAIN CONTENT AREA │
│ │ BORROWING SYSTEM │ │
│ │ Logo │ │
│ ├─────────────────────┤ │
│ │ │ │
│ │ 🏠 Home │ │
│ │ │ │
│ │ 📝 Register │ │
│ │ │ │
│ │ 📋 Catalog │ │
│ │ │ │
│ │ 🛒 Cart │ │
│ │ │ │
│ │ 📦 Requests │ │
│ │ │ │
│ │ ⚠️ Report │ │
│ │ │ │
│ │ 🔧 Admin │ │
│ │ ▼ Admin/Inventory │ │
│ │ │ │
│ │ 👤 Profile │ │
│ │ │ │
│ │ ⚙️ Settings │ │
│ │ │ │
│ │ Recent Pages: │ │
│ │ › item/4 │ │
│ │ │ │
│ │ + Add Pages │ │
│ └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

text

## COMPLETE PAGE LIST WITH FULL ACCESS:

### 1. HOME PAGE (Default Page)
**URL:** `/home`

**Header:**
- Welcome message: "Good morning/afternoon, [UserName]"
- Current date
- Notification bell
- User avatar dropdown

**Dashboard Statistics Cards (3 in a row):**
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Active │ │ Completed │ │ Open Tickets │
│ Requests │ │ Today │ │ │
│ 32 │ │ 15 │ │ 8 │
└─────────────────┘ └─────────────────┘ └─────────────────┘

text

**Recent Requests Section:**
┌─────────────────────────────────────────────────┐
│ RECENT REQUESTS View All │
├─────────────────────────────────────────────────┤
│ │
│ ┌─────────────────────────────────────────┐ │
│ │ REQ-045 ● PENDING │ │
│ │ John Smith 2 items │ │
│ │ Feb 28, 2026 │ │
│ └─────────────────────────────────────────┘ │
│ │
│ ┌─────────────────────────────────────────┐ │
│ │ REQ-044 ● APPROVED │ │
│ │ Sarah Johnson 1 item │ │
│ │ Feb 28, 2026 │ │
│ └─────────────────────────────────────────┘ │
│ │
│ ┌─────────────────────────────────────────┐ │
│ │ REQ-043 ● BORROWED │ │
│ │ Mike Chen 3 items │ │
│ │ Feb 27, 2026 │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘

text

**Recent Tickets Section:**
┌─────────────────────────────────────────────────┐
│ RECENT TICKETS View All │
├─────────────────────────────────────────────────┤
│ │
│ ┌─────────────────────────────────────────┐ │
│ │ TKT-128 ● HIGH │ │
│ │ Laptop won't power on │ │
│ │ Lab 1 - PC-042 Status: OPEN │ │
│ └─────────────────────────────────────────┘ │
│ │
│ ┌─────────────────────────────────────────┐ │
│ │ TKT-127 ● MEDIUM │ │
│ │ Broken HDMI port │ │
│ │ Building A - EQ-015 Status: IN PROGRESS│ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘

text

---

### 2. REGISTER PAGE
**URL:** `/register`

**Form Layout:**
- Page title: "Create New Account"
- Full name field (with icon)
- Student ID field
- CIT-U email field (with @cit.edu domain hint)
- Password field (with strength indicator)
- Confirm password field
- Terms and conditions checkbox
- "Register" button (full width, blue)
- "Already have an account? Login" link
- Google OAuth registration option

---

### 3. CATALOG PAGE
**URL:** `/catalog`

**Layout:**
- Page title: "Equipment Catalog"
- Search bar (width: 400px) with filter icon
- Category filter chips: All | Routers | Switches | VR Headsets | Hubs | Bridges | NICs
- Availability toggle: "Show available only"

**Equipment Grid (3 columns):**
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ [Image] │ │ [Image] │ │ [Image] │
│ Router TP-Link │ │ Switch Cisco │ │ VR Headset │
│ Available: 5 │ │ Available: 2 │ │ Available: 3 │
│ [Add to Cart] │ │ [Add to Cart] │ │ [Add to Cart] │
└─────────────────┘ └─────────────────┘ └─────────────────┘
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ [Image] │ │ [Image] │ │ [Image] │
│ Network Hub │ │ Bridge │ │ NIC Card │
│ Available: 0 │ │ Available: 4 │ │ Available: 10 │
│ [Out of Stock] │ │ [Add to Cart] │ │ [Add to Cart] │
└─────────────────┘ └─────────────────┘ └─────────────────┘

text

**Pagination:** Previous | 1 | 2 | 3 | 4 | 5 | Next

---

### 4. ITEM DETAIL PAGE (item/4)
**URL:** `/item/4`

**Two-Column Layout:**
- Left column (40%): Large equipment image with thumbnail gallery below
- Right column (60%):
  - Item name: "Router TP-Link Archer C7"
  - Category: Router
  - Availability badge: "In Stock (5 available)"
  - Description: Detailed description text
  - Technical specifications table
  - Borrow date picker
  - Return date picker
  - Quantity selector (+/-)
  - "Add to Cart" button (blue, large)
  - "Back to Catalog" link

---

### 5. CART PAGE
**URL:** `/cart`

**Page title:** "Your Borrowing Cart"

**Two-Column Layout:**
- Left column (65%):
  - Cart items table:
    - Columns: Item, Quantity, Borrow Date, Return Date, Actions
    - Row 1: Router TP-Link | Qty: 1 | Feb 28 - Mar 5 | Remove
    - Row 2: Switch Cisco | Qty: 2 | Feb 28 - Mar 7 | Remove
    - Row 3: VR Headset | Qty: 1 | Mar 1 - Mar 3 | Remove

- Right column (30%):
  - Order Summary card
  - Purpose/Reason for borrowing textarea
  - Total items: 4
  - Total borrowing days: 12
  - "Submit Request" button (blue, full width)
  - "Continue Shopping" link

---

### 6. REQUESTS PAGE
**URL:** `/requests`

**Page title:** "My Borrowing Requests"

**Tab Navigation:** Pending | Approved | Borrowed | Returned | All

**Requests Table:**
| Request # | Date Range | Items | Status | Action |
|-----------|------------|-------|--------|--------|
| REQ-045 | Feb 28 - Mar 5 | 2 items | ⚪ PENDING | View |
| REQ-044 | Feb 28 - Mar 7 | 1 item | 🟢 APPROVED | View |
| REQ-043 | Feb 27 - Mar 2 | 3 items | 🔵 BORROWED | View |
| REQ-042 | Feb 25 - Feb 28 | 2 items | ⚫ RETURNED | View |

**Click "View" opens Request Details Modal:**
- Request number and status
- Student information
- Items list with quantities
- Approval/denial reason (if applicable)
- Timeline: Submitted → Approved → Borrowed → Returned

---

### 7. REPORT PAGE
**URL:** `/report`

**Page title:** "Report Lab Issue"

**Form Layout:**
- Lab location dropdown (GLE Lab 101, GLE Lab 102, etc.)
- PC/Equipment number field
- Problem description textarea (rows: 6)
- File attachment area:
  - Drag & drop or click to upload
  - Supported formats: JPG, PNG, PDF
  - Max size: 5MB
- Image preview thumbnails
- "Submit Ticket" button (blue)
- "Cancel" button

---

### 8. ADMIN PAGE
**URL:** `/admin`

**Admin Dashboard Layout:**

**Header:** "Admin Dashboard" with date range picker

**Statistics Cards (4 in a row):**
| Total Equipment | Pending Requests | Active Loans | Open Tickets |
|-----------------|------------------|--------------|--------------|
| 156 | 12 | 8 | 5 |

**Quick Actions Bar:**
- "Add New Equipment" button
- "Generate Report" button
- "Export Data" button

**Recent Requests Table (Admin View):**
| Request # | Student | Items | Borrow Date | Status | Actions |
|-----------|---------|-------|-------------|--------|---------|
| REQ-045 | John Smith | 2 | Feb 28 | PENDING | ✅ Approve | ❌ Deny | 👁️ View |
| REQ-044 | Sarah Johnson | 1 | Feb 28 | APPROVED | 👁️ View |
| REQ-043 | Mike Chen | 3 | Feb 27 | BORROWED | 👁️ View |

**Recent Tickets Table (Admin View):**
| Ticket # | Priority | Description | Location | Status | Actions |
|----------|----------|-------------|----------|--------|---------|
| TKT-128 | 🔴 HIGH | Laptop won't power on | Lab1-PC-042 | OPEN | Update |
| TKT-127 | 🟠 MEDIUM | Broken HDMI port | Bldg A-EQ-015 | IN PROGRESS | Update |
| TKT-126 | 🟢 LOW | Mouse not working | Lab3-PC-128 | OPEN | Update |

---

### 9. ADMIN/INVENTORY PAGE
**URL:** `/admin/inventory`

**Page title:** "Inventory Management"

**Top Bar:**
- "Add New Item" button (blue)
- Search bar
- Category filter dropdown
- Status filter dropdown

**Inventory Table:**
| Image | Name | Category | Total Qty | Available Qty | Status | Actions |
|-------|------|----------|-----------|---------------|--------|---------|
| [img] | Router TP-Link | Router | 10 | 5 | 🟢 Available | ✏️ Edit | 🗑️ Delete |
| [img] | Switch Cisco | Switch | 8 | 2 | 🟢 Available | ✏️ Edit | 🗑️ Delete |
| [img] | VR Headset | VR | 5 | 3 | 🟢 Available | ✏️ Edit | 🗑️ Delete |
| [img] | Network Hub | Hub | 4 | 0 | 🔴 Out of Stock | ✏️ Edit | 🗑️ Delete |
| [img] | Bridge | Bridge | 6 | 4 | 🟢 Available | ✏️ Edit | 🗑️ Delete |
| [img] | NIC Card | NIC | 20 | 10 | 🟢 Available | ✏️ Edit | 🗑️ Delete |

**Pagination:** 1 | 2 | 3 | ... | 10

**Add/Edit Item Modal:**
- Item name field
- Category dropdown
- Description textarea
- Total quantity field
- Image upload
- Specifications textarea
- Location field
- "Save" button | "Cancel" button

---

### 10. PROFILE PAGE
**URL:** `/profile`

**Profile Header:**
- Profile picture (circle, editable)
- Name: "John Nathaniel Munalem"
- Student ID: "22-5654-734"
- Email: "john.munalem@cit.edu"
- Role badge: "STUDENT" or "ADMIN"
- "Edit Profile" button

**Statistics Cards (3 in a row):**
| Total Requests | Active Loans | Pending Requests |
|----------------|--------------|------------------|
| 24 | 2 | 1 |

**Tabbed Content:**
- Tab 1: "Borrowing History" (table of past requests)
- Tab 2: "My Tickets" (table of submitted maintenance tickets)
- Tab 3: "Settings" (account preferences)

---

### 11. SETTINGS PAGE
**URL:** `/settings`

**Page title:** "Settings"

**Tabbed Sections:**
- Tab 1: "Account Settings"
  - Change password form
  - Email notifications toggle
  - Two-factor authentication option

- Tab 2: "Notification Preferences"
  - Email notifications for request updates
  - Email notifications for ticket updates
  - Reminder settings

- Tab 3: "Theme Preferences"
  - Light/Dark mode toggle
  - Compact view toggle

---

### 12. RECENT PAGES (item/4)
**URL:** `/item/4` (as shown in sidebar)

This is the Item Detail page for item ID 4 (already designed above). The sidebar shows "Recent Pages" section with clickable history links.

---

## SIDEBAR INTERACTIVITY SPECIFICATIONS:

- **Hover state:** Menu items light blue background
- **Active state:** Menu item has blue background with white icon
- **Expandable sections:** Admin menu expands to show submenu (Admin/Inventory)
- **Recent Pages:** Dynamically updates based on user's last visited pages
- **Add Pages:** Click to manually add shortcut to sidebar
- **Collapsible sidebar:** Toggle button to collapse to icons only

---

## DESIGN SPECIFICATIONS FOR FIGMA:

### Color Palette:
- Primary Blue: #2563EB
- Secondary Purple: #7C3AED
- Success Green: #10B981
- Warning Orange: #F59E0B
- Error Red: #EF4444
- Gray Scale:
  - Background: #F9FAFB
  - Card Background: #FFFFFF
  - Border: #E5E7EB
  - Text Primary: #111827
  - Text Secondary: #6B7280

### Typography:
- Font Family: Inter (or Roboto)
- Headings:
  - H1: 32px, Bold
  - H2: 24px, SemiBold
  - H3: 20px, SemiBold
- Body: 16px, Regular
- Small text: 14px, Regular
- Labels: 14px, Medium

### Components:

**Buttons:**
- Primary: Blue, 8px border-radius, padding: 12px 24px
- Secondary: White border, blue text, 8px border-radius
- Icon buttons: 40x40px, circular

**Cards:**
- White background
- Border-radius: 12px
- Box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)
- Padding: 20px

**Tables:**
- Header: #F3F4F6, 14px SemiBold
- Row hover: #F9FAFB
- Border: 1px solid #E5E7EB
- Cell padding: 12px 16px

**Badges:**
- Pill shape, border-radius: 999px
- Padding: 4px 12px
- Font size: 12px, Medium

**Forms:**
- Input height: 40px
- Border: 1px solid #D1D5DB
- Border-radius: 8px
- Focus: ring 2px #2563EB

**Modals:**
- Width: 500px
- Centered
- Backdrop blur
- Border-radius: 16px

### Spacing:
- 8px grid system
- Sidebar width: 260px (collapsed: 80px)
- Content max-width: 1440px
- Page padding: 24px

---

## FIGMA ASSETS TO CREATE:

1. **Master Components:**
   - Button variants (primary, secondary, outline, icon)
   - Form inputs (text, dropdown, checkbox, radio)
   - Cards (stat card, request card, ticket card)
   - Badges (status, priority)
   - Tables with sortable headers
   - Modals
   - Navigation sidebar

2. **Icons Needed:**
   - Home, Register, Catalog, Cart, Requests, Report, Admin, Profile, Settings
   - Add, Edit, Delete, View, Approve, Deny
   - Bell, User, Search, Filter, Calendar
   - Priority indicators (High, Medium, Low)

3. **Pages (Figma Frames):**
   - Home/Dashboard
   - Register
   - Catalog
   - Item Detail (item/4)
   - Cart
   - Requests
   - Report
   - Admin Dashboard
   - Admin/Inventory
   - Profile
   - Settings

Create this as a fully navigable prototype in Figma with all pages accessible from the sidebar navigation. Use auto-layout for responsiveness within desktop constraints.