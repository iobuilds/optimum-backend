import express, { Router } from 'express';
import config from '../../config/config';
import docsRoute from './docs.route';
import userRoute from './user.route';
import projectRoute from './project.route';
import mediaRoute from './media.route';

const router: Router = express.Router();

interface defaultRoutesObj {
  path: string;
  route: Router;
}
const defaultRoutes:defaultRoutesObj[] = [
  { path: '/user', route: userRoute },
  { path: '/project', route: projectRoute },
  { path: '/media', route: mediaRoute },
];

// routes available only in development mode
const devRoutes = [
  { path: '/docs', route: docsRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;