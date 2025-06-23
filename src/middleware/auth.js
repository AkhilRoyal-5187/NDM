// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { NextResponse } = require('next/server'); // Import NextResponse

// This middleware wraps your API route handler function
const authenticateToken = (handler) => async (request, context) => {
  const authHeader = request.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return NextResponse.json({ message: 'Authentication token required' }, { status: 401 });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user information to the request object for downstream handlers
    // In Next.js App Router, you can't directly mutate 'request' for a clean pass.
    // Instead, you'd typically pass it via context or reconstruct the request.
    // For simplicity, we'll ensure 'request.user' is available for the handler,
    // though the standard Next.js way is often to use context if possible.
    request.user = user; // This mutation might not be ideal for all setups, but works for basic cases.
    
    // Pass control to the wrapped handler
    return handler(request, context);
  } catch (err) {
    console.error('JWT verification error:', err.message);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 403 });
  }
};

module.exports = { authenticateToken };