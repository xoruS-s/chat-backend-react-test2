import express from 'express';
import { UserModel } from "../models";
import { createJWT } from "../utils";
import { IUser } from "../models/User";

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
        console.log("yes");
        const postData = {
            email: req.body.login,
            password: req.body.password
        };

        UserModel.findOne({ email: postData.email }, (err: any, user: IUser) => {
            if (err) {
                return res.status(404).json({
                    message: 'Пользователь не найден'
                })
            }
            if (user.password === postData.password) {
                const token = createJWT(user);
                res.json({
                    status: 'Успешно',
                    token
                });
            } else {
                res.json({
                    status: 'Успешно',
                    message: 'Неверный логин или пароль'
                });
            }
        });
    }
}