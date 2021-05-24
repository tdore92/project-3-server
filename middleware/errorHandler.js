export default function errorHandler(err, req, res, next) {
  console.log('There was an error.')
  console.log(err.name)
  console.log(err)

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid parameter given' })
  }
  if (err.name === 'NotFound') {
    return res.status(404).json({ message: 'Not Found' })
  }

  res.sendStatus(500)
  next(err)
}

