
export default (app) => {
  app.route('/api/healthcheck').get((_, res) => {
    res.status(200).send({ message: 'Welcome to genio-app' });
  });
};
