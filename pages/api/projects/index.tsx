import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // find user
  console.log('req',req)
  console.log('res',res)
}