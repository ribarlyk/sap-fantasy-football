class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
      this.team = null;
    }
  }
  
  class UserManager {
    constructor() {
      this.loggedUser = null;
      this.users = JSON.parse(localStorage.getItem("users")) || [
        new User("Pavkata", "samolevski"),
        new User("DLG", "samocska"),
      ];
    }
  
    login = ({ username, password }) => {
      return new Promise((resolve, reject) => {
        let foundUser = this.users.find(
          (user) => user.username === username && user.password === password
        );
        if (foundUser) {
          this.loggedUser = foundUser;
          localStorage.setItem("loggedUser", JSON.stringify(this.loggedUser));
          resolve(foundUser);
        } else {
          reject("Wrong credentials");
        }
      });
    };
  
    register = ({ username, password }) => {
      return new Promise((resolve, reject) => {
        let foundUser = this.users.find((user) => user.username === username);
  
        if (!foundUser) {
          let newUser = new User(username, password);
          this.users.push(newUser);
          localStorage.setItem("users", JSON.stringify(this.users));
          resolve(newUser);
        } else {
          reject("Username already taken");
        }
      });
    };
  
    isNameTaken(username) {
      let names = this.users.map((obj) => obj.username);
      if (!names.includes(username.toLowerCase())) {
        return true;
      }
      return false;
    }

  }
  
  let userManager = new UserManager();
  
  export default userManager;