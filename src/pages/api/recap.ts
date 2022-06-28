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

      case 'PUT':
      return update(req, res);
      break;
  }
}

type Recap = {
  title: string;
  text: string;
  id?: number;
}

async function add(req: NextApiRequest, res: NextApiResponse) {
  const recap: Recap = req.body;

  const newRecap = await prisma.recap.create({
    data: {
      ...recap,
    },
  });

  return res.status(200).send(newRecap);
}

async function update(req: NextApiRequest, res: NextApiResponse) {
  const { id, ...recap}: Recap = req.body;

  const newRecap = await prisma.recap.update({
    where: {
      id: Number(id)
    },
    data: {
      ...recap,
    },
  });

  return res.status(200).send(newRecap);
}