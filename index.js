// Função para buscar e preencher os campos automaticamente com base no CEP
document.getElementById('cep').addEventListener('blur', function () {
  const cep = this.value.replace(/\D/g, '');

  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          document.getElementById('endereco').value = data.logradouro || '';
          document.getElementById('bairro').value = data.bairro || '';
          document.getElementById('cidade').value = data.localidade || '';
          document.getElementById('estado').value = data.uf || '';
        } else {
          alert('CEP não encontrado!');
        }
      })
      .catch(() => {
        alert('Erro ao buscar o CEP!');
      });
  }
});

// Função para finalizar a compra e redirecionar para o pagamento
document.addEventListener('DOMContentLoaded', function () {
  const finalizarCompraBtn = document.getElementById('finalizar-compra');

  if (finalizarCompraBtn) {
    finalizarCompraBtn.addEventListener('click', function () {
      // Validação simples dos campos de endereço antes de continuar
      const nome = document.getElementById('nome').value;
      const cep = document.getElementById('cep').value;
      const endereco = document.getElementById('endereco').value;
      const numero = document.getElementById('numero').value;
      const bairro = document.getElementById('bairro').value;
      const cidade = document.getElementById('cidade').value;
      const estado = document.getElementById('estado').value;

      if (!nome || !cep || !endereco || !numero || !bairro || !cidade || !estado) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return; // Não faz o redirecionamento até os campos estarem preenchidos corretamente
      }

      // Rastreio de compra com Facebook Pixel (opcional)
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Purchase', {
          value: 99.99, // Substitua pelo valor real da compra
          currency: 'BRL'
        });
      }

      // Redirecionamento para o link de pagamento do Mercado Pago
      const linkPagamento = 'https://mpago.la/2SThdGD';
      window.location.href = linkPagamento;
    });
  }
});
