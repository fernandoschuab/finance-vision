import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./DoughnutChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const coresCategoria = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#C9CBCF",
  "#2ecc71",
];

function agruparPorCategoria(lista) {
  return lista.reduce((acumulador, item) => {
    const cat = item.categoria;
    const val = Number(item.valor);
    acumulador[cat] = (acumulador[cat] || 0) + val;
    return acumulador;
  }, {});
}

export default function DoughnutChart({ transacoes }) {
  const despesas = transacoes.filter((t) => t.tipo === "Saída");

  if (despesas.length === 0) {
    return (
      <div className="empty-state">
        <p>Sem despesas registradas para exibir o gráfico.</p>
      </div>
    );
  }

  const totais = agruparPorCategoria(despesas);
  const labels = Object.keys(totais);
  const dados = Object.values(totais);

  const data = {
    labels,
    datasets: [
      {
        data: dados,
        backgroundColor: coresCategoria.slice(0, labels.length),
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const porcentagem = ((value / total) * 100).toFixed(1);
            return `${label}: R$ ${value.toFixed(2)} (${porcentagem}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-wrapper">
      <Doughnut data={data} options={options} />
    </div>
  );
}

DoughnutChart.propTypes = {
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
