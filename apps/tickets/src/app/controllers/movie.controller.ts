import { Request, Response, NextFunction } from 'express';
import { Movie } from '../model/Movie';
import { v4 as uuidv4 } from 'uuid';

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await Movie.findAll();
    return res.status(200).json({ movies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    return res.status(200).json({ movie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = uuidv4();
    req.body.id = id;
    const movie = await Movie.create(req.body);
    return res.status(201).json({ movie });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const removeMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (movie) {
      await movie.destroy();
      return res.status(200).json({ message: 'Movie deleted.' });
    } else {
      return res.status(404).json({ message: 'Movie not exists' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (movie) {
      await movie.update(req.body);
      return res.status(200).json({ message: 'Movie Updated.' });
    } else {
      return res.status(404).json({ message: 'Movie not exists' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { getMovies, getMovie, addMovie, removeMovie, updateMovie };