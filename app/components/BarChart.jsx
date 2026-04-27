import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./BarChart.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({ transacoes }) {
  const totalEntradas = transacoes
    .filter((t) => t.tipo === "Entrada")
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const totalSaidas = transacoes
    .filter((t) => t.tipo === "Saída")
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const data = {
    labels: ["Entradas", "Saídas"],
    datasets: [
      {
        label: "Fluxo de Caixa",
        data: [totalEntradas, totalSaidas],
        backgroundColor: ["#2ecc71", "#e74c3c"],
        borderRadius: 8,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `R$ ${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Valor (R$)" },
      },
      x: {
        title: { display: false },
      },
    },
  };

  return (
    <div className="chart-wrapper-bar">
      <Bar data={data} options={options} />
    </div>
  );
}

BarChart.propTypes = {
  transacoes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      descricao: PropTypes.string.isRequired,
      valor: PropTypes.number.isRequired,
      tipo: PropTypes.oneOf(["Entrada", "Saída"]).isRequired,
      categoria: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    })
  ).isRequired,
};
