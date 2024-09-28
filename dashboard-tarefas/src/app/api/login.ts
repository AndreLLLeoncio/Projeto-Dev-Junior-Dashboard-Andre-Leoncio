import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Aqui você pode adicionar a lógica para autenticar o usuário
    // Por exemplo, verifique os dados em um banco de dados

    if (email === "example@example.com" && password === "password") {
      // Simulação de sucesso
      return res.status(200).json({ message: 'Login bem-sucedido!' });
    } else {
      // Simulação de erro
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }
  } else {
    // Método não permitido
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}