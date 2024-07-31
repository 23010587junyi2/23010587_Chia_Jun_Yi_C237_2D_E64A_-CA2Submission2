const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const ejs = require('ejs');

const app = express();
const pricePerKm = 0.1; // $0.10 per kilometer

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// MySQL database connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'distance calculator'
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Middleware setup
app.set('view engine', 'ejs'); // Set up EJS as the view engine
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies (for form data)
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files from the 'public' directory

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Haversine formula to calculate the distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
}

// Route to calculate distance
app.post('/distance', (req, res) => {
    const { lat1, lng1, lat2, lng2 } = req.body;

  
    }
    
    // Calculate the distance
    const distance = calculateDistance(parseFloat(lat1), parseFloat(lng1), parseFloat(lat2), parseFloat(lng2));
    
    // Send the distance as a response
    res.json({ distance: distance.toFixed(2) });
    
});

// Route to calculate price
app.post('/price', (req, res) => {
    const { lat1, lng1, lat2, lng2 } = req.body;

    if (lat1 && lng1 && lat2 && lng2) {
        const distance = calculateDistance(parseFloat(lat1), parseFloat(lng1), parseFloat(lat2), parseFloat(lng2));
        const totalPrice = distance * pricePerKm;
        res.render('payment', { distance: distance.toFixed(2), totalPrice: totalPrice.toFixed(2) });
    } else {
        res.status(400).json({ error: 'Invalid input data' });
    }
});

// Function to convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

let cart = [];

// Route to update cart
app.post('/updateCart', (req, res) => {
    const { id, quantity } = req.body;
    cart = cart.map(item => item.id == id ? { ...item, quantity } : item);
    res.redirect('/cart'); // Redirect to cart page
});

// Route to remove item from cart
app.post('/removeItem', (req, res) => {
    const { id } = req.body;
    cart = cart.filter(item => item.id != id);
    res.redirect('/cart'); // Redirect to cart page
});

// Route for processing payment
app.post('/payment', (req, res) => {
    res.render('thankyou');
});

// Other routes
app.get('/reply', (req, res) => {
    res.render('reply');
});

app.get('/distance', (req, res) => {
    res.render('distance');

});

app.get('/payment', (req, res) => {
    res.render('payment');
});

app.get('/cart', (req, res) => {
    res.render('cart');
});

app.post('/thankyou', (req, res) => {
    res.render('thankyou');
});

app.get('/index', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
