import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../utils/db';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = req.body;
  await db.collection('stripList').add(form);
  res.send('success');
};

export default index;
