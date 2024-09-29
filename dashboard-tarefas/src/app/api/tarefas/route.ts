// app/api/tarefas/route.ts
import { NextResponse } from 'next/server';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// Definir a interface para os dados do banco
interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'completa';
  createdAt: string; // Nova propriedade para armazenar a data de criação
}

interface DatabaseData {
  tarefas: Tarefa[];
}

// Configuração do LowDB
const adapter = new JSONFile<DatabaseData>('db.json'); // O arquivo onde as tarefas serão armazenadas
const db = new Low<DatabaseData>(adapter, { tarefas: [] }); // Estrutura de dados inicial

// Inicializa o banco de dados
async function initDB() {
  await db.read();
  db.data ||= { tarefas: [] }; // Inicializa a lista de tarefas se não existir
  await db.write();
}

// Carregar tarefas
async function loadTarefas() {
  await initDB();
  return db.data!.tarefas; // O uso de "!" garante que o TypeScript entenda que `db.data` não é mais `unknown`
}

// Salvar tarefas
async function saveTarefas() {
  await db.write();
}

// GET: Listar todas as tarefas
export async function GET() {
  const tarefas = await loadTarefas();
  return NextResponse.json({ tarefas });
}

// POST: Criar uma nova tarefa
export async function POST(req: Request) {
  await initDB();
  const body = await req.json();
  const { titulo, descricao } = body;

  if (!titulo || !descricao) {
    return NextResponse.json({ message: 'Título e descrição são obrigatórios!' }, { status: 400 });
  }

  const novaTarefa: Tarefa = {
    id: Date.now(), // Use um timestamp como ID
    titulo,
    descricao,
    status: 'pendente',
    createdAt: new Date().toISOString(), // Definindo a data de criação
  };

  db.data!.tarefas.push(novaTarefa); // Adiciona a nova tarefa
  await saveTarefas(); // Salva as alterações
  return NextResponse.json(novaTarefa, { status: 201 });
}

// PUT: Atualizar uma tarefa pelo ID
export async function PUT(req: Request) {
  await initDB();
  const body = await req.json();
  const { id, titulo, descricao, status } = body;

  const tarefa = db.data!.tarefas.find((tarefa) => tarefa.id === id);

  if (!tarefa) {
    return NextResponse.json({ message: 'Tarefa não encontrada!' }, { status: 404 });
  }

  tarefa.titulo = titulo || tarefa.titulo;
  tarefa.descricao = descricao || tarefa.descricao;
  tarefa.status = status || tarefa.status;

  await saveTarefas(); // Salva as alterações
  return NextResponse.json(tarefa);
}

// DELETE: Remover uma tarefa pelo ID
export async function DELETE(req: Request) {
  await initDB();
  const body = await req.json();
  const { id } = body;

  const index = db.data!.tarefas.findIndex((tarefa) => tarefa.id === id);

  if (index === -1) {
    return NextResponse.json({ message: 'Tarefa não encontrada!' }, { status: 404 });
  }

  db.data!.tarefas.splice(index, 1); // Remove a tarefa
  await saveTarefas(); // Salva as alterações
  return NextResponse.json({ message: 'Tarefa removida com sucesso!' });
}
