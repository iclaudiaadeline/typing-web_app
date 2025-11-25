import jwt from 'jsonwebtoken';

// Generate JWT Token
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Generate Refresh Token
export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d'
  });
};

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
};

// Send token response
export const sendTokenResponse = (user, statusCode, res) => {
  // Support both MongoDB (_id) and Sequelize (id)
  const userId = user._id || user.id;
  const token = generateToken(userId);
  const refreshToken = generateRefreshToken(userId);

  res.status(statusCode).json({
    status: 'success',
    token,
    refreshToken,
    user: {
      id: userId,
      name: user.name,
      email: user.email,
      role: user.role,
      firstName: user.name?.split(' ')[0] || '',
      lastName: user.name?.split(' ').slice(1).join(' ') || ''
    }
  });
};
