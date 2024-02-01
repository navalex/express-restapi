import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


export const getExample = async (req: Request, res: Response) => {
    try {
        res.status(StatusCodes.OK).json({ message: 'Hello World' });
    } catch (e) {
        console.error(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}