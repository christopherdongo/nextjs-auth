
import type { NextApiRequest, NextApiResponse } from 'next'
import type {NextRequest} from 'next/server'

type Data = {
  name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    console.log(req.query.number)
    res.status(200).json({ name: 'John Doe' })
  };
