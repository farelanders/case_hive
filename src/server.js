import app from './app'
import connection from './config/connection'
const port = 3000

const connect = async () => {
  try {
    await connection.authenticate()
    console.log('Database running...')
  } catch (error) {
    console.log(error)
  }
}
connect()

app.listen(port)
