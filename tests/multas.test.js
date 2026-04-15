const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

const EMPRESTIMO_ID = 444;

describe("Multas", () => {
    test("deve registrar uma nova multa", async () => {
        const res = await axios.post(`${api}/multas`, {
            emprestimo_id: EMPRESTIMO_ID,
            quitado: false,
            tipo: "danificado",
            obs: "mordeu o livro",
            valor: 12,
        });
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");
        expect(res.data).toHaveProperty("quitado");
        expect(res.data).toHaveProperty("tipo");
        expect(res.data).toHaveProperty("obs");
        expect(res.data).toHaveProperty("valor");
        await axios.delete(`${api}/multas/${res.data.id}`);
    });
    
    test("deve retornar uma lista de multas", async () => {
        const res = await axios.get(`${api}/multas`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("deve deletar uma multa", async () => {
        const multa = await axios.post(`${api}/multas`, { 
            emprestimo_id: EMPRESTIMO_ID,
            quitado: false,
            tipo: "danificado",
            obs: "mordeu o livro",
            valor: 12,
         });
        const res = await axios.delete(`${api}/multas/${multa.data.id}`);
        expect(res.status).toBe(204);
    });

    test("deve retornar 404 ao deletar multa inexistente", async () => {
        try {
            await axios.delete(`${api}/multas/9999`);
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe("Essa multa não existe!");
        }   
    });

    test("deve retornar uma multa pelo id", async () => {
        const multa = await axios.post(`${api}/multas`, { 
            emprestimo_id: EMPRESTIMO_ID,
            quitado: false,
            tipo: "danificado",
            obs: "mordeu o livro",
            valor: 12,
         });
        const res = await axios.get(`${api}/multas/${multa.data.id}`);
        expect(res.status).toBe(200);
        await axios.delete(`${api}/multas/${res.data.id}`);
    });
    
    test("deve retornar 404 para multa inexistente", async () => {
        try {
            await axios.get(`${api}/multas/9999`);
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe("Essa multa não existe!");
        } 
    });

    test("deve retornar 400 ao registrar multa sem emprestimo_id", async () => {
        try {
            await axios.post(`${api}/multas`, {
                quitado: false,
                tipo: "danificado",
                obs: "mordeu o livro",
                valor: 12,
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data.message).toBe("Todos os campos são obrigatórios");
        }
    });

    test("deve quitar uma multa e retornar 200", async () => {
        const multa = await axios.post(`${api}/multas`, { 
            emprestimo_id: EMPRESTIMO_ID,
            tipo: "danificado",
            obs: "mordeu o livro",
            valor: 12,
        });
        const res = await axios.put(`${api}/multas/quitar/${multa.data.id}`);
        expect(res.status).toBe(201);
        await axios.delete(`${api}/multas/${res.data.id}`);
    });

    test("deve retornar 201 ao atualizar uma multa", async () => {
        const multa = await axios.post(`${api}/multas`, { 
            emprestimo_id: EMPRESTIMO_ID,
            tipo: "danificado",
            obs: "mordeu o livro",
            valor: 12,
        });
        const res = await axios.put(`${api}/multas/${multa.data.id}`, {
            tipo: "atraso",
        });
        expect(res.status).toBe(201);
        expect(res.data.tipo).toBe("atraso");
        await axios.delete(`${api}/multas/${res.data.id}`);
    });

    test("deve retornar 404 ao tentar quitar multa quitada", async () => {
        try {
            const multa = await axios.post(`${api}/multas`, { 
                emprestimo_id: EMPRESTIMO_ID,
                tipo: "danificado",
                obs: "mordeu o livro",
                valor: 12,
            });
            const res = await axios.put(`${api}/multas/quitar/${multa.data.id}`);
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe("Multa já foi quitada!");
        } 
    });

    test("deve listar multas de um emprestimo específico", async () => {
        const multa = await axios.post(`${api}/multas`, { 
            emprestimo_id: EMPRESTIMO_ID,
            quitado: false,
            tipo: "danificado",
            obs: "mordeu o livro",
            valor: 12,
         });
        const res = await axios.get(`${api}/multas/getByEmprestimo/${multa.data.emprestimo_id}`)
        expect(res.status).toBe(200);
        await axios.delete(`${api}/multas/${multa.data.id}`);
    });
});