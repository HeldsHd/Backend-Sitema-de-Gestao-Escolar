import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { handleErros } from "../helpers/handleErros";


export default {
    list: async (request: Request, response: Response) => {
        try {
            const alunos = await prisma.aluno.findMany({
                include: {
                    cursos: true,
                },
            });

            return response.status(200).json(alunos);
        } catch (e) {
            return handleErros(e, response);
        }
    },

    getById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const aluno = await prisma.aluno.findUnique({
                where: {
                    id: +id,
                },
                include: {
                    cursos: true,
                }
            })

            return response.status(200).json(aluno);
        }catch(e){
            return handleErros(e, response);
        }
    },

    create: async (request: Request, response: Response) => {
        try {
            const { matricula, cpf, nome, nascimento, email, telefone, endereco } = request.body;

            if(!matricula || !cpf || !nome|| !email ){
                return response.status(400).json("Dados do alunos incompletos.");
            }

            const aluno = await prisma.aluno.create({
                data: {
                    matricula,
                    cpf,
                    nome,
                    nascimento: new Date(nascimento),
                    email,
                    telefone,
                    endereco,
                }
            })

            return response.status(201).json(aluno);

        }catch(e){
            return handleErros(e, response);
        }
    },

    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { matricula, cpf, nome, nascimento, email, telefone, endereco } = request.body;

            const aluno = await prisma.aluno.update({
                where: {
                    id: +id,
                },
                data: {
                    matricula,
                    cpf,
                    nome,
                    nascimento: nascimento ? new Date(nascimento) : null,
                    email,
                    telefone,
                    endereco,
                }
            })

            return response.status(200).json(aluno);
        } catch (e) {
            return handleErros(e, response);
        }
    }
};
