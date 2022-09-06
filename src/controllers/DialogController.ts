import express from 'express';
import { DialogModel, MessageModel } from "../models";

export default class DialogController {

    index(req: express.Request, res: express.Response) {
        const authorId: string = req.params.id;
        DialogModel.find({author: authorId}).populate(['author', 'partner']).exec(function (err, dialogs) {
            if (err) {
                return res.status(404).json({
                    message: 'Диалоги не найдены'
                });
            } else {
                // console.log(authorId);
                res.json(dialogs)
            }
        })
        // DialogModel.find({ author: authorId}, (err: any, dialogs: any) => {
        //     if (err) {
        //         return res.status(404).json({
        //             message: 'Диалоги не найдены'
        //         });
        //     } else {
        //         res.json(dialogs)
        //     }
        // })
    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            author: req.body.author,
            partner: req.body.partner
        };
        const dialog = new DialogModel(postData);
        dialog.save().then((dialogObj: any) => {
            // res.json(obj);

            const message = new MessageModel({
                text: req.body.text,
                dialog: dialogObj._id,
                user: req.body.author
            });

            message.save().then(() => {
                res.json(dialogObj);
            }).catch(reason => {
                res.json(reason);
            })
        }).catch(reason => {
            res.json(reason);
        })
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        DialogModel.findByIdAndDelete(id, (err: any, user: any) => {
            if (err) {
                return (
                    res.status(404).json({
                        message: 'Диалог не найден'
                    })
                )
            } else {
                res.json({
                    message: 'Диалог был успешно удален'
                });
            }
        })
    }
}