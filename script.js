function formatCurrency(value) {
  value = value.toString();
  value = value.replace(/\D/g, "");
  value = (value / 100).toFixed(2) + "";
  value = value.replace(".", ",");
  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return value;
}

function formatInput(event) {
  const input = event.target;
  if (
    input.id !== "daysPassed" &&
    input.id !== "felizVitSales" &&
    input.id !== "felizVitGoal"
  ) {
    input.value = formatCurrency(input.value);
  }
}

function parseValue(value) {
  return parseFloat(value.replace(/\./g, "").replace(",", ".")) || 0;
}

function parseIntValue(value) {
  return parseInt(value) || 0;
}

function calculatePercentage(part, total) {
  return total > 0 ? ((part / total) * 100).toFixed(1) + "%" : "0%";
}

function calculateProjections() {
  const daysPassed = parseIntValue(document.getElementById("daysPassed").value);
  const totalSales = parseValue(document.getElementById("totalSales").value);
  const egpSales = parseValue(document.getElementById("egpSales").value);
  const perfumerySales = parseValue(
    document.getElementById("perfumerySales").value
  );
  const felizVitSales = parseIntValue(
    document.getElementById("felizVitSales").value
  );
  const winterSales = parseValue(document.getElementById("winterSales").value);
  const katiguaSales = parseValue(
    document.getElementById("katiguaSales").value
  );

  if (daysPassed > 0) {
    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();

    const totalProjection = ((totalSales / daysPassed) * daysInMonth).toFixed(
      2
    );
    const egpProjection = ((egpSales / daysPassed) * daysInMonth).toFixed(2);
    const perfumeryProjection = (
      (perfumerySales / daysPassed) *
      daysInMonth
    ).toFixed(2);
    const felizVitProjection = (felizVitSales / daysPassed) * daysInMonth ;
    const winterProjection = ((winterSales / daysPassed) * daysInMonth).toFixed(
      2
    );
    const katiguaProjection = (
      (katiguaSales / daysPassed) *
      daysInMonth
    ).toFixed(2);

    document.getElementById("totalProjection").value =
      formatCurrency(totalProjection);
    document.getElementById("egpProjection").value =
      formatCurrency(egpProjection);
    document.getElementById("perfumeryProjection").value =
      formatCurrency(perfumeryProjection);
    document.getElementById("felizVitProjection").value = parseInt(felizVitProjection);
    document.getElementById("winterProjection").value =
      formatCurrency(winterProjection);
    document.getElementById("katiguaProjection").value =
      formatCurrency(katiguaProjection);

    document.getElementById("egpPercentage").textContent = calculatePercentage(
      egpSales,
      totalSales
    );
    document.getElementById("perfumeryPercentage").textContent =
      calculatePercentage(perfumerySales, totalSales);
  } else {
    document.getElementById("totalProjection").value = "";
    document.getElementById("egpProjection").value = "";
    document.getElementById("perfumeryProjection").value = "";
    document.getElementById("felizVitProjection").value = "";
    document.getElementById("winterProjection").value = "";
    document.getElementById("katiguaProjection").value = "";
  }
}

function generateReport() {
  const totalSales = document.getElementById("totalSales").value;
  const egpSales = document.getElementById("egpSales").value;
  const perfumerySales = document.getElementById("perfumerySales").value;
  const felizVitSales = parseIntValue(
    document.getElementById("felizVitSales").value
  );
  const winterSales = document.getElementById("winterSales").value;
  const katiguaSales = document.getElementById("katiguaSales").value;

  const totalProjection = document.getElementById("totalProjection").value;
  const egpProjection = document.getElementById("egpProjection").value;
  const perfumeryProjection = document.getElementById(
    "perfumeryProjection"
  ).value;
  const felizVitProjection = parseIntValue(
    document.getElementById("felizVitProjection").value
  );
  const winterProjection = document.getElementById("winterProjection").value;
  const katiguaProjection = document.getElementById("katiguaProjection").value;

  const totalGoal = document.getElementById("totalGoal").value;
  const egpGoal = document.getElementById("egpGoal").value;
  const perfumeryGoal = document.getElementById("perfumeryGoal").value;
  const felizVitGoal = parseIntValue(
    document.getElementById("felizVitGoal").value
  );
  const winterGoal = document.getElementById("winterGoal").value;
  const katiguaGoal = document.getElementById("katiguaGoal").value;

  const totalStatus = totalProjection >= totalGoal ? "✔" : "✘";
  const egpStatus = egpProjection >= egpGoal ? "✔" : "✘";
  const perfumeryStatus = perfumeryProjection >= perfumeryGoal ? "✔" : "✘";
  const felizVitStatus = felizVitProjection >= felizVitGoal ? "✔" : "✘";
  const winterStatus = winterProjection >= winterGoal ? "✔" : "✘";
  const katiguaStatus = katiguaProjection >= katiguaGoal ? "✔" : "✘";

  const showStatus = document.getElementById("showStatus").checked;
  const newWindow = window.open();

  const date = new Date();

  const currentMinute = `${date.getMinutes()}`.padStart(2, 0);
  const currentHour = `${date.getHours()}`.padStart(2, 0);
  const currentDate = `${date.getDate()}`.padStart(2, 0);
  const currentMonth = `${date.getMonth() + 1}`.padStart(2, 0);
  const currentYear = date.getFullYear();

  const currentDateString = `${currentHour}h${currentMinute} - ${currentDate}_${currentMonth}_${currentYear}`;

  const config = getConfig();

  console.log(parseValue(totalProjection), parseValue(totalGoal), parseValue(totalProjection) >= parseValue(totalGoal))

  newWindow?.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <title>Relatorio de Vendas e Projeções - ${currentDateString}</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 1200px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; max-width: 1200px; }
            table, th, td { border: 1px solid #ddd; font-size: 13px; }
            th, td { padding: 8px; text-align: left; }
            th { background-color: #fff; color: #000; }
            .status-icon.correct { color: green; }
            .status-icon.incorrect { color: red; }
            .money { font-size: 10px; color: gray; display: inline-block; margin: 0; }
            .when { font-size: 10px; color: gray; font-weight: regular; margin-left: auto; }
            .perc { font-size: 10px; display: inline-block; margin: 0px; }
        </style>
    </head>
    <body>
        <text class="when">(${currentDateString.replaceAll('_', '/')})</text>
        <h3>Relatório de Vendas, Metas e Projeções</h3>
        <table>
            <thead>
                <tr>
                    <th>Categoria</th>
                    ${config.showSales ? '<th>Vendas</th>' : ''}
                    ${config.showProjections ? '<th>Projeção</th>' : ''}
                    ${config.showGoals ? '<th>Meta</th>' : ''}
                    ${showStatus ? "<th>Status</th>" : ""}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Total de Vendas</td>
                    ${config.showSales ? `<td><p class="money">R$</p> ${totalSales}</td>` : ''}
                    ${config.showProjections ? `<td><p class="money">R$</p> ${totalProjection}</td>` : ''}
                    ${config.showGoals ? `<td><p class="money">R$</p> ${totalGoal}</td>` : ''}
                    ${
                      showStatus
                        ? `
                      <td class="status-icon ${
                        parseValue(totalProjection) >= parseValue(totalGoal) ? "correct" : "incorrect"
                      }">${
                            parseValue(totalProjection) >= parseValue(totalGoal)
                              ? `<p class="money up">R$</p> +${formatCurrency(
                                  (
                                    Math.abs(parseValue(totalGoal) -
                                    parseValue(totalProjection))
                                  ).toFixed(2)
                                )}`
                              : `<p class="money">R$</p> -${formatCurrency(
                                  (
                                    parseValue(totalGoal) -
                                    parseValue(totalProjection)
                                  ).toFixed(2)
                                )}`
                          }</td>
                      `
                        : ""
                    }
                </tr>
                <tr>
                    <td>Total de EGP</td>
                    ${config.showSales ? `<td><p class="money">R$</p> ${egpSales} <p class="perc">(${calculatePercentage(
                      parseValue(egpSales),
                      parseValue(totalSales)
                    )})</p></td>` : ''}
                    ${config.showProjections ? `<td><p class="money">R$</p> ${egpProjection}</td>` : ''}
                    ${config.showGoals ? `<td><p class="money">R$</p> ${egpGoal}</td>` : ''}
                    ${
                      showStatus
                        ? `
                      <td class="status-icon ${
                        parseValue(egpProjection) >= parseValue(egpGoal) ? "correct" : "incorrect"
                      }">${
                            parseValue(egpProjection) >= parseValue(egpGoal)
                              ? `<p class="money up">R$</p> +${formatCurrency(
                                  (
                                    Math.abs(parseValue(egpGoal) -
                                    parseValue(egpProjection))
                                  ).toFixed(2)
                                )}`
                              : `<p class="money">R$</p> -${formatCurrency(
                                  (
                                    parseValue(egpGoal) -
                                    parseValue(egpProjection)
                                  ).toFixed(2)
                                )}`
                          }</td>
                      `
                        : ""
                    }
                </tr>
                <tr>
                    <td>Total de Perfumaria</td>
                    ${config.showSales ? `<td><p class="money">R$</p> ${perfumerySales} <p class="perc">(${calculatePercentage(
                      parseValue(perfumerySales),
                      parseValue(totalSales)
                    )})</p></td>` : ''}
                    ${config.showProjections ? `<td><p class="money">R$</p> ${perfumeryProjection}</td>` : ''}
                    ${config.showGoals ? `<td><p class="money">R$</p> ${perfumeryGoal}</td>` : ''}
                    ${
                      showStatus
                        ? `
                      <td class="status-icon ${
                        parseValue(perfumeryProjection) >= parseValue(perfumeryGoal)
                          ? "correct"
                          : "incorrect"
                      }">${
                            parseValue(perfumeryProjection) >= parseValue(perfumeryGoal)
                              ? `<p class="money up">R$</p> +${formatCurrency(
                                  (
                                    Math.abs(parseValue(perfumeryGoal) -
                                    parseValue(perfumeryProjection))
                                  ).toFixed(2)
                                )}`
                              : `<p class="money">R$</p> -${formatCurrency(
                                  (
                                    parseValue(perfumeryGoal) -
                                    parseValue(perfumeryProjection)
                                  ).toFixed(2)
                                )}`
                          }</td>
                      `
                        : ""
                    }
                </tr>
                <tr>
                    <td>Unidades de Feliz Vit</td>
                    ${config.showSales ? `<td>${felizVitSales}</td>` : ''}
                    ${config.showProjections ? `<td>${felizVitProjection}</td>` : ''}
                    ${config.showGoals ? `<td>${felizVitGoal}</td>` : ''}
                    ${
                      showStatus
                        ? `

                      <td class="status-icon ${
                        felizVitProjection >= felizVitGoal
                          ? "correct"
                          : "incorrect"
                      }">${
                            felizVitProjection >= felizVitGoal
                              ? ` +${Math.abs(felizVitGoal - felizVitProjection)}`
                              : ` -${felizVitGoal - felizVitProjection}`
                          }</td>
                        `
                        : ""
                    }
                </tr>
                <tr>
                    <td>Total de Inverno</td>
                    ${config.showSales ? `<td><p class="money">R$</p> ${winterSales}</td>` : ''}
                    ${config.showProjections ? `<td><p class="money">R$</p> ${winterProjection}</td>` : ''}
                    ${config.showGoals ? `<td><p class="money">R$</p> ${winterGoal}</td>` : ''}
                    ${
                      showStatus
                        ? `
                      <td class="status-icon ${
                        parseValue(winterProjection) >= parseValue(winterGoal) ? "correct" : "incorrect"
                      }">${
                            parseValue(winterProjection) >= parseValue(winterGoal)
                              ? `<p class="money up">R$</p> +${formatCurrency(
                                  (
                                    Math.abs(parseValue(winterGoal) -
                                    parseValue(winterProjection))
                                  ).toFixed(2)
                                )}`
                              : `<p class="money">R$</p> -${formatCurrency(
                                  (
                                    parseValue(winterGoal) -
                                    parseValue(winterProjection)
                                  ).toFixed(2)
                                )}`
                          }</td>
                        </tr>
                        `
                        : ""
                    }
                <tr>
                    <td>Total de Katiguá</td>
                    ${config.showSales ? `<td><p class="money">R$</p> ${katiguaSales}</td>` : ''}
                    ${config.showProjections ? `<td><p class="money">R$</p> ${katiguaProjection}</td>` : ''}
                    ${config.showGoals ? `<td><p class="money">R$</p> ${katiguaGoal}</td>` : ''}
                    ${
                      showStatus
                        ? `
                      <td class="status-icon ${
                        parseValue(katiguaProjection) >= parseValue(katiguaGoal)
                          ? "correct"
                          : "incorrect"
                      }">${
                            parseValue(katiguaProjection) >= parseValue(katiguaGoal)
                              ? `<p class="money up">R$</p> +${formatCurrency(
                                  (
                                    Math.abs(parseValue(katiguaGoal) -
                                    parseValue(katiguaProjection))
                                  ).toFixed(2)
                                )}`
                              : `<p class="money">R$</p> -${formatCurrency(
                                  (
                                    parseValue(katiguaGoal) -
                                    parseValue(katiguaProjection)
                                  ).toFixed(2)
                                )}`
                          }</td>
                      `
                        : ""
                    }
                </tr>
            </tbody>
        </table>
    </body>
    </html>
  `);

  document.getElementById("autoPrint").checked && newWindow?.print();
  newWindow?.document.close();
}

function saveGoals() {
  const goals = {
    totalGoal: document.getElementById("totalGoal").value,
    egpGoal: document.getElementById("egpGoal").value,
    perfumeryGoal: document.getElementById("perfumeryGoal").value,
    felizVitGoal: document.getElementById("felizVitGoal").value,
    winterGoal: document.getElementById("winterGoal").value,
    katiguaGoal: document.getElementById("katiguaGoal").value,
  };

  const config = {
    showStatus: document.getElementById("showStatus").checked,
    showGoals: document.getElementById("showGoals").checked,
    showSales: document.getElementById("showSales").checked,
    showProjections: document.getElementById("showProjections").checked,
    showCategories: document.getElementById("showCategories").checked,
    autoPrint: document.getElementById("autoPrint").checked,

  };

  localStorage.setItem("goals", JSON.stringify(goals));
  localStorage.setItem("config", JSON.stringify(config));
}

function loadGoals() {
  const goals = JSON.parse(localStorage.getItem("goals"));
  if (goals) {
    document.getElementById("totalGoal").value = goals.totalGoal;
    document.getElementById("egpGoal").value = goals.egpGoal;
    document.getElementById("perfumeryGoal").value = goals.perfumeryGoal;
    document.getElementById("felizVitGoal").value = goals.felizVitGoal;
    document.getElementById("winterGoal").value = goals.winterGoal;
    document.getElementById("katiguaGoal").value = goals.katiguaGoal;
  }

  loadConfig();
}

function loadConfig() {
  const config = JSON.parse(localStorage.getItem("config"));

  if (config) {
    document.getElementById("showStatus").checked = config.showStatus;
    document.getElementById("showSales").checked = config.showSales;
    document.getElementById("showGoals").checked = config.showGoals;
    document.getElementById("showCategories").checked = config.showCategories;
    document.getElementById("showProjections").checked = config.showProjections;
    document.getElementById("autoPrint").checked = config.autoPrint;
  }
}

function getConfig() {
  return {
    showStatus: document.getElementById("showStatus").checked,
    showSales: document.getElementById("showSales").checked,
    showGoals: document.getElementById("showGoals").checked,
    showCategories: document.getElementById("showCategories").checked,
    showProjections: document.getElementById("showProjections").checked,
    autoPrint: document.getElementById("autoPrint").checked,
  }
}

document
  .querySelectorAll(
    "#totalSales, #egpSales, #perfumerySales, #felizVitSales, #winterSales, #katiguaSales, #totalGoal, #egpGoal, #perfumeryGoal, #felizVitGoal, #winterGoal, #katiguaGoal, #daysPassed"
  )
  .forEach((input) => {
    input.addEventListener("input", function (event) {
      formatInput(event);
      calculateProjections();
    });
  });

document
  .querySelectorAll(
    "#totalSales, #egpSales, #perfumerySales, #winterSales, #katiguaSales, #totalGoal, #egpGoal, #perfumeryGoal, #winterGoal, #katiguaGoal"
  )
  .forEach((input) => {
    input.addEventListener("blur", formatInput);
  });

  document.querySelectorAll('#felizVitGoal, #felizVitSales').forEach(input => {
    input.addEventListener('input', function (event) {
      input.value = parseInt(input.value)
    })
  })

document
  .querySelectorAll(
    "#totalGoal, #egpGoal, #perfumeryGoal, #felizVitGoal, #winterGoal, #katiguaGoal, #showStatus, #showGoals, #showSales, #showProjections, #autoPrint, #showCategories"
  )
  .forEach((input) => {
    input.addEventListener("input", saveGoals);
  });

window.addEventListener("load", loadGoals);
window.addEventListener("load", () => {
  const currentDay = new Date().getDate();
  document.querySelector("#daysPassed").value = currentDay;
});
