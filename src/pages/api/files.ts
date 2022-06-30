import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { promises as fs} from 'fs'
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) res.status(401).send({ error: "Not authorized" });

  switch (req.method) {
    case 'GET':
      return getAll(req, res, session);
      break;
  }
}

async function getAll(req: NextApiRequest, res: NextApiResponse, session: Session | null) {
  let files: string[] = [];
    files = await fs.readdir(path.join(process.cwd(), `/public/uploads/`));

  return res.status(200).send(files);
}