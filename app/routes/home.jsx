import { useState, useEffect } from "react";
import { IoWallet, IoArrowUp, IoArrowDown } from "react-icons/io5";
import TransactionForm from "../components/TransactionForm";
import TransactionCard from "../components/TransactionCard";
import DoughnutChart from "../components/DoughnutChart";
import BarChart from "../components/BarChart";
import "./home.css";

export function meta() {
  return [
    { title: "FinanceVision" },
    { name: "description", content: "Controle suas receitas e despesas com gráficos dinâmicos." },
  ];
}

export default function Home() {
  const [transacoes, setTransacoes] = useState(() => {
    try {
      const saved = localStorage.getItem("finance-vision-transacoes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
    try {
      localStorage.setItem("finance-vision-transacoes", JSON.stringify(transacoes));
    } catch {
      console.warn("LocalStorage indisponível.");
    }
  }, [transacoes]);

  function handleAdd({ descricao, valor, tipo, categoria }) {
    const nova = {
      id: crypto.randomUUID(),
      descricao,
      valor,
      tipo,
      categoria,
      data: new Date().toISOString(),
    };
    setTransacoes((prev) => [nova, ...prev]);
  }

  function handleDelete(id) {
    setTransacoes((prev) => prev.filter((t) => t.id !== id));
  }

  const totalEntradas = transacoes
    .filter((t) => t.tipo === "Entrada")
    .reduce((acc, t) => acc + t.valor, 0);

  const totalSaidas = transacoes
    .filter((t) => t.tipo === "Saída")
    .reduce((acc, t) => acc + t.valor, 0);

  const saldo = totalEntradas - totalSaidas;

  const transacoesFiltradas =
    filtro === "Todos"
      ? transacoes
      : transacoes.filter((t) => t.tipo === filtro);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">FinanceVision</h1>
        <p className="app-subtitle">Controle suas finanças com clareza e visualização dinâmica.</p>
      </header>

      <main className="app-main">
        <section className="form-section">
          <TransactionForm onAdd={handleAdd} />
        </section>

        {transacoes.length > 0 && (
          <>
            <section className="summary-section">
              <h2 className="section-title">Resumo Financeiro</h2>
              <div className="summary-grid">
                <div className="summary-card">
                  <div className="summary-icon" style={{ background: "#ebf4ff" }}>
                    <IoWallet size={22} color="#3182ce" />
                  </div>
                  <div className="summary-info">
                    <span className="summary-label">Saldo Total</span>
                    <span
                      className="summary-value"
                      style={{ color: saldo >= 0 ? "var(--green)" : "var(--red)" }}
                    >
                      R$ {saldo.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-icon" style={{ background: "#f0fff4" }}>
                    <IoArrowUp size={22} color="#38a169" />
                  </div>
                  <div className="summary-info">
                    <span className="summary-label">Total Entradas</span>
                    <span className="summary-value" style={{ color: "var(--green)" }}>
                      R$ {totalEntradas.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-icon" style={{ background: "#fff5f5" }}>
                    <IoArrowDown size={22} color="#c53030" />
                  </div>
                  <div className="summary-info">
                    <span className="summary-label">Total Saídas</span>
                    <span className="summary-value" style={{ color: "var(--red)" }}>
                      R$ {totalSaidas.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="chart-section">
              <h2 className="section-title">Análise Visual</h2>
              <div className="charts-grid">
                <div className="chart-box">
                  <h3 className="chart-label">Despesas por Categoria</h3>
                  <DoughnutChart transacoes={transacoes} />
                </div>
                <div className="chart-box">
                  <h3 className="chart-label">Entradas vs Saídas</h3>
                  <BarChart transacoes={transacoes} />
                </div>
              </div>
            </section>

            <section className="transactions-section">
              <div className="transactions-header">
                <h2 className="section-title">Transações</h2>
                <div className="filter-group">
                  {["Todos", "Entrada", "Saída"].map((tipo) => (
                    <button
                      key={tipo}
                      className={`filter-btn${filtro === tipo ? " active" : ""}`}
                      onClick={() => setFiltro(tipo)}
                    >
                      {tipo}
                    </button>
                  ))}
                </div>
              </div>

              <div className="transactions-list">
                {transacoesFiltradas.map((t) => (
                  <TransactionCard
                    key={t.id}
                    id={t.id}
                    descricao={t.descricao}
                    valor={t.valor}
                    tipo={t.tipo}
                    categoria={t.categoria}
                    data={t.data}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {transacoes.length === 0 && (
          <div className="empty-state">
            <p>Nenhuma transação ainda. Adicione sua primeira movimentação acima!</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>FinanceVision &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
