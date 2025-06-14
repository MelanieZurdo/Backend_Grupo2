const { getConnection } = require("./conexion");
const sql = require("mssql");

const withTransaction = async (callback) => {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    try {
        await transaction.begin();
        const result = await callback(transaction);
        await transaction.commit();
        return result;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
    withTransaction,
};