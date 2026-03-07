Create UI/UX wireframes for an Android mobile app for an Equipment Borrowing System. The app should have:

BOTTOM NAVIGATION (visible on main screens):
- Home (catalog)
- Cart
- Requests
- Profile

SCREENS:

1. Login Screen
   - App logo at top
   - Email field
   - Password field
   - "Login" button (full width)
   - "Don't have an account? Register" link
   - "Continue with Google" button
   - Clean, centered design

2. Catalog Screen (Home)
   - Search bar at top
   - Category chips (horizontal scroll): All, Routers, Switches, VR, etc.
   - Grid of equipment cards (2 columns)
   - Each card shows: image, name, availability badge
   - Pull to refresh
   - Floating action button for cart (shows item count badge)

3. Item Detail Screen
   - Back arrow at top
   - Large equipment image with swipe gallery
   - Item name and category
   - Availability status
   - Description (expandable)
   - Specifications section
   - Date pickers (borrow and return)
   - Quantity selector (+/-)
   - "Add to Cart" button (fixed at bottom)

4. Cart Screen
   - List of cart items
   - Each item shows: name, quantity, dates, remove icon (swipe to delete)
   - Purpose/notes field
   - "Submit Request" button (sticky bottom)
   - Empty cart state illustration

5. Requests Screen
   - Segmented tabs: Pending, Active, History
   - List of requests as cards
   - Each card shows: request number, date range, status badge, item count
   - Click card to view details

6. Request Details Screen
   - Request number and status at top
   - Borrow details section
   - List of items with quantities
   - Purpose/notes
   - Timeline showing: Submitted → Approved → Borrowed → Returned
   - Cancel button (if pending)

7. Report Issue Screen
   - Lab location dropdown
   - Equipment/PC number field
   - Description field
   - Camera button to take photo
   - Gallery button to upload
   - Image preview area
   - "Submit Ticket" button

8. Profile Screen
   - User avatar
   - Name and student ID
   - Statistics cards: Total Requests, Active Loans
   - Menu items: My Tickets, Settings, Logout

Style: Material Design 3, clean and modern. Use bottom navigation, cards with elevation, proper touch targets (minimum 44x44px). Show gestures like swipe and pull-to-refresh. Suitable for Android app development reference.