export default function initBuscaCep() {
  const submitBtn = document.querySelector('.btn');
  const cleanBtn = document.querySelector('.btnLimpar');
  const cepInput = document.getElementById('cep');
  const table = document.querySelector('[data-tabela]');
  const container = document.querySelector('[data-modal="container"]');

  submitBtn.addEventListener('click', handleClick);
  function isEnter(key) {
    if (key.key.toUpperCase() === 'ENTER') {
      key.preventDefault();
      handleClick();
    }
  }
  cepInput.addEventListener('keypress', isEnter);
  cleanBtn.addEventListener('click', cleanInput);

  function handleClick(event) {
    if (cepInput.value.length === 0) {
      //temporario
      alert('[ERRO] Você precisa digitar um CEP válido!');
    } else {
      buscarCep(cepInput.value);
    }
  }

  function cleanInput() {
    cepInput.value = '';
    cepInput.focus();
  }

  function buscarCep(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((r) => r.json())
      .then((body) => {
        if (Object.prototype.hasOwnProperty.call(body, 'erro')) {
          alert('[ERRO] CEP não encontrado!');
          cepInput.value = '';
        } else {
          let entries = Object.entries(body).map((item) => {
            let itensFiltrados = item.filter((i) => i);
            let info;
            if (itensFiltrados.length === 2) {
              info = itensFiltrados;
            }
            return info;
          });
          let entriesFiltrados = entries.filter((i) => i);
          entriesFiltrados.forEach((item) => {
            let tr = document.createElement('tr');
            let th = document.createElement('th');
            let td = document.createElement('td');
            th.append(item[0]);
            td.append(item[1]);
            tr.appendChild(th);
            tr.appendChild(td);
            table.appendChild(tr);
            cepInput.value = '';
          });
          container.classList.add('ativo');
        }
      });
  }
}
