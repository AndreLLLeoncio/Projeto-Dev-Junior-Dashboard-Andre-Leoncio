"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'completa';
  createdAt: string;
}

interface ChartData {
  month: string;
  complete: number;
  pending: number;
}

const chartConfig = {
  complete: {
    label: "Completa",
    color: "hsl(var(--chart-1))",
  },
  pending: {
    label: "Pendente",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Chart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchTarefas = async () => {
      const response = await fetch('/api/tarefas');
      const data = await response.json();
      const tarefas: Tarefa[] = data.tarefas;

      // Mapeie os últimos 5 meses
      const lastSixMonths = Array.from({ length: 5 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        return date.toLocaleString('default', { month: 'long' });
      }).reverse();

      const tasksCount = lastSixMonths.reduce((acc, month) => {
        acc[month] = { complete: 0, pending: 0 };
        return acc;
      }, {} as Record<string, { complete: number; pending: number }>);

      // Conta as tarefas por mês
      tarefas.forEach((tarefa) => {
        const taskDate = new Date(tarefa.createdAt);
        const monthYear = taskDate.toLocaleString('default', { month: 'long' });

        if (lastSixMonths.includes(monthYear)) {
          if (tarefa.status === 'completa') {
            tasksCount[monthYear].complete++;
          } else {
            tasksCount[monthYear].pending++;
          }
        }
      });


      const chartDataArray = lastSixMonths.map((month) => ({
        month,
        complete: tasksCount[month]?.complete || 0,
        pending: tasksCount[month]?.pending || 0,
      }));

      setChartData(chartDataArray);
    };

    fetchTarefas();
  }, []);

  return (
    <div className="w-full mt-5 flex items-center justify-center">
      <Card className="bg-zinc-600 border-none">
        <CardHeader>
          <CardTitle className="text-zinc-200">Tarefas</CardTitle>
          <CardDescription className="text-zinc-400">Total de Tarefas nos ultimos 5 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="complete" fill="#27272a" radius={4} />
              <Bar dataKey="pending" fill="#09090b" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
