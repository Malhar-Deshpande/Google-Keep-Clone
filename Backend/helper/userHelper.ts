import { User } from "../models/userModel";
import { user } from "../types/userType";

export class UserHelper {
  //Inserting user data into databasee
  async createUsers(users: any) {
    console.log("In createUsers of userHelper.ts");
    const user: any = await User.create(users);
    return user;
  }

  async loginUser(loginCredentials: any) {
    const user: any = await User.findOne({
      where: {
        email: loginCredentials.email,
        password: loginCredentials.password
      }
    });
    return user;
  }

  async allUsernames() {
    const usernames: any = await User.findAll({
      attributes: ['userName']
    })
    return usernames;
  }

}
