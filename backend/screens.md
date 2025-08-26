# Food Ordering System - Screen Documentation

## 📱 React Native Mobile App (Customer Side)

### 1. Splash Screen (`SplashScreen.js`)
- **Purpose**: App loading screen with logo
- **API Used**: None
- **UI Elements**:
  - App logo
  - Loading indicator
  - Auto-navigation to Home after 2 seconds

### 2. Login Screen (`LoginScreen.js`)
- **Purpose**: User authentication
- **API Used**: `POST /auth/login`
- **UI Elements**:
  - Email input field
  - Password input field
  - Login button
  - "Don't have an account? Register" link
  - Forgot password link

### 3. Registration Screen (`RegisterScreen.js`)
- **Purpose**: New user account creation
- **API Used**: `POST /auth/register`
- **UI Elements**:
  - Name input field
  - Email input field
  - Phone input field
  - Password input field
  - Confirm password field
  - Register button
  - "Already have an account? Login" link

### 4. Home Screen - Product Display (`HomeScreen.js`) ⭐ DEFAULT SCREEN
- **Purpose**: Main product listing with categories
- **API Used**: `GET /menu`, `GET /menu/categories`
- **UI Elements**:
  - Search bar at top
  - Category tabs (Gujarati, Punjabi, Chinese, Beverages, Desserts)
  - Product grid/cards with:
    - Food image
    - Item name
    - Price
    - Add to cart button
    - Favorite icon
  - Featured items carousel
  - Cart icon badge in header

### 5. Product Detail Screen (`ProductDetailScreen.js`)
- **Purpose**: Detailed view of a single menu item
- **API Used**: `GET /menu/:itemId`
- **UI Elements**:
  - Large food image
  - Item name and description
  - Price and preparation time
  - Quantity selector (+/- buttons)
  - Customization options (spice level, extras)
  - Add to cart button
  - Nutrition information (if available)

### 6. Cart Screen (`CartScreen.js`)
- **Purpose**: Review and modify cart items
- **API Used**: None (local state management)
- **UI Elements**:
  - List of cart items with:
    - Item image
    - Name and price
    - Quantity controls
    - Remove button
  - Subtotal calculation
  - Delivery fee (if applicable)
  - Total amount
  - Promo code input
  - Proceed to checkout button

### 7. Checkout Screen (`CheckoutScreen.js`)
- **Purpose**: Finalize order and payment
- **API Used**: `POST /orders/create`
- **UI Elements**:
  - Order summary
  - Delivery address selection
  - Scheduled pickup time picker
  - Payment method selection (COD, UPI, Credit Card)
  - Special instructions text area
  - Place order button
  - Terms and conditions checkbox

### 8. Order Confirmation Screen (`OrderConfirmationScreen.js`)
- **Purpose**: Order success confirmation
- **API Used**: None (receives order data from previous screen)
- **UI Elements**:
  - Success message with animation
  - Order ID and details
  - Estimated preparation time
  - Track order button
  - Continue shopping button

### 9. Order Tracking Screen (`OrderTrackingScreen.js`)
- **Purpose**: Real-time order status tracking
- **API Used**: `GET /orders/:orderId`
- **UI Elements**:
  - Order status timeline (Pending → Accepted → Preparing → Ready → Completed)
  - Progress bar with current status highlighted
  - Estimated time remaining
  - Contact restaurant button
  - Order details summary

### 10. My Orders Screen (`MyOrdersScreen.js`)
- **Purpose**: View order history
- **API Used**: `GET /orders/my`
- **UI Elements**:
  - Tab navigation (Active, Completed, Cancelled)
  - Order cards with:
    - Order ID and date
    - Status badge
    - Total amount
    - Items preview
  - Pull-to-refresh
  - Empty state when no orders

### 11. Order Details Screen (`OrderDetailsScreen.js`)
- **Purpose**: Detailed view of a specific order
- **API Used**: `GET /orders/:orderId`
- **UI Elements**:
  - Order status and timeline
  - Complete items list with quantities and prices
  - Payment information
  - Pickup/delivery details
  - Reorder button (for completed orders)
  - Support/help button

### 12. Profile Screen (`ProfileScreen.js`)
- **Purpose**: User account management
- **API Used**: `GET /auth/profile`, `PUT /auth/update`
- **UI Elements**:
  - User profile picture (with edit option)
  - Personal information (name, email, phone)
  - Address management
  - Payment methods
  - Notification settings
  - Logout button

### 13. Address Management Screen (`AddressScreen.js`)
- **Purpose**: Manage delivery addresses
- **API Used**: Part of profile update
- **UI Elements**:
  - List of saved addresses
  - Add new address form
  - Edit/delete address options
  - Set default address toggle

---

## 🖥️ Web App - Kitchen Staff Dashboard

### 1. Kitchen Login (`/kitchen/login`)
- **Purpose**: Kitchen staff authentication
- **API Used**: `POST /auth/login`
- **UI Elements**:
  - Login form
  - Kitchen-specific branding

### 2. Kitchen Dashboard (`/kitchen/dashboard`)
- **Purpose**: Order management hub
- **API Used**: `GET /kitchen/orders`
- **UI Elements**:
  - Tab navigation (New Orders, Preparing, Ready)
  - Order cards with:
    - Order ID and time
    - Customer name
    - Items list with quantities
    - Special instructions
    - Estimated preparation time
  - Accept/Reject buttons for new orders
  - Mark as Ready button for preparing orders
  - Real-time updates

### 3. Order Detail Modal (`OrderDetailModal.js`)
- **Purpose**: Detailed order view
- **API Used**: `GET /orders/:orderId`
- **UI Elements**:
  - Complete order items
  - Customer contact information
  - Order notes
  - Status change buttons
  - Preparation timer

---

## 🖥️ Web App - Admin Dashboard

### 1. Admin Login (`/admin/login`)
- **Purpose**: Admin authentication
- **API Used**: `POST /auth/login`
- **UI Elements**:
  - Admin login form
  - Secure access controls

### 2. Admin Dashboard (`/admin/dashboard`)
- **Purpose**: Business overview
- **API Used**: `GET /admin/orders`, `GET /admin/users`
- **UI Elements**:
  - Statistics cards (Total Orders, Revenue, Active Users)
  - Recent orders table
  - Revenue chart
  - Quick actions menu

### 3. User Management (`/admin/users`)
- **Purpose**: Manage customer accounts
- **API Used**: `GET /admin/users`, `PUT /admin/users/:userId/toggle-cod`
- **UI Elements**:
  - Users list with search and filter
  - User details (name, email, phone)
  - COD permission toggle
  - User activity status

### 4. Menu Management (`/admin/menu`)
- **Purpose**: Manage food items
- **API Used**: `GET /menu` (CRUD operations would need implementation)
- **UI Elements**:
  - Menu items list
  - Add/edit item forms
  - Category management
  - Availability toggles
  - Image upload

### 5. Orders Management (`/admin/orders`)
- **Purpose**: View all orders
- **API Used**: `GET /admin/orders`
- **UI Elements**:
  - Complete orders list with filters
  - Order status management
  - Export functionality
  - Order analytics

---

## 📊 API Integration Map

### Authentication Flow
- **Login**: `POST /auth/login` → Navigate to HomeScreen
- **Register**: `POST /auth/login` → Auto-login → HomeScreen
- **Logout**: Clear token → Navigate to LoginScreen

### Product Browsing
- **HomeScreen**: `GET /menu` + `GET /menu/categories` → Display products
- **Search**: Filter local data or implement search API
- **Product Details**: `GET /menu/:itemId` → ProductDetailScreen

### Order Management
- **Add to Cart**: Local state management
- **Checkout**: `POST /orders/create` → OrderConfirmationScreen
- **Order History**: `GET /orders/my` → MyOrdersScreen
- **Order Tracking**: `GET /orders/:orderId` → OrderTrackingScreen

### User Management
- **Profile**: `GET /auth/profile` → ProfileScreen
- **Update Profile**: `PUT /auth/update` → Update local state

---

## 🎨 UI/UX Considerations

### Mobile App
- **Bottom Navigation**: Home, Cart, Orders, Profile
- **Loading States**: Skeleton screens for API calls
- **Empty States**: Illustrations for empty cart/orders
- **Error Handling**: Toast messages for API errors
- **Offline Support**: Basic offline functionality

### Web Apps
- **Responsive Design**: Works on tablets and desktops
- **Real-time Updates**: WebSocket or polling for kitchen orders
- **Data Visualization**: Charts for admin dashboard
- **Accessibility**: Keyboard navigation and screen reader support

---

## 🚀 Demo Scenarios

### Customer Journey
1. Open app → HomeScreen (products display)
2. Browse categories → ProductDetailScreen
3. Add items to cart → CartScreen
4. Checkout → OrderConfirmationScreen
5. Track order → OrderTrackingScreen
6. View history → MyOrdersScreen

### Kitchen Staff Journey
1. Login → Kitchen Dashboard
2. View new orders → Accept/Reject
3. Monitor preparing orders → Mark as Ready
4. Track order completion

### Admin Journey
1. Login → Admin Dashboard
2. View business metrics
3. Manage users → Toggle COD permissions
4. Monitor all orders

This screen documentation provides a complete roadmap for building your food ordering app with the HomeScreen as the default landing page showing products.