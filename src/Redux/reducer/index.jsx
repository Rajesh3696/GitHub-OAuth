import { connectRouter } from 'connected-react-router'
import auth from './auth'

export default (history) => ({
  router: connectRouter(history),
  auth: auth,
})
