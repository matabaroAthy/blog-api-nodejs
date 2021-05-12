/* eslint-disable linebreak-style */
import GenericHandler from '../helpers/responses';
import authRoutes from './auth/userRouters';
import allStatus from '../helpers/statusKeys';
import state from '../helpers/messageCode';
import postRoutes from './blog/postRouters';

const apiVersion = process.env.API_VERSION;

class mySroute {
  static run(app) {
    app.use(apiVersion, authRoutes, postRoutes);
    app.get(apiVersion, (req, res) => {
      GenericHandler.correct(res, allStatus.SUCCESSFUL_CODE, state.SUCCESS_RUN);
    });
    app.all('/', (req, res) => {
      GenericHandler.correct(res, allStatus.NOT_FOUND_CODE, state.NOT_FOUND_METHOD);
    });

    app.use('*', (req, res) => {
      GenericHandler.correct(res, allStatus.NOT_FOUND_CODE, state.NOT_FOUND_REQ);
    });
  }
}
export default mySroute;
