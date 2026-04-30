const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

let LIVRO_ID;
let USUARIO_ID;

describe("Empréstimos", () => {
    beforeAll(async () => {
        const userRes = await axios.post(`${api}/usuarios`, {
            nome: "Usuario Teste Emprestimo",
            email: `emprestimo_${Date.now()}@email.com`,
            senha: "123",
            tipo: "aluno"
        });
        USUARIO_ID = userRes.data.id;

        const livroRes = await axios.post(`${api}/livros`, {
            titulo: "Livro Teste Emprestimo",
            autor: "Autor Teste",
            disponivel: true
        });
        LIVRO_ID = livroRes.data.id;
    });

    afterAll(async () => {
        await axios.delete(`${api}/livros/${LIVRO_ID}`);
        await axios.delete(`${api}/usuarios/${USUARIO_ID}`);
    });

    test("deve registrar um novo empréstimo", async () => {
        const res = await axios.post(`${api}/emprestimos`, {
            usuario_id: USUARIO_ID,
            livro_id: LIVRO_ID,
            data_devolucao_prevista: "2025-05-01",
        });
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");

        await axios.delete(`${api}/emprestimos/${res.data.id}`);
    });

    test("deve retornar uma lista de empréstimos", async () => {
        const res = await axios.get(`${api}/emprestimos`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("deve deletar um empréstimo", async () => {
        const emprestimo = await axios.post(`${api}/emprestimos`, { usuario_id: USUARIO_ID, livro_id: LIVRO_ID, data_devolucao_prevista: "2025-05-01", });
        const res = await axios.delete(`${api}/emprestimos/${emprestimo.data.id}`);
        expect(res.status).toBe(204);
    });

    test("deve retornar 404 ao deletar empréstimo inexistente", async () => {
        try {
            await axios.delete(`${api}/emprestimos/99999`);
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe("Esse emprestimo não existe!");
        }
    });

    test("deve retornar um empréstimo pelo id", async () => {
        const emprestimo = await axios.post(`${api}/emprestimos`, { usuario_id: USUARIO_ID, livro_id: LIVRO_ID, data_devolucao_prevista: "2025-05-01", });
        const res = await axios.get(`${api}/emprestimos/${emprestimo.data.id}`);
        expect(res.status).toBe(200);
        await axios.delete(`${api}/emprestimos/${res.data.id}`);
    });

    test("deve retornar 404 para empréstimo inexistente", async () => {
        try {
            await axios.get(`${api}/emprestimos/99999`);
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe("Esse emprestimo não existe!");
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem livro_id", async () => {
        try {
            await axios.post(`${api}/emprestimos`, {
                usuario_id: USUARIO_ID,
                data_devolucao_prevista: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data.message).toBe("Todos os campos são obrigatórios");
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem usuario_id", async () => {
        try {
            await axios.post(`${api}/emprestimos`, {
                livro_id: LIVRO_ID,
                data_devolucao_prevista: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data.message).toBe("Todos os campos são obrigatórios");
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem data de devolução", async () => {
        try {
            await axios.post(`${api}/emprestimos`, {
                livro_id: LIVRO_ID,
                usuario_id: USUARIO_ID,
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data.message).toBe("Todos os campos são obrigatórios");
        }
    });

    test("deve registrar a devolução de um empréstimo", async () => {
        const emprestimo = await axios.post(`${api}/emprestimos`, { usuario_id: USUARIO_ID, livro_id: LIVRO_ID, data_devolucao_prevista: "2025-05-01", });
        const res = await axios.put(`${api}/emprestimos/${emprestimo.data.id}`, { data_devolucao: "2025-05-01" });
        expect(res.status).toBe(200);
        await axios.delete(`${api}/emprestimos/${res.data.id}`);
    });

    test("deve retornar 404 ao devolver empréstimo inexistente", async () => {
        try {
            await axios.get(`${api}/emprestimos/99999`);
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe("Esse emprestimo não existe!");
        }
    });

    test("deve listar empréstimos de um usuário específico", async () => {
        const emprestimo = await axios.post(`${api}/emprestimos`, { usuario_id: USUARIO_ID, livro_id: LIVRO_ID, data_devolucao_prevista: "2025-05-01", });
        const res = await axios.get(`${api}/emprestimos/getByUser/${emprestimo.data.usuario_id}`)
        expect(res.status).toBe(200);
        await axios.delete(`${api}/emprestimos/${emprestimo.data.id}`);
    });

    test("deve retornar 400 ao emprestar livro já emprestado", async () => {
        expect.assertions(2);
        const emprestimo = await axios.post(`${api}/emprestimos`, { usuario_id: USUARIO_ID, livro_id: LIVRO_ID, data_devolucao_prevista: "2025-05-01", });

        try {
            await axios.post(`${api}/emprestimos`, { usuario_id: USUARIO_ID, livro_id: LIVRO_ID, data_devolucao_prevista: "2025-05-01", });
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.message).toBe("Esse livro não foi devolvido!");
        }

        await axios.delete(`${api}/emprestimos/${emprestimo.data.id}`);
    });
});