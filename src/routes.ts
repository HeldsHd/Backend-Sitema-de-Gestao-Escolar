import { Router } from "express";

// Inicializa o router
const routes = Router();

// Rota inicial para verificar se o servidor está rodando
routes.get("/", (request, response) => {
  return response.status(200).json({ message: "Hello World!" });
});

routes.get("/number", (request, response) => {
  const randomNumber = Math.floor(Math.random() * 100);
  return response.status(200).json(randomNumber);
});

routes.get("/fibonacci/:quantidade", (request, response) => {
  // Converte o parâmetro da URL de texto para número.
  const quantidade = Number(request.params.quantidade);

  // A quantidade deve ser um inteiro entre 1 e 78.
  if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 150) {
    return response.status(400).json({
      message: "Informe uma quantidade inteira entre 1 e 150.",
    });
  }

  // Os dois primeiros termos da sequência de Fibonacci.
  const sequencia: number[] = [0, 1];

  // Cada termo é a soma dos dois termos anteriores.
  while (sequencia.length < quantidade) {
    const proximoTermo =
      sequencia[sequencia.length - 1] + sequencia[sequencia.length - 2];

    sequencia.push(proximoTermo);
  }

  // Retorna somente a quantidade de termos solicitada.
  return response.status(200).json(sequencia);
});


routes.get("/fatorial/:numero", (req, res) => {
    const numero = Number(req.params.numero);
    if (!Number.isInteger(numero) || numero < 0) {
        return res.status(400).json({
            message: "Informe um número inteiro positivo."
        });
    }
    let fatorial = 1;
    for (let i = 1; i <= numero; i++) {
        fatorial *= i;
    }
    return res.status(200).json(fatorial);
})

export default routes;
