
export default function errorMiddleware(err, res, req, next) {
  return res.status(500).send({ message: err.message });
}
