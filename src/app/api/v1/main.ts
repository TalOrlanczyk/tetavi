import {Router, Request, Response, NextFunction} from 'express';
import {fn} from 'sequelize';
import {asyncHandler, isRequired} from '../../../utils/function';
import {User} from '../../models/User';

const apiRouter = Router();
apiRouter.get(
    '/users/group_by_age',
    asyncHandler(async (req: Request, res) => {
      const user = await User.findAll({
          attributes: [[fn('COUNT', 'name'), 'total_tests'], 'age'],
          group:['age'],
      });

      res.json({
        code: res.statusCode,
        message: 'ok',
        data: user,
      });
    }),
  );
apiRouter.get(
  '/users/:id',
  asyncHandler(async (req: Request, res) => {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      code: res.statusCode,
      message: 'ok',
      data: user,
    });
  }),
);
apiRouter.post(
  '/users',
  asyncHandler(async (req: Request, res) => {
    const {first_name = isRequired('first_name'),last_name= isRequired('last_name'),age = isRequired('age')} = req.body;

    const user = await User.create({
      firstName:first_name,
      lastName:last_name,
      age,
    });
    res.json({
      code: res.statusCode,
      message: 'ok',
      data: user,
    });
  }),
);

export default apiRouter;
