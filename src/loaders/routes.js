import authModule from "../components/auth/auth.module.js";
import userModule from "../components/user/user.module.js";

export default (app) => {
  app.use('/api/v1/users', userModule.router);
  app.use('/api/v1/auth', authModule.router);

  app.route('/api/healthcheck').get((_, res) => {
    res.status(200).send({ message: 'Welcome to genio-app' });
  });
};
