// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;


//     if (email === "example@example.com" && password === "password") {
//       return res.status(200).json({ message: 'Login bem-sucedido!' });

//     } else {
//       return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
      
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Método ${req.method} não permitido`);
//   }
// }