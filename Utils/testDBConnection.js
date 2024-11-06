// Test database connection
const testConnection = async (sequelize) => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process?.exit(1);
  }
};


export default testConnection;