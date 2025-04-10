document.addEventListener('DOMContentLoaded', () => {
  const cpfInput = document.getElementById('cpf');
  const btnEntrar = document.getElementById('btnEntrar');
  const btnCadastrar = document.getElementById('btnCadastrar');
  const btnInscricao = document.getElementById('btnInscricao'); 

  cpfInput.addEventListener('input', () => mascararCPF(cpfInput));

  btnCadastrar.addEventListener('click', function () {
    window.location.href = 'index.html'; 
  });

  btnEntrar.addEventListener('click', function (event) {
    event.preventDefault();
    const cpfValido = validarCPF();
    const senhaValida = validarSenha();
    if (cpfValido && senhaValida) {
      window.location.href = "index.html";
    }
  });

  btnInscricao.addEventListener('click', function (event) {
    event.preventDefault();
    const cpfValido = validarCPF();
    const senhaValida = validarSenha();
    if (cpfValido && senhaValida && termosCheckbox.checked) {
      alert("Inscrição realizada com sucesso!");
      localStorage.removeItem('dadosFormulario');
      window.location.href = "login.html";
    }
  });    

});

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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario');
  const trilhas = document.querySelectorAll('.trilha');
  const termosCheckbox = document.getElementById('termos');
 
  form.addEventListener('submit', () => {
    alert("Inscrição realizada com sucesso!");
    localStorage.removeItem('dadosFormulario');
  });
  
  // Recarrega os dados salvos
  const dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario'));
  if (dadosSalvos) {
    Object.keys(dadosSalvos).forEach(campo => {
      const input = form.elements[campo];
      if (input) {
        if (input.type === 'checkbox') {
          input.checked = dadosSalvos[campo];
        } else {
          input.value = dadosSalvos[campo];
        }
      }
    });

    // Restaurar trilha selecionada
    if (dadosSalvos.trilhaSelecionada) {
      trilhas.forEach(trilha => {
        trilha.classList.remove('selecionada');
        if (trilha.textContent === dadosSalvos.trilhaSelecionada) {
          trilha.classList.add('selecionada');
        }
      });
    }
  }

  // Salvar dados no localStorage ao digitar ou selecionar
  form.addEventListener('input', salvarDados);
  termosCheckbox.addEventListener('change', salvarDados);
  trilhas.forEach(trilha => {
    trilha.addEventListener('click', () => {
      trilhas.forEach(t => t.classList.remove('selecionada'));
      trilha.classList.add('selecionada');
      salvarDados();
    });
  });

  function salvarDados() {
    const dados = {};
    [...form.elements].forEach(el => {
      if (el.name && el.type !== 'file' && el.type !== 'submit') {
        dados[el.name] = el.type === 'checkbox' ? el.checked : el.value;
      }
    });

    // Trilha selecionada
    const trilhaSelecionada = document.querySelector('.trilha.selecionada');
    if (trilhaSelecionada) {
      dados.trilhaSelecionada = trilhaSelecionada.textContent;
    }

    localStorage.setItem('dadosFormulario', JSON.stringify(dados));
  }

  form.addEventListener('submit', () => localStorage.removeItem('dadosFormulario'));
  document.querySelector('.cancelar').addEventListener('click', () => {
    localStorage.removeItem('dadosFormulario');
      form.reset();
   
  });
  
})