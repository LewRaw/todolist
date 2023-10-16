const form = document.getElementById('cadastro-form');
const feedbackMessage = document.getElementById('feedback-message');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    const userData = {
        username: username,
        name: name,
        password: password
    };

    fetch(`/users/create/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            // Se a resposta da API estiver no intervalo de 200 a 299 (sucesso)
            return response.json();
        } else {
            // Se a resposta da API estiver fora do intervalo de sucesso, lançamos um erro
            throw new Error('Erro ao cadastrar usuário');
        }
    })
    .then(data => {
        // Limpar campos do formulário
        document.getElementById('username').value = '';
        document.getElementById('name').value = '';
        document.getElementById('password').value = '';
        
        // Exibir mensagem de sucesso
        feedbackMessage.textContent = 'Usuário cadastrado com sucesso';
        feedbackMessage.style.color = 'green';
    })
    .catch(error => {
        // Exibir mensagem de erro
        feedbackMessage.textContent = 'Erro ao cadastrar usuário';
        feedbackMessage.style.color = 'red';
        console.error(error);
    });
});
