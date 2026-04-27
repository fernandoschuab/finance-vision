import PropTypes from "prop-types";
import "./TransactionCard.css";

export default function TransactionCard({
  id,
  descricao,
  valor,
  tipo,
  categoria,
  data,
  onDelete,
}) {
  const isEntrada = tipo === "Entrada";
  const cor = isEntrada ? "var(--green)" : "var(--red)";
  const sinal = isEntrada ? "+" : "-";

  const dataFormatada = new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  function handleDelete() {
    onDelete(id);
  }

  return (
    <div className="transaction-card">
      <div className="transaction-header">
        <span className="transaction-category">{categoria}</span>
        <span className="transaction-date">{dataFormatada}</span>
      </div>
      <div className="transaction-body">
        <span className="transaction-descricao">{descricao}</span>
        <span className="transaction-valor" style={{ color: cor }}>
          {sinal} R$ {valor.toFixed(2)}
        </span>
      </div>
      <button className="btn-delete" onClick={handleDelete}>
        Remover
      </button>
    </div>
  );
}

TransactionCard.propTypes = {
  id: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  valor: PropTypes.number.isRequired,
  tipo: PropTypes.oneOf(["Entrada", "Saída"]).isRequired,
  categoria: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
