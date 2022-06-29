import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { slugify } from "../../utils/urlHelpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session && req.method !== 'GET') res.status(401).send({ error: "Not authorized" });

  switch (req.method) {
    case 'GET':
      return getAll(req, res, session);
      break;

    case 'POST':
      return add(req, res);
      break;

    case 'PUT':
      return update(req, res);
      break;

    case 'DELETE':
      return remove(req, res);
      break;
  }
}

async function getAll(req: NextApiRequest, res: NextApiResponse, session: Session | null) {
  const categoryId = Number(req.query.categoryId);
  const query = req.query.query.toString();

  const where = session
    ? { categoryId, name: { contains: query } }
    : { categoryId, published: true, name: { contains: query } };

  const items = await prisma.piece.findMany({ where })

  return res.status(200).send(items);
}

type Item = {
  id?: string;
  name: string;
  image: string;
  description: string; 
}

async function add(req: NextApiRequest, res: NextApiResponse) {
  const { categoryId }: { categoryId: string } = req.body;

  const newItem = await prisma.piece.create({
    data: {
      name: new Date().toISOString(),
      slug: slugify(new Date().toISOString()),
      description: '',
      image: '',
      published: false,
      categoryId: Number(categoryId)
    },
  });

  return res.status(200).send(newItem);
}

async function update(req: NextApiRequest, res: NextApiResponse) {
  const { id, ...item }: Item = req.body;

  const newItem = await prisma.piece.update({
    where: {
      id: Number(id)
    },
    data: {
      ...item,
    },
  });

  return res.status(200).send(newItem);
}

async function remove(req: NextApiRequest, res: NextApiResponse) {
  const { id, ...item }: Item = req.body;

  const newItem = await prisma.piece.delete({
    where: {
      id: Number(id)
    },
  });

  return res.status(200).send(newItem);
}