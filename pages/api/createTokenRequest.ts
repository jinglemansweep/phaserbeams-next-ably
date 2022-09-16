import Ably from "ably/promises";
import { Request, Response } from "express";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

import { IncomingMessage, ServerResponse } from "http";

export default async function handler(req: Request, res: Response) {
  const client = new Ably.Realtime(
    process.env.NEXT_PUBLIC_ABLY_API_KEY as string
  );

  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors],
    length: 2,
  });

  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: randomName,
  });

  res.status(200).json(tokenRequestData);
}
