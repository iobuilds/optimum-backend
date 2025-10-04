import config from './config';
import mysql2 from 'mysql2/promise';
import logger from './logger';

const pool = mysql2.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

logger.info('DB pool created');

const query = async (sql: string, params: any[] = [], dev?: boolean) => {
  const responseBody: {
    status: boolean;
    message?: string;
    data?: any;
    code?: string;
  } = { status: true };

  let connection;

  try {
    connection = await pool.getConnection();

    const [rows] = await connection.execute(sql, params);
    responseBody.data = rows;

    return responseBody;
  } catch (err: any) {
    responseBody.status = false;
    logger.error('Error executing query', err);

    if (err?.errno === 1062) {
      const sqlMessage = err.sqlMessage || '';
      const columnName = /for key '(\w+)'/.exec(sqlMessage)?.[1] || '';
      responseBody.message = `This "${columnName}" already exists.`;
      responseBody.code = '1062';
    } else {
      responseBody.message = dev ? JSON.stringify(err) : 'Something went wrong';
    }

    return responseBody;
  } finally {
    if (connection) connection.release();
  }
};

export default { query };
