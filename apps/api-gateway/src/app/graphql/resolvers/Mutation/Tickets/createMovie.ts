import TicketsService from '../../../../adapters/TicketsService';

interface Args {
  title: string;
  desc: string;
  img: string;
  imgTitle: string;
  imgSm: string;
  trailer: string;
  year: string;
  chronologicalOrder: number;
  length: string;
}

const createShowResolver = async (
  obj: any,
  {
    title,
    desc,
    img,
    imgTitle,
    imgSm,
    trailer,
    year,
    chronologicalOrder,
    length,
  }: Args,
) => {
  return await TicketsService.createMovie({
    title,
    desc,
    img,
    imgTitle,
    imgSm,
    trailer,
    year,
    chronologicalOrder,
    length,
  });
};

export default createShowResolver;
