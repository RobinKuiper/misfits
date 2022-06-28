import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { TABLES } from "../../utils/constants";

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

      case 'DELETE':
      return remove(req, res);
      break;
  }
}

type Item = {
  id?: string;
  name: string;
  image: string;
  description: string; 
  type: string;
}

async function add(req: NextApiRequest, res: NextApiResponse) {
  const { type }: { type: string } = req.body;
  const ref = TABLES.find(table => table.id === type);

  if(!ref) return res.status(500)

  const db = ref.table;

  const newItem = await db.create({
    data: {
      name: 'dafdsfsgfg',
      description: '',
      image: ''
    },
  });

  return res.status(200).send(newItem);
}

// async function add(req: NextApiRequest, res: NextApiResponse) {
//   const { type, id, ...item }: Item = req.body;
//   const ref = TABLES.find(table => table.id === type);

//   if(!ref) return res.status(500)

//   const db = ref.table;

//   const newItem = await db.create({
//     data: {
//       ...item,
//     },
//   });

//   return res.status(200).send(newItem);
// }

async function update(req: NextApiRequest, res: NextApiResponse) {
  const { type, id, ...item }: Item = req.body;
  const ref = TABLES.find(table => table.id === type);

  if(!ref) return res.status(500)

  const db = ref.table;

  const newItem = await db.update({
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
  const { type, id, ...item }: Item = req.body;
  const ref = TABLES.find(table => table.id === type);

  if(!ref) return res.status(500)

  const db = ref.table;

  const newItem = await db.delete({
    where: {
      id: Number(id)
    },
  });

  return res.status(200).send(newItem);
}