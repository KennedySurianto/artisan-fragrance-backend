import jwt from 'jsonwebtoken';

// Middleware to ensure user is authenticated
const isAuth = (req, res, next) => {
    // Get token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1]; // Assuming 'Bearer <token>'

    // Check if no token is provided
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the user object (decoded from the token) to the request object
        req.user = decoded;

        // Move to the next middleware/route handler
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default isAuth;
