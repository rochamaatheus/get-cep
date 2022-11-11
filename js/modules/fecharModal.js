export default function initFecharModal() {
  const btnFechar = document.querySelector('[data-fechar="modal"]');
  const container = document.querySelector('[data-modal="container"]');
  const table = document.querySelector('[data-tabela]');

  btnFechar.addEventListener('click', closeModal);
  container.addEventListener('click', clickOutside);

  function closeModal() {
    container.classList.remove('ativo');
    let tr = table.querySelectorAll('tr');
    tr.forEach((tr) => tr.remove());
  }

  function clickOutside(event) {
    if (event.target === this) {
      container.classList.remove('ativo');
      let tr = table.querySelectorAll('tr');
      tr.forEach((tr) => tr.remove());
    }
  }

  function isEscape(key) {
    if (key.key === 'Escape') {
      closeModal();
    }
  }
  function handleMutation(mutation) {
    if (mutation[0].target.classList.contains('ativo')) {
      document.body.addEventListener('keyup', isEscape);
    } else {
      document.body.removeEventListener('keyup', isEscape);
    }
  }
  const observer = new MutationObserver(handleMutation);
  observer.observe(container, { attributes: true });
}