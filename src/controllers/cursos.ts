import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { handleErros } from "../helpers/handleErros";

export default {
  list: async (request: Request, response: Response) => {
    try {
      const curso = await prisma.curso.findMany({
        include: {
          alunos: true,
        },
      });

      return response.status(200).json(curso);
    } catch (e) {
      return handleErros(e, response);
    }
  },

  getById: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const cursos = await prisma.curso.findUnique({
        where: {
          id: +id,
        },
        include: {
          alunos: true,
        },
      });

      return response.status(200).json(cursos);
    } catch (e) {
      return handleErros(e, response);
    }
  },

  create: async (request: Request, response: Response) => {
    try {
      const { cargaHoraria, nome, descricao } = request.body;

      if (!descricao || !cargaHoraria || !nome) {
        return response.status(400).json("Dados do curso incompletos.");
      }

      const curso = await prisma.curso.create({
        data: {
          cargaHoraria,
          nome,
          descricao,
        },
      });

      return response.status(201).json(curso);
    } catch (e) {
      return handleErros(e, response);
    }
  },

    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { cargaHoraria, nome, descricao  } = request.body;

            const curso = await prisma.curso.update({
                where: {
                    id: +id,
                },
                data: {
                    cargaHoraria,
                    nome,
                    descricao
                }
            })

            return response.status(200).json(curso);
        } catch (e) {
            return handleErros(e, response);
        }
    },

        delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            const curso = await prisma.curso.delete({
                where: {
                    id: +id,
                }
            })

            return response.status(200).json(curso)
        }catch(e){
                return handleErros(e, response);
        }
    }

};
