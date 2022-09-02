import express from 'express';
import { UserModel } from "../schemas";

export default class UserController {
    show(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findById(id, (err: any, user: any) => {
            if (err) {
                return (
                    res.status(404).json({
                        message: 'Не найден'
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
                    message: 'User is deleted'
                });
            }
        })
    }
}

// export default UserController;