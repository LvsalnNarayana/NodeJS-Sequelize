import "dotenv/config";
import { faker } from "@faker-js/faker";
import sequelize from "./Utils/connectDB.js";
import User from "./Model/User.model.js";
import testConnection from "./Utils/testDBConnection.js";

testConnection(sequelize);
async function createUsers() {
  try {
    for (let i = 0; i < 20; i++) {
      const username = faker.internet.username().replace(/\W+/g, "");
      const email = faker.internet.email();
      const password = faker.internet.password();
      await User.create({
        username,
        email,
        password,
      });
    }
    console.log("20 users created successfully!");
  } catch (error) {
    console.log(error);

    // console.error("Error creating users:", error?.message);
  }
}

sequelize
  .sync()
  .then(() => {
    createUsers()
      .then(() => {
        sequelize.close();
      })
      .catch((err) => console.error("Error creating users:", err));
  })
  .catch((err) => console.error("Error syncing database:", err));
