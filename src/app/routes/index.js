/* eslint-disable linebreak-style */
import GenericHandler from '../helpers/responses';
import authRoutes from './auth/userRouters';

const apiVersion = '/api/v1';
const route = (app) => {
  app.use(apiVersion, authRoutes);
  app.get(apiVersion, (req, res) => {
    GenericHandler.correct(res, 200, 'welcome to express api');
  });
  app.all('/', (req, res) => {
    GenericHandler.correct(res, 401, 'unsolvable method');
  });

  app.use('*', (req, res) => {
    GenericHandler.correct(res, 505, 'unable to find requested route');
  });
};
export default route;
