import express from 'express';
import { UserModel } from "../models";
import { createJWT } from "../utils";

export default class UserController {
    show(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findById(id, (err: any, user: any) => {
            if (err) {
                return (
                    res.status(404).json({
                        message: 'Пользователь не найден'
                    })
                )
            } else {
                res.json(user);
            }
        })
    }

    getMe() {
        // return my info
    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password
        };
        const user = new UserModel(postData);
        user.save().then((obj) => {
            res.json(obj);
        }).catch(reason => {
            res.json(reason)
        });
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findByIdAndDelete(id, (err: any, user: any) => {
            if (err) {
                return (
                    res.status(404).json({
                        message: 'Не найден'
                    })
                )
            } else {
                res.json({
                    message: 'Пользователь удален'
                });
            }
        })
    }

    login(req: express.Request, res: express.Response) {
        const postData = {
            email: req.body.login,
            password: req.body.password
        };

        const token = createJWT(postData);

        res.json({
            status: 'Успешно',
            token
        });
    }
}

// export default UserController;