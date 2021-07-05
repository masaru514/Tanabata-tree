import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../utils/firebase';

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = req.body;
  console.log(form);
  await db.collection('stripList').add(form);
  res.send('success');
};

export default index;
