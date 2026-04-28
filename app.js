async function analisar() {
  const texto = document.getElementById("input").value.toLowerCase();
  const resultado = document.getElementById("resultado");

  if (!texto) {
    resultado.innerHTML = "⚠️ Digite uma mensagem para analisar";
    return;
  }

  let risco = "🟢 Seguro";
  let explicacao = "Nenhum sinal forte de golpe.";

  if (texto.includes("pix") && texto.includes("urgente")) {
    risco = "🚨 Alto risco";
    explicacao = "Mensagem usa urgência + Pix (golpe comum)";
  } else if (texto.includes("http")) {
    risco = "⚠️ Cuidado";
    explicacao = "Link detectado — pode ser phishing";
  }

  resultado.innerHTML = `
    <div>${risco}</div>
    <p>${explicacao}</p>
  `;

  // Notificação
  if (risco !== "🟢 Seguro" && Notification.permission === "granted") {
    new Notification("🚨 Possível golpe detectado");
  }
}

// pedir permissão
if ("Notification" in window) {
  Notification.requestPermission();
}
