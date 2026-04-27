import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { IoArrowDown, IoArrowUp, IoWallet } from "react-icons/io5";
import PropTypes from "prop-types";
import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), streamTimeout + 1e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region app/root.jsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links
});
var links = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
	}
];
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(Outlet, {});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "pt-16 p-4 container mx-auto",
		children: [
			/* @__PURE__ */ jsx("h1", { children: message }),
			/* @__PURE__ */ jsx("p", { children: details }),
			stack
		]
	});
});
//#endregion
//#region app/components/TransactionForm.jsx
var initialState = {
	descricao: "",
	valor: "",
	tipo: "Entrada",
	categoria: ""
};
var categorias = [
	"Salário",
	"Aluguel",
	"Alimentação",
	"Lazer",
	"Transporte",
	"Saúde",
	"Educação",
	"Outros"
];
function TransactionForm({ onAdd }) {
	const [formData, setFormData] = useState(initialState);
	const [erro, setErro] = useState("");
	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
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
			categoria: formData.categoria
		});
		setFormData(initialState);
	}
	const isDisabled = !formData.descricao.trim() || !formData.valor || !formData.categoria;
	return /* @__PURE__ */ jsxs("form", {
		className: "transaction-form",
		onSubmit: handleSubmit,
		children: [
			/* @__PURE__ */ jsx("h2", {
				className: "form-title",
				children: "Nova Transação"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "form-row",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "form-group",
					children: [/* @__PURE__ */ jsx("label", {
						htmlFor: "descricao",
						children: "Descrição"
					}), /* @__PURE__ */ jsx("input", {
						id: "descricao",
						name: "descricao",
						type: "text",
						placeholder: "Ex: Conta de luz",
						value: formData.descricao,
						onChange: handleChange
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "form-group",
					children: [/* @__PURE__ */ jsx("label", {
						htmlFor: "valor",
						children: "Valor (R$)"
					}), /* @__PURE__ */ jsx("input", {
						id: "valor",
						name: "valor",
						type: "number",
						min: "0.01",
						step: "0.01",
						placeholder: "Ex: 150.00",
						value: formData.valor,
						onChange: handleChange
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "form-row",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "form-group",
					children: [/* @__PURE__ */ jsx("label", {
						htmlFor: "tipo",
						children: "Tipo"
					}), /* @__PURE__ */ jsxs("select", {
						id: "tipo",
						name: "tipo",
						value: formData.tipo,
						onChange: handleChange,
						children: [/* @__PURE__ */ jsx("option", {
							value: "Entrada",
							children: "Entrada"
						}), /* @__PURE__ */ jsx("option", {
							value: "Saída",
							children: "Saída"
						})]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "form-group",
					children: [/* @__PURE__ */ jsx("label", {
						htmlFor: "categoria",
						children: "Categoria"
					}), /* @__PURE__ */ jsxs("select", {
						id: "categoria",
						name: "categoria",
						value: formData.categoria,
						onChange: handleChange,
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Selecione..."
						}), categorias.map((cat) => /* @__PURE__ */ jsx("option", {
							value: cat,
							children: cat
						}, cat))]
					})]
				})]
			}),
			erro && /* @__PURE__ */ jsx("div", {
				className: "form-error",
				children: erro
			}),
			/* @__PURE__ */ jsx("button", {
				className: "btn-submit",
				type: "submit",
				disabled: isDisabled,
				children: "Adicionar Transação"
			})
		]
	});
}
TransactionForm.propTypes = { onAdd: PropTypes.func.isRequired };
//#endregion
//#region app/components/TransactionCard.jsx
function TransactionCard({ id, descricao, valor, tipo, categoria, data, onDelete }) {
	const isEntrada = tipo === "Entrada";
	const cor = isEntrada ? "var(--green)" : "var(--red)";
	const sinal = isEntrada ? "+" : "-";
	const dataFormatada = new Date(data).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	});
	function handleDelete() {
		onDelete(id);
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "transaction-card",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "transaction-header",
				children: [/* @__PURE__ */ jsx("span", {
					className: "transaction-category",
					children: categoria
				}), /* @__PURE__ */ jsx("span", {
					className: "transaction-date",
					children: dataFormatada
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "transaction-body",
				children: [/* @__PURE__ */ jsx("span", {
					className: "transaction-descricao",
					children: descricao
				}), /* @__PURE__ */ jsxs("span", {
					className: "transaction-valor",
					style: { color: cor },
					children: [
						sinal,
						" R$ ",
						valor.toFixed(2)
					]
				})]
			}),
			/* @__PURE__ */ jsx("button", {
				className: "btn-delete",
				onClick: handleDelete,
				children: "Remover"
			})
		]
	});
}
TransactionCard.propTypes = {
	id: PropTypes.string.isRequired,
	descricao: PropTypes.string.isRequired,
	valor: PropTypes.number.isRequired,
	tipo: PropTypes.oneOf(["Entrada", "Saída"]).isRequired,
	categoria: PropTypes.string.isRequired,
	data: PropTypes.string.isRequired,
	onDelete: PropTypes.func.isRequired
};
//#endregion
//#region app/components/DoughnutChart.jsx
Chart.register(ArcElement, Tooltip, Legend);
var coresCategoria = [
	"#FF6384",
	"#36A2EB",
	"#FFCE56",
	"#4BC0C0",
	"#9966FF",
	"#FF9F40",
	"#C9CBCF",
	"#2ecc71"
];
function agruparPorCategoria(lista) {
	return lista.reduce((acumulador, item) => {
		const cat = item.categoria;
		const val = Number(item.valor);
		acumulador[cat] = (acumulador[cat] || 0) + val;
		return acumulador;
	}, {});
}
function DoughnutChart({ transacoes }) {
	const despesas = transacoes.filter((t) => t.tipo === "Saída");
	if (despesas.length === 0) return /* @__PURE__ */ jsx("div", {
		className: "empty-state",
		children: /* @__PURE__ */ jsx("p", { children: "Sem despesas registradas para exibir o gráfico." })
	});
	const totais = agruparPorCategoria(despesas);
	const labels = Object.keys(totais);
	return /* @__PURE__ */ jsx("div", {
		className: "chart-wrapper",
		children: /* @__PURE__ */ jsx(Doughnut, {
			data: {
				labels,
				datasets: [{
					data: Object.values(totais),
					backgroundColor: coresCategoria.slice(0, labels.length),
					borderWidth: 2,
					borderColor: "#ffffff"
				}]
			},
			options: {
				responsive: true,
				plugins: {
					legend: { position: "bottom" },
					tooltip: { callbacks: { label: (context) => {
						const label = context.label || "";
						const value = context.parsed;
						const porcentagem = (value / context.dataset.data.reduce((a, b) => a + b, 0) * 100).toFixed(1);
						return `${label}: R$ ${value.toFixed(2)} (${porcentagem}%)`;
					} } }
				}
			}
		})
	});
}
DoughnutChart.propTypes = { transacoes: PropTypes.arrayOf(PropTypes.shape({
	id: PropTypes.string.isRequired,
	descricao: PropTypes.string.isRequired,
	valor: PropTypes.number.isRequired,
	tipo: PropTypes.oneOf(["Entrada", "Saída"]).isRequired,
	categoria: PropTypes.string.isRequired,
	data: PropTypes.string.isRequired
})).isRequired };
//#endregion
//#region app/components/BarChart.jsx
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
function BarChart({ transacoes }) {
	return /* @__PURE__ */ jsx("div", {
		className: "chart-wrapper-bar",
		children: /* @__PURE__ */ jsx(Bar, {
			data: {
				labels: ["Entradas", "Saídas"],
				datasets: [{
					label: "Fluxo de Caixa",
					data: [transacoes.filter((t) => t.tipo === "Entrada").reduce((acc, t) => acc + Number(t.valor), 0), transacoes.filter((t) => t.tipo === "Saída").reduce((acc, t) => acc + Number(t.valor), 0)],
					backgroundColor: ["#2ecc71", "#e74c3c"],
					borderRadius: 8,
					borderWidth: 0
				}]
			},
			options: {
				responsive: true,
				plugins: {
					legend: { display: false },
					tooltip: { callbacks: { label: (context) => `R$ ${context.parsed.y.toFixed(2)}` } }
				},
				scales: {
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: "Valor (R$)"
						}
					},
					x: { title: { display: false } }
				}
			}
		})
	});
}
BarChart.propTypes = { transacoes: PropTypes.arrayOf(PropTypes.shape({
	id: PropTypes.string.isRequired,
	descricao: PropTypes.string.isRequired,
	valor: PropTypes.number.isRequired,
	tipo: PropTypes.oneOf(["Entrada", "Saída"]).isRequired,
	categoria: PropTypes.string.isRequired,
	data: PropTypes.string.isRequired
})).isRequired };
//#endregion
//#region app/routes/home.jsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	meta: () => meta
});
function meta() {
	return [{ title: "FinanceVision" }, {
		name: "description",
		content: "Controle suas receitas e despesas com gráficos dinâmicos."
	}];
}
var home_default = UNSAFE_withComponentProps(function Home() {
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
	function gerarId() {
		return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
	}
	function handleAdd({ descricao, valor, tipo, categoria }) {
		const nova = {
			id: gerarId(),
			descricao,
			valor,
			tipo,
			categoria,
			data: (/* @__PURE__ */ new Date()).toISOString()
		};
		setTransacoes((prev) => [nova, ...prev]);
	}
	function handleDelete(id) {
		setTransacoes((prev) => prev.filter((t) => t.id !== id));
	}
	const totalEntradas = transacoes.filter((t) => t.tipo === "Entrada").reduce((acc, t) => acc + t.valor, 0);
	const totalSaidas = transacoes.filter((t) => t.tipo === "Saída").reduce((acc, t) => acc + t.valor, 0);
	const saldo = totalEntradas - totalSaidas;
	const transacoesFiltradas = filtro === "Todos" ? transacoes : transacoes.filter((t) => t.tipo === filtro);
	return /* @__PURE__ */ jsxs("div", {
		className: "app-container",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "app-header",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "app-title",
					children: "FinanceVision"
				}), /* @__PURE__ */ jsx("p", {
					className: "app-subtitle",
					children: "Controle suas finanças com clareza e visualização dinâmica."
				})]
			}),
			/* @__PURE__ */ jsxs("main", {
				className: "app-main",
				children: [
					/* @__PURE__ */ jsx("section", {
						className: "form-section",
						children: /* @__PURE__ */ jsx(TransactionForm, { onAdd: handleAdd })
					}),
					transacoes.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
						/* @__PURE__ */ jsxs("section", {
							className: "summary-section",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "section-title",
								children: "Resumo Financeiro"
							}), /* @__PURE__ */ jsxs("div", {
								className: "summary-grid",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "summary-card",
										children: [/* @__PURE__ */ jsx("div", {
											className: "summary-icon",
											style: { background: "#ebf4ff" },
											children: /* @__PURE__ */ jsx(IoWallet, {
												size: 22,
												color: "#3182ce"
											})
										}), /* @__PURE__ */ jsxs("div", {
											className: "summary-info",
											children: [/* @__PURE__ */ jsx("span", {
												className: "summary-label",
												children: "Saldo Total"
											}), /* @__PURE__ */ jsxs("span", {
												className: "summary-value",
												style: { color: saldo >= 0 ? "var(--green)" : "var(--red)" },
												children: ["R$ ", saldo.toFixed(2)]
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "summary-card",
										children: [/* @__PURE__ */ jsx("div", {
											className: "summary-icon",
											style: { background: "#f0fff4" },
											children: /* @__PURE__ */ jsx(IoArrowUp, {
												size: 22,
												color: "#38a169"
											})
										}), /* @__PURE__ */ jsxs("div", {
											className: "summary-info",
											children: [/* @__PURE__ */ jsx("span", {
												className: "summary-label",
												children: "Total Entradas"
											}), /* @__PURE__ */ jsxs("span", {
												className: "summary-value",
												style: { color: "var(--green)" },
												children: ["R$ ", totalEntradas.toFixed(2)]
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "summary-card",
										children: [/* @__PURE__ */ jsx("div", {
											className: "summary-icon",
											style: { background: "#fff5f5" },
											children: /* @__PURE__ */ jsx(IoArrowDown, {
												size: 22,
												color: "#c53030"
											})
										}), /* @__PURE__ */ jsxs("div", {
											className: "summary-info",
											children: [/* @__PURE__ */ jsx("span", {
												className: "summary-label",
												children: "Total Saídas"
											}), /* @__PURE__ */ jsxs("span", {
												className: "summary-value",
												style: { color: "var(--red)" },
												children: ["R$ ", totalSaidas.toFixed(2)]
											})]
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("section", {
							className: "chart-section",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "section-title",
								children: "Análise Visual"
							}), /* @__PURE__ */ jsxs("div", {
								className: "charts-grid",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "chart-box",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "chart-label",
										children: "Despesas por Categoria"
									}), /* @__PURE__ */ jsx(DoughnutChart, { transacoes })]
								}), /* @__PURE__ */ jsxs("div", {
									className: "chart-box",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "chart-label",
										children: "Entradas vs Saídas"
									}), /* @__PURE__ */ jsx(BarChart, { transacoes })]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("section", {
							className: "transactions-section",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "transactions-header",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "section-title",
									children: "Transações"
								}), /* @__PURE__ */ jsx("div", {
									className: "filter-group",
									children: [
										"Todos",
										"Entrada",
										"Saída"
									].map((tipo) => /* @__PURE__ */ jsx("button", {
										className: `filter-btn${filtro === tipo ? " active" : ""}`,
										onClick: () => setFiltro(tipo),
										children: tipo
									}, tipo))
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "transactions-list",
								children: transacoesFiltradas.map((t) => /* @__PURE__ */ jsx(TransactionCard, {
									id: t.id,
									descricao: t.descricao,
									valor: t.valor,
									tipo: t.tipo,
									categoria: t.categoria,
									data: t.data,
									onDelete: handleDelete
								}, t.id))
							})]
						})
					] }),
					transacoes.length === 0 && /* @__PURE__ */ jsx("div", {
						className: "empty-state",
						children: /* @__PURE__ */ jsx("p", { children: "Nenhuma transação ainda. Adicione sua primeira movimentação acima!" })
					})
				]
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "app-footer",
				children: /* @__PURE__ */ jsxs("p", { children: ["FinanceVision © ", (/* @__PURE__ */ new Date()).getFullYear()] })
			})
		]
	});
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-BJMcf1u-.js",
		"imports": ["/assets/jsx-runtime-BbSEct4w.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-6Qyuxdzf.js",
			"imports": ["/assets/jsx-runtime-BbSEct4w.js"],
			"css": ["/assets/root-DCpof5e2.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-ae5CUjxe.js",
			"imports": ["/assets/jsx-runtime-BbSEct4w.js"],
			"css": ["/assets/home-D6PUBEd1.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-8a48d731.js",
	"version": "8a48d731",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = {
	"unstable_optimizeDeps": false,
	"unstable_passThroughRequests": false,
	"unstable_subResourceIntegrity": false,
	"unstable_trailingSlashAwareDataRequests": false,
	"unstable_previewServerPrerendering": false,
	"v8_middleware": false,
	"v8_splitRouteModules": false,
	"v8_viteEnvironmentApi": false
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
