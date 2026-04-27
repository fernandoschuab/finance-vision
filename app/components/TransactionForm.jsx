import { useState } from "react";
import PropTypes from "prop-types";
import "./TransactionForm.css";

const initialState = {
  descricao: "",
  valor: "",
  tipo: "Entrada",
  categoria: "",
};

const categorias = [
  "Salário",
  "Aluguel",
  "Alimentação",
  "Lazer",
  "Transporte",
  "Saúde",
  "Educação",
  "Outros",
];

export default function TransactionForm({ onAdd }) {
  const [formData, setFormData] = useState(initialState);
  const [erro, setErro] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErro("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const val = parseFloat(formData.valor);

    if (!formData.descricao.trim()) {
      setErro("Informe uma descrição.");
      return;
    }

    if (!formData.valor || val <= 0) {
      setErro("Informe um valor positivo.");
      return;
    }

    if (!formData.categoria) {
      setErro("Selecione uma categoria.");
      return;
    }

    onAdd({
      descricao: formData.descricao.trim(),
      valor: val,
      tipo: formData.tipo,
      categoria: formData.categoria,
    });

    setFormData(initialState);
  }

  const isDisabled =
    !formData.descricao.trim() || !formData.valor || !formData.categoria;

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Nova Transação</h2>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <input
            id="descricao"
            name="descricao"
            type="text"
            placeholder="Ex: Conta de luz"
            value={formData.descricao}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="valor">Valor (R$)</label>
          <input
            id="valor"
            name="valor"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Ex: 150.00"
            value={formData.valor}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="tipo">Tipo</label>
          <select id="tipo" name="tipo" value={formData.tipo} onChange={handleChange}>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="">Selecione...</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {erro && <div className="form-error">{erro}</div>}

      <button className="btn-submit" type="submit" disabled={isDisabled}>
        Adicionar Transação
      </button>
    </form>
  );
}

TransactionForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
