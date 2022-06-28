import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session && req.method !== 'GET') res.status(401).send({ error: "Not authorized" });

  switch (req.method) {
    case 'POST':
      return add(req, res);
      break;
  }
}

type Item = {
  name: string;
  image: string;
  description: string;
  type: string;
}

const tables = [
  { id: 'character', table: prisma.character },
  { id: 'item', table: prisma.item },
  { id: 'npc', table: prisma.npc },
  { id: 'location', table: prisma.location }
]

async function add(req: NextApiRequest, res: NextApiResponse) {
  const { type, ...item }: Item = req.body;
  const ref = tables.find(table => table.id === type);

  if(!ref) return res.status(500)

  const db = ref.table;

  const newItem = await db.create({
    data: {
      ...item,
    },
  });

  return res.status(200).send(newItem);
}