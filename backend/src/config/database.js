import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create SQLite database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || path.join(__dirname, '..', '..', 'database.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

// Test database connection
export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite database connected successfully');
    
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
};

export default sequelize;
