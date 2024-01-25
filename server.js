// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Import the cors middleware
const User = require('./models/user');
/* const User = mongoose.model('./model/user', {
    username: String,
    password: String,
}); */
const app = express();
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3001;
const SECRET_KEY = 'absolutelystrongkey11'; // Change this with a strong secret key

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.post('/some-protected-route', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.userId;

        // Continue processing with the userId...
        res.json({ userId });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
});

mongoose.connect('mongodb://localhost:27017/banking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

/* app.get('/', (req, res) => {
    res.send('Hello from the backend!');
}); */


/* app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
 */

// User model


// Register route
app.post('/api/register', async (req, res) => {
    try {
      // Extract user data from the request body
      const { username, password } = req.body;
  
      // Implemented logic to save the user data to the database
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
      }
      // Hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Received registration request:', { username, hashedPassword });
      // Create a new user
      const user = new User({ username, password: hashedPassword });
      await user.save();
      // Send a success response
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY);
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/* // Delete user route
app.delete('/api/delete-user/:userId', async (req, res) => {
    try {
        // Retrieve user information from the token
        const token = req.headers.authorization.split(' ')[1];
        const { userId: requestingUserId } = jwt.verify(token, SECRET_KEY);

        // Ensure that the requesting user is authorized to delete accounts
        if (requestingUserId !== req.params.userId) {
            return res.status(403).json({ message: 'Forbidden: You are not allowed to delete this account' });
        }

        // Delete the user from the database
        await User.findByIdAndDelete(req.params.userId);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}); */
app.get('/balance', async (req, res) => {
    try {
        //const token = req.headers.authorization;
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token);
        if (!token) {
            return res.status(401).json({ message: 'Missing token' });
        }

        const tokenParts = token.split(' ');

        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({ message: 'Invalid token format' });
        }

        const actualToken = tokenParts[1];

        const { userId } = jwt.verify(actualToken, SECRET_KEY);

        // Fetch the balance from the database using userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const balance = user.balance || 0;

        res.json({ balance });
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Protected route (requires authentication)
app.post('/transaction', async (req, res) => {
    try {
        // Retrieve user information from the token
        const token = req.headers.authorization.split(' ')[1];
        const { userId } = jwt.verify(token, SECRET_KEY);

        // Exec transaction logic 
        // Simulating a transaction by updating a user's balance
        await User.findByIdAndUpdate(userId, { $inc: { balance: 100 } });

        res.json({ message: 'Transaction successful' });
    } catch (error) {
        console.error('Error performing transaction:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});