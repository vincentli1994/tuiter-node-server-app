import * as usersDao from "./users-dao.js";


const AuthController = (app) => {
  const register = (req, res) => {
    const username = req.body.username;
    const user = usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    // const newUser = usersDao.createUser(req.body);
    // req.session["currentUser"] = newUser;
    // res.json(newUser);
    usersDao.createUser(req.body)
    req.session["currentUser"] = req.body
    res.json(req.body);
  };

  const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = usersDao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };

  const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const update = (req, res) => {
    const user = usersDao.updateUser(req.params.uid, req.body)
    req.session["currentUser"] = user
    res.json(user)
  }



  //   const updatedUser = usersDao.updateUser(currentUser.id, req.body);
  //   if (updatedUser) {
  //     req.session["currentUser"] = updatedUser;
  //     res.json(updatedUser);
  //   } else {
  //     res.sendStatus(404);
  //   }
  // };

  app.post("/api/register", register);
  app.post("/api/login", login);
  app.post("/api/profile", profile);
  app.post("/api/logout", logout);
  app.put("/api/:uid", update);
}

export default AuthController;

