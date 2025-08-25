import config from './config';
import mysql2 from 'mysql2/promise'; // Use the promise-based API
import logger from './logger';

const pool = mysql2.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    connectionLimit: 10
});
logger.info("DB pool created")

const query = async (sql: string, params: any[], dev?: boolean) => {

    let responseBody: { status: boolean; message?: string, data?: any, code?: string } = {
        status: true
    };

    try {

        const connection = await pool.getConnection();
        try {
            const results = await connection.execute(sql, params);
            responseBody.data = results[0];
            connection.release();
            return responseBody;
        } catch (queryErr) {
            connection.release();
            responseBody.status = false;

            let queryErrObj = typeof queryErr === "object" && queryErr!== null  ? queryErr : {errNo:0};
            let errNo = queryErrObj['errno' as keyof typeof queryErrObj];
            // Check if unique key error
            if(errNo === 1062){
                const sqlMessage = queryErrObj['sqlMessage' as keyof typeof queryErrObj];
                const columnName = /for key '(\w+)'/.exec(sqlMessage)?.[1] || "";
                responseBody.message = `This "${columnName}" is already exists`;
                responseBody.code = `1062`;
                return responseBody;
            }
            // Return Error response
            logger.error('Error executing query', queryErr);
            responseBody.message = 'Something went wrong';
            if (dev === true) responseBody.message = JSON.stringify(queryErr);
            return responseBody;

        } finally {
            connection.release(); // Always release the connection, even if an error occurred
        }

    } catch (err) {

        console.error('Error getting database connection', err);
        responseBody.status = false;
        responseBody.message = 'Something went wrong';
        return responseBody;

    }

};

export default { query };
