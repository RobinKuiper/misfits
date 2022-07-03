import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { slugify } from "../../utils/urlHelpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session && req.method !== 'GET') res.status(401).send({ error: "Not authorized" });

  switch (req.method) {
    case 'GET':
      // return getAll(req, res, session);
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

type Item = {
  id?: string;
  text: string;
}

async function add(req: NextApiRequest, res: NextApiResponse) {
  const { periodId, position }: { periodId: number, position: number } = req.body;

  const newItem = await prisma.event.create({
    data: {
      title: new Date().toISOString(),
      text: 'New Item',
      published: false,
      periodId,
      position
    },
  });

  return res.status(200).send(newItem);
}

async function update(req: NextApiRequest, res: NextApiResponse) {
  const { id, ...data }: Item = req.body;

  const newItem = await prisma.event.update({
    where: {
      id: Number(id)
    },
    data,
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