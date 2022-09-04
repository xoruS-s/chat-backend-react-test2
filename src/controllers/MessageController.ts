import express from 'express';
import { MessageModel } from "../models";

export default class MessageController {
    index(req: express.Request, res: express.Response) {
        const dialogId: string = req.params.dialog;

        MessageModel.find({ dialog: dialogId })
            .populate(['dialog'])
            .exec(function (err, messages) {
                if (err) {
                    return res.status(404).json({
                        message: 'Сообщения не найдены'
                    })
                } else {
                    return res.json(messages)
                }
            })
    }

    create() {

    }

    delete() {

    }
}