
//para o modo escuro
document.getElementById('toggle-dark-mode').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

//mascarar para cpf
function mascararCPF(input) {
  let value = input.value.replace(/\D/g, '').slice(0, 11);
  value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (_, p1, p2, p3, p4) => {
    return `${p1}.${p2}.${p3}${p4 ? '-' + p4 : ''}`;
  });
  input.value = value;
}

function mostrarErro(elemento, mensagem) {
  elemento.textContent = mensagem;
  elemento.style.color = 'red';
}

//funçao para a validação do cpf + senha
function validarCPF() {
  const cpfInput = document.getElementById('cpf');
  const erro = document.getElementById('erro-cpf');
  const cpf = cpfInput.value.replace(/\D/g, '');

  if (cpf.length === 0) {
    mostrarErro(erro, 'Preencha o CPF.');
    return false;
  }

  if (!/^\d{11}$/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) {
    mostrarErro(erro, 'CPF inválido.');
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) {
    mostrarErro(erro, 'CPF inválido.');
    return false;
  }

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[10])) {
    mostrarErro(erro, 'CPF inválido.');
    return false;
  }

  erro.textContent = '';
  return true;
}

function validarSenha() {
  const senha = document.getElementById('senha').value;
  const erroSenha = document.getElementById('erro-senha');
  erroSenha.textContent = '';

  if (senha.length < 6) {
    erroSenha.textContent = 'A senha deve ter no mínimo 6 caracteres.';
    erroSenha.style.color = 'red';
    return false;
  }
  return true;
}

