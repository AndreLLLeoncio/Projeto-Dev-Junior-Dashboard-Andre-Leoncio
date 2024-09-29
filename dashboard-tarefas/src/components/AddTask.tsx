"use client"; 

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IoIosAdd } from "react-icons/io";

import { useState } from 'react';

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'completa';
  createdAt: string;
}

interface AddTaskProps {
  setTarefas: React.Dispatch<React.SetStateAction<Tarefa[]>>;
}

export default function AddTask({ setTarefas }: AddTaskProps) {
  const [titulo, setTitulo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  // Função para criar uma nova tarefa
  const criarTarefa = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, descricao }),
    });

    if (res.ok) {
      const novaTarefa: Tarefa = await res.json();
      setTarefas(prev => [...prev, novaTarefa]);
      setTitulo('');
      setDescricao('');
      setOpen(false);
    }
  };

  return (
    <div className="w-full flex">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-6/12 lg:ml-0 ml-auto lg:h-16 h-10 rounded-xl"><IoIosAdd className="text-white text-3xl"/> Adicionar Tarefa</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Tarefa</DialogTitle>
          </DialogHeader>
          <form onSubmit={criarTarefa} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="titulo" className="text-right">
                Título
              </Label>
              <Input
                id="titulo"
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="col-span-3 border-2 border-zinc-600 rounded-md"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descricao" className="text-right">
                Descrição
              </Label>
              <Textarea
                id="descricao"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="col-span-3 border-2 border-zinc-600 rounded-md"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Criar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
