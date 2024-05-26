import authModule from "../components/auth/auth.module.js";
import userModule from "../components/user/user.module.js";
import addressModule from "../components/address/address.module.js";

export default (app) => {
  app.use('/api/v1/users', userModule.router);
  app.use('/api/v1/auth', authModule.router);
  app.use('/api/v1/address', addressModule.router);

  app.route('/api/healthcheck').get((_, res) => {
    res.status(200).send({ message: 'Welcome to genio-app' });
  });

  app.all('*', (req, res, next) => {
    res.status(404).send({ message: `Route ${req.originalUrl} not found`});
  });
};
