import 'dotenv/config';
import got from 'got';

const TICKETS_SERVICE_URI = process.env.TICKETS_SERVICE_URI;

export interface Show {
  dateAndTIme: Date;
  price: number;
  ticketAmount: number;
}

export interface Ticket {
  id: string;
  showId: string;
  isTaken: boolean;
}

export interface Movie {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  year?: number;
  chronologicalOrder?: number;
  length?: number;
}

export default class TicketsService {
  static async createShow({
    ticketAmount,
    dateAndTIme,
    movieId,
    price,
  }: {
    ticketAmount: number;
    dateAndTIme: Date;
    price: number;
    movieId: string;
  }) {
    console.log('t', dateAndTIme, price, movieId, ticketAmount);
    const body: any = await got
      .post(`${TICKETS_SERVICE_URI}/show/`, {
        json: { dateAndTIme, price, movieId, ticketAmount },
      })
      .json();
    console.log(body);

    return body.show;
  }

  static async setTicket({ id, isTaken }: { id: string; isTaken: boolean }) {
    const body: any = await got
      .post(`${TICKETS_SERVICE_URI}/ticket/`, {
        json: { id, isTaken },
      })
      .json();
    console.log(body);

    return body.ticket;
  }

  static async getTicketsByShowId({
    showId,
  }: {
    showId: string;
  }): Promise<Ticket | null> {
    console.log('S', showId);

    const body: any = await got
      .get(`${TICKETS_SERVICE_URI}/ticket/showId/${showId}`)
      .json();
    if (!body) return null;
    // console.log(body.tickets);

    return <Ticket>body.tickets.rows;
  }

  static async getTicket({ id }: { id: string }): Promise<Ticket | null> {
    console.log('b', id);

    const body: any = await got
      .get(`${TICKETS_SERVICE_URI}/ticket/"${id}"`)
      .json();
    if (!body) return null;

    return <Ticket>body.ticket;
  }

  static async getShows(): Promise<Show[] | null> {
    const body: any = await got.get(`${TICKETS_SERVICE_URI}/show`).json();
    if (!body) return null;
    // console.log(body.shows);

    return body.shows;
  }

  static async getShow({ id }: { id: string }): Promise<Show | null> {
    const body: any = await got.get(`${TICKETS_SERVICE_URI}/show/${id}`).json();
    if (!body) return null;
    console.log(body.show);

    return body.show;
  }

  static async removeShow({ id }: { id: string }): Promise<string | null> {
    const body: any = await got
      .delete(`${TICKETS_SERVICE_URI}/show/${id}`)
      .json();
    if (!body) return null;
    console.log(body.message);

    return body.message;
  }

  static async getMovies(): Promise<Movie[] | null> {
    const body: any = await got.get(`${TICKETS_SERVICE_URI}/movie`).json();
    if (!body) return null;
    // console.log(body.movies);

    return body.movies.map((movie: any) => {
      return {
        id: movie.id,
        title: movie.title || '',
        desc: movie.desc || '',
        img: movie.img || '',
        year: movie.year ? parseInt(movie.year) : null,
        chronologicalOrder: movie.chronologicalOrder ? parseInt(movie.chronologicalOrder) : null,
        length: movie.length ? parseInt(movie.length) : null,
      };
    });
  }

  static async getMovie({ id }: { id: string }): Promise<Movie | null> {
    const body: any = await got
      .get(`${TICKETS_SERVICE_URI}/movie/${id}`)
      .json();
    if (!body) return null;
    console.log(body.movie);

    return {
      id: body.movie.id,
      title: body.movie.title || '',
      desc: body.movie.desc || '',
      img: body.movie.img || '',
      year: body.movie.year ? parseInt(body.movie.year) : null,
      chronologicalOrder: body.movie.chronologicalOrder ? parseInt(body.movie.chronologicalOrder) : null,
      length: body.movie.length ? parseInt(body.movie.length) : null,
    };
  }

  static async createMovie({
    title,
    desc,
    img,
    imgTitle,
    imgSm,
    trailer,
    year,
    chronologicalOrder,
    length,
  }: {
    title: string;
    desc: string;
    img: string;
    imgTitle: string;
    imgSm: string;
    trailer: string;
    year: string;
    chronologicalOrder: number;
    length: string;
  }) {
    console.log(
      't',
      title,
      desc,
      img,
      imgTitle,
      imgSm,
      trailer,
      year,
      chronologicalOrder,
      length,
    );
    const body: any = await got
      .post(`${TICKETS_SERVICE_URI}/movie/`, {
        json: {
          title,
          desc,
          img,
          imgTitle,
          imgSm,
          trailer,
          year,
          chronologicalOrder,
          length,
        },
      })
      .json();
    console.log(body);

    return body.movie;
  }
}