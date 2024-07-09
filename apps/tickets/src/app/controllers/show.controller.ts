import { Request, Response, NextFunction } from 'express';
import { Show } from '../model/Show';
import { Ticket } from '../model/Ticket';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';

const getShows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shows = await Show.findAll();
    return res.status(200).json({
      shows,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getShow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const show = await Show.findByPk(req.params.id);
    console.log(show);

    return res.status(200).json({
      show,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// adding a Show
const addShow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { dateAndTIme, price, movieId, ticketAmount } = req.body;
    console.log('Request Body:', req.body); // לוג להדפסת הנתונים המתקבלים מהבקשה

    const id = uuidv4();
    const show = await Show.create({
      id,
      dateAndTIme,
      price,

      movieId,
      ticketAmount,
    });
    console.log('Created Show:', show); // לוג להדפסת המופע שנוצר

    const showId: any = id;
    await show.initTickets(ticketAmount, showId);
    return res.status(200).json({
      show,
    });
  } catch (error) {
    console.log('Error creating show:', error); // לוג להדפסת שגיאות ביצירת מופע
    throw error;
  }
};

const removeShow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let error = false;
    let message = '';
    const { id } = req.params;

    const show = await Show.destroy({
      where: {
        id: {
          [Op.like]: id,
        },
      },
    })
      .then(async function (deletedRecord) {
        if (deletedRecord === 1) {
          const ticketsRowDeleted = await Ticket.destroy({
            where: {
              showId: {
                [Op.like]: id,
              },
            },
          });
          if (ticketsRowDeleted > 0) {
            error = false;
            message = `show Deleted successfully and ${ticketsRowDeleted} tickets deleted`;
            res.status(200).json({ error, message });
          } else {
            error = true;
            message = 'tickets not deleted';
            return res.status(404).json({ error, message });
          }
        } else {
          error = true;
          message = 'show not found';
          return res.status(404).json({ error, message });
        }
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { getShows, getShow, addShow, removeShow };