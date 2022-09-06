import express from 'express';
import { MessageModel } from "../models";

export default class MessageController {

    index(req: express.Request, res: express.Response) {
        const dialogId = req.query.dialog;
        MessageModel.find({ dialog: dialogId }).populate(['dialog']).exec(function (err, messages) {
            if (err) {
                return res.status(404).json({
                    message: 'Сообщения не найдены'
                })
            } else {
                console.log(dialogId);
                return res.json(messages)
            }
        })
    }

    create(req: express.Request, res: express.Response) {
        const userId = '6314c7f9736410c54c9bf06d';

        const postData = {
            text: req.body.text,
            dialog: req.body.dialog_id,
            user: userId
        };
        const message = new MessageModel(postData);
        message.save().then((obj: any) => {
           res.json(obj);
        }).catch(reason => {
            res.json(reason);
        });
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        MessageModel.findByIdAndDelete(id, (err: any, user: any) => {
            if (err) {
                return (
                    res.status(404).json({
                        message: 'Сообщение не найдено'
                    })
                )
            } else {
                res.json({
                    message: 'Сообщение удалено'
                });
            }
        })
    }
}