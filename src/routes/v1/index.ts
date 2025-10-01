import express, { Router } from 'express';
import config from '../../config/config';
import docsRoute from './docs.route';
import userRoute from './user.route';
import projectRoute from './project.route';
import mediaRoute from './media.route';
import designRoute from './design.route';
import planRoute from './plan.route';
import contactRoute from './contact.route';

const router: Router = express.Router();

interface defaultRoutesObj {
  path: string;
  route: Router;
}
const defaultRoutes:defaultRoutesObj[] = [
  { path: '/user', route: userRoute },
  { path: '/project', route: projectRoute },
  { path: '/media', route: mediaRoute },
  { path: '/design', route: designRoute },
  { path: '/plan', route: planRoute },
  { path: '/contact', route: contactRoute },
];

// routes available only in development mode
const devRoutes = [
  { path: '/docs', route: docsRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'production') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;