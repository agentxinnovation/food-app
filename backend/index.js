const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors(
  {
    origin: '*',
  }
));

// Middleware to parse JSON request bodies
app.use(express.json());

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

// JWT Secret (in production, use environment variable)
const JWT_SECRET = 'your-secret-key-change-this-in-production';

//app.use(express.static(path.join(__dirname, 'public')))
//  .set('views', path.join(__dirname, 'views'))
//  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.json({"msg":"Hello Duniya "});
});

app.get('/api', (req, res) => {
  res.json({"msg": "Hello world"});
});

app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

// Function to read JSON file with error handling
const readJSONFile = (filename) => {
  try {
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) {
      // Create empty array if file doesn't exist
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

// Function to write JSON file
const writeJSONFile = (filename, data) => {
  try {
    const filePath = path.join(__dirname, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
};

// Load data from JSON files
let users = readJSONFile('users.json');
let orders = readJSONFile('orders.json');
let menu = readJSONFile('menu.json');

// Initialize menu if empty
if (menu.length === 0) {
  menu = [
    {
      "itemId": "guj001",
      "name": "Gujarati Thali",
      "description": "Traditional Gujarati thali with dal, kadhi, sabji, rotli, rice, and sweets",
      "price": 280.0,
      "category": "Gujarati",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 25
    },
    {
      "itemId": "guj002",
      "name": "Dhokla (4 pieces)",
      "description": "Soft and spongy steamed gram flour cakes with green chutney",
      "price": 80.0,
      "category": "Gujarati",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 5
    },
    {
      "itemId": "guj003",
      "name": "Khandvi",
      "description": "Gram flour rolls with mustard and coconut tempering",
      "price": 120.0,
      "category": "Gujarati",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 15
    },
    {
      "itemId": "guj004",
      "name": "Undhiyu",
      "description": "Mixed vegetable curry with surti papdi, brinjal, and sweet potato",
      "price": 180.0,
      "category": "Gujarati",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 30
    },
    {
      "itemId": "guj005",
      "name": "Fafda Jalebi",
      "description": "Crispy gram flour strips with sweet jalebi and green chutney",
      "price": 90.0,
      "category": "Gujarati",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 10
    },
    {
      "itemId": "pun001",
      "name": "Butter Chicken with 4 Rotis",
      "description": "Creamy tomato-based chicken curry with fresh butter rotis",
      "price": 320.0,
      "category": "Punjabi",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 25
    },
    {
      "itemId": "pun002",
      "name": "Dal Makhani with Rice",
      "description": "Rich black lentils cooked in butter and cream, served with basmati rice",
      "price": 250.0,
      "category": "Punjabi",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 20
    },
    {
      "itemId": "pun003",
      "name": "Aloo Paratha (2 pieces)",
      "description": "Stuffed potato parathas with pickle, curd, and butter",
      "price": 160.0,
      "category": "Punjabi",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 18
    },
    {
      "itemId": "pun004",
      "name": "Paneer Butter Masala",
      "description": "Cottage cheese in rich tomato and butter gravy",
      "price": 280.0,
      "category": "Punjabi",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 22
    },
    {
      "itemId": "pun005",
      "name": "Gobhi Paratha (2 pieces)",
      "description": "Cauliflower stuffed parathas with pickle and curd",
      "price": 140.0,
      "category": "Punjabi",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 20
    },
    {
      "itemId": "pun006",
      "name": "Rajma Chawal",
      "description": "Red kidney beans curry with steamed basmati rice",
      "price": 200.0,
      "category": "Punjabi",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 15
    },
    {
      "itemId": "chi001",
      "name": "Hakka Noodles",
      "description": "Stir-fried noodles with vegetables and soy sauce",
      "price": 180.0,
      "category": "Chinese",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 12
    },
    {
      "itemId": "chi002",
      "name": "Chicken Fried Rice",
      "description": "Wok-tossed rice with chicken, vegetables, and Chinese seasonings",
      "price": 220.0,
      "category": "Chinese",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 15
    },
    {
      "itemId": "chi003",
      "name": "Chicken Manchurian",
      "description": "Deep-fried chicken balls in sweet and sour Manchurian sauce",
      "price": 280.0,
      "category": "Chinese",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 20
    },
    {
      "itemId": "chi004",
      "name": "Veg Spring Rolls (6 pieces)",
      "description": "Crispy rolls filled with vegetables, served with sweet chili sauce",
      "price": 150.0,
      "category": "Chinese",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 12
    },
    {
      "itemId": "chi005",
      "name": "Chilli Chicken",
      "description": "Spicy chicken with bell peppers and onions in Indo-Chinese style",
      "price": 300.0,
      "category": "Chinese",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 18
    },
    {
      "itemId": "chi006",
      "name": "Schezwan Fried Rice",
      "description": "Spicy fried rice with Schezwan sauce and mixed vegetables",
      "price": 190.0,
      "category": "Chinese",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 14
    },
    {
      "itemId": "chi007",
      "name": "Chicken Lollipop (8 pieces)",
      "description": "Marinated chicken wings shaped as lollipops, deep-fried and tossed in sauce",
      "price": 320.0,
      "category": "Chinese",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 25
    },
    {
      "itemId": "sou001",
      "name": "Hot & Sour Soup",
      "description": "Tangy soup with mushrooms, tofu, and vegetables",
      "price": 80.0,
      "category": "Soup",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 8
    },
    {
      "itemId": "sou002",
      "name": "Chicken Corn Soup",
      "description": "Creamy soup with shredded chicken and sweet corn",
      "price": 100.0,
      "category": "Soup",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 10
    },
    {
      "itemId": "bev001",
      "name": "Masala Chai",
      "description": "Traditional Indian spiced tea",
      "price": 25.0,
      "category": "Beverage",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 5
    },
    {
      "itemId": "bev002",
      "name": "Fresh Lime Water",
      "description": "Refreshing lime water with mint",
      "price": 40.0,
      "category": "Beverage",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 3
    },
    {
      "itemId": "bev003",
      "name": "Mango Lassi",
      "description": "Thick yogurt drink with fresh mango pulp",
      "price": 80.0,
      "category": "Beverage",
      "imageUrl": "",
      "isAvailable": true,
      "preparationTime": 5
    }
  ];
  writeJSONFile('menu.json', menu);
}

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Admin Middleware
const requireAdmin = (req, res, next) => {
  const user = users.find(u => u.userId === req.user.userId);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Utility function to find a user by email
const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

// Utility function to generate JWT token
const generateAuthToken = (userId, email) => {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '24h' });
};

/*
Installation Instructions:
1. Run: npm init -y
2. Run: npm install express jsonwebtoken bcrypt
3. Create empty JSON files or let the app create them automatically
4. Run: node index.js

The app will automatically create users.json, orders.json, and menu.json files if they don't exist.
*/

// User Authentication APIs

// POST /auth/register
app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Basic validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const userId = `user_${Date.now()}`;
    const newUser = {
      userId,
      name,
      email,
      phone,
      password: hashedPassword,
      profileImage: '',
      defaultAddress: {},
      role: role || 'customer',
      canUseCOD: true, // Default to true for demo
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    users.push(newUser);
    
    // Write to file
    if (!writeJSONFile('users.json', users)) {
      return res.status(500).json({ message: 'Error saving user data' });
    }

    // Remove password from response
    const { password: _, ...userResponse } = newUser;
    
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: userResponse 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /auth/login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const authToken = generateAuthToken(user.userId, user.email);

    // Update last login time
    user.lastLogin = new Date().toISOString();
    writeJSONFile('users.json', users);

    res.json({ 
      message: 'Login successful', 
      authToken,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        canUseCOD: user.canUseCOD
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /auth/profile
app.get('/auth/profile', authenticateToken, (req, res) => {
  const user = users.find(user => user.userId === req.user.userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Remove password from response
  const { password: _, ...userResponse } = user;
  res.json({ user: userResponse });
});

// PUT /auth/update
app.put('/auth/update', authenticateToken, (req, res) => {
  const user = users.find(user => user.userId === req.user.userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name, phone, address } = req.body;

  // Update user properties
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (address) user.defaultAddress = address;

  // Write to file
  if (!writeJSONFile('users.json', users)) {
    return res.status(500).json({ message: 'Error updating user data' });
  }

  // Remove password from response
  const { password: _, ...userResponse } = user;
  res.json({ message: 'Profile updated successfully', user: userResponse });
});

// Admin User Management APIs

// GET /admin/users - Get all users (admin only)
app.get('/admin/users', authenticateToken, requireAdmin, (req, res) => {
  // Remove passwords from response
  const usersWithoutPasswords = users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  res.json({ users: usersWithoutPasswords });
});

// PUT /admin/users/:userId/toggle-cod - Toggle COD permission (admin only)
app.put('/admin/users/:userId/toggle-cod', authenticateToken, requireAdmin, (req, res) => {
  const { userId } = req.params;
  const user = users.find(user => user.userId === userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.canUseCOD = !user.canUseCOD;
  
  // Write to file
  if (!writeJSONFile('users.json', users)) {
    return res.status(500).json({ message: 'Error updating user data' });
  }

  res.json({ 
    message: `COD permission ${user.canUseCOD ? 'enabled' : 'disabled'} for user`, 
    user: {
      userId: user.userId,
      name: user.name,
      email: user.email,
      canUseCOD: user.canUseCOD
    }
  });
});

// Order Management APIs

// POST /orders/create
app.post('/orders/create', authenticateToken, (req, res) => {
  const { items, scheduledPickupTime, paymentMethod, specialInstructions } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0 || !scheduledPickupTime || !paymentMethod) {
    return res.status(400).json({ message: 'Missing required fields or invalid format' });
  }

  // Check if user can use COD if payment method is COD
  const user = users.find(u => u.userId === req.user.userId);
  if (paymentMethod === 'cod' && !user.canUseCOD) {
    return res.status(400).json({ message: 'COD payment is not available for your account' });
  }

  // Calculate total price
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const orderId = `order_${Date.now()}`;
  const newOrder = {
    orderId,
    userId: req.user.userId,
    userName: user.name,
    userPhone: user.phone,
    items,
    totalPrice,
    status: 'pending',
    orderType: 'takeaway',
    scheduledPickupTime,
    actualPickupTime: null,
    paymentMethod,
    paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
    specialInstructions: specialInstructions || '',
    createdAt: new Date().toISOString(),
    statusHistory: [
      {
        status: 'pending',
        timestamp: new Date().toISOString(),
        message: 'Order received and waiting for kitchen confirmation'
      }
    ]
  };

  orders.push(newOrder);
  
  // Write to file
  if (!writeJSONFile('orders.json', orders)) {
    return res.status(500).json({ message: 'Error saving order data' });
  }

  res.status(201).json({ message: 'Order placed successfully', order: newOrder });
});

// GET /orders/user/{userId}
app.get('/orders/user/:userId', authenticateToken, (req, res) => {
  const { userId } = req.params;

  // Check if requesting user matches the userId or implement admin check
  if (req.user.userId !== userId && users.find(u => u.userId === req.user.userId).role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const userOrders = orders.filter(order => order.userId === userId);
  res.json({ orders: userOrders });
});

// GET /orders/my - Get current user's orders
app.get('/orders/my', authenticateToken, (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user.userId);
  res.json({ orders: userOrders });
});

// GET /orders/{orderId}
app.get('/orders/:orderId', authenticateToken, (req, res) => {
  const { orderId } = req.params;
  const order = orders.find(order => order.orderId === orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Check if user owns the order or is admin
  const user = users.find(u => u.userId === req.user.userId);
  if (order.userId !== req.user.userId && user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.json({ order });
});

// PUT /orders/{orderId}/status
app.put('/orders/:orderId/status', authenticateToken, (req, res) => {
  const { orderId } = req.params;
  const { status, message } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Missing status field' });
  }

  const order = orders.find(order => order.orderId === orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Check if user is admin or kitchen staff for status changes
  const user = users.find(u => u.userId === req.user.userId);
  if (user.role !== 'admin' && user.role !== 'kitchen') {
    return res.status(403).json({ message: 'Access denied' });
  }

  order.status = status;
  
  // Add to status history
  order.statusHistory = order.statusHistory || [];
  order.statusHistory.push({
    status,
    timestamp: new Date().toISOString(),
    message: message || `Order status changed to ${status}`
  });

  // If status is 'ready', set ready time
  if (status === 'ready') {
    order.readyAt = new Date().toISOString();
  }
  
  // If status is 'completed', set actual pickup time
  if (status === 'completed') {
    order.actualPickupTime = new Date().toISOString();
    // If payment method was COD, mark as paid
    if (order.paymentMethod === 'cod') {
      order.paymentStatus = 'paid';
    }
  }
  
  // Write to file
  if (!writeJSONFile('orders.json', orders)) {
    return res.status(500).json({ message: 'Error updating order data' });
  }

  res.json({ message: `Order status updated to ${status}`, order });
});

// Menu APIs

// GET /menu
app.get('/menu', (req, res) => {
  res.json({ menu });
});

// GET /menu/categories
app.get('/menu/categories', (req, res) => {
  const categories = [...new Set(menu.map(item => item.category))];
  res.json({ categories });
});

// GET /menu/{itemId}
app.get('/menu/:itemId', (req, res) => {
  const { itemId } = req.params;
  const item = menu.find(item => item.itemId === itemId);

  if (!item) {
    return res.status(404).json({ message: 'Menu item not found' });
  }

  res.json({ item });
});

// Kitchen Staff APIs

// GET /kitchen/orders
app.get('/kitchen/orders', authenticateToken, (req, res) => {
  // Check if user is kitchen staff or admin
  const user = users.find(u => u.userId === req.user.userId);
  if (user.role !== 'kitchen' && user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const pendingOrders = orders.filter(order => order.status === 'pending' || order.status === 'accepted');
  res.json({ orders: pendingOrders });
});

// PUT /kitchen/order/{orderId}/accept
app.put('/kitchen/order/:orderId/accept', authenticateToken, (req, res) => {
  const { orderId } = req.params;
  const { estimatedPreparationTime } = req.body;

  if (estimatedPreparationTime === undefined) {
    return res.status(400).json({ message: 'Missing estimatedPreparationTime field' });
  }

  // Check if user is kitchen staff or admin
  const user = users.find(u => u.userId === req.user.userId);
  if (user.role !== 'kitchen' && user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const order = orders.find(order => order.orderId === orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = 'accepted';
  order.estimatedPreparationTime = estimatedPreparationTime;
  
  // Add to status history
  order.statusHistory = order.statusHistory || [];
  order.statusHistory.push({
    status: 'accepted',
    timestamp: new Date().toISOString(),
    message: `Order accepted by kitchen. Estimated preparation time: ${estimatedPreparationTime} minutes`
  });
  
  // Write to file
  if (!writeJSONFile('orders.json', orders)) {
    return res.status(500).json({ message: 'Error updating order data' });
  }

  res.json({ message: 'Order accepted', order });
});

// PUT /kitchen/order/{orderId}/reject
app.put('/kitchen/order/:orderId/reject', authenticateToken, (req, res) => {
  const { orderId } = req.params;
  const { reason } = req.body;

  if (!reason) {
    return res.status(400).json({ message: 'Missing reason field' });
  }

  // Check if user is kitchen staff or admin
  const user = users.find(u => u.userId === req.user.userId);
  if (user.role !== 'kitchen' && user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const order = orders.find(order => order.orderId === orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = 'rejected';
  order.rejectionReason = reason;
  
  // Add to status history
  order.statusHistory = order.statusHistory || [];
  order.statusHistory.push({
    status: 'rejected',
    timestamp: new Date().toISOString(),
    message: `Order rejected: ${reason}`
  });
  
  // Write to file
  if (!writeJSONFile('orders.json', orders)) {
    return res.status(500).json({ message: 'Error updating order data' });
  }

  res.json({ message: 'Order rejected', order });
});

// GET /admin/orders - Get all orders (admin only)
app.get('/admin/orders', authenticateToken, requireAdmin, (req, res) => {
  res.json({ orders });
});
const hostname = '127.0.0.1';
app.listen(port,(e) => {
  console.log("E: ",e)
  console.log(`Listening on http://${hostname}:${port}`);
  console.log('JSON files will be created automatically if they don\'t exist');
});
