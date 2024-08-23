let vote = '';
const candidates = {
    '12': { name: 'A mulher A', photo: 'fotoA.png', party: 'Partido A' },
    '34': { name: 'Candidato Honesto', photo: 'fotoB.jpg', party: 'Partido da Ética Democrática Nacional' },
    '56': { name: 'O Homem C', photo: 'fotoC.png', party: 'Partido C' },
    '78': { name: 'A Candidata Honesta', photo: 'fotoD.png', party: 'Partido da Soberania Democrática Nacional' }
};

function startVoting() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const category = document.getElementById('category').value;

    if (name && email && category) {
        document.getElementById('ballotBox').style.display = 'flex';
    } else {
        alert('Por favor, preencha todos os campos obrigatórios: Nome, Email e Categoria.');
    }
}

function enterNumber(num) {
    if (vote.length < 2) {
        vote += num;
        document.getElementById('enteredNumber').textContent = vote;
        if (vote.length === 2) {
            displayCandidateInfo(vote);
        }
    }
}

function displayCandidateInfo(vote) {
    const candidate = candidates[vote];
    if (candidate) {
        document.getElementById('candidatePhoto').src = candidate.photo;
        document.getElementById('candidateName').textContent = candidate.name;
        document.getElementById('candidateParty').textContent = candidate.party;
    } else {
        document.getElementById('candidatePhoto').src = 'default.png';
        document.getElementById('candidateName').textContent = 'Voto Nulo';
        document.getElementById('candidateParty').textContent = '';
    }
}

function blankVote() {
    vote = 'Branco';
    document.getElementById('enteredNumber').textContent = 'Voto em Branco';
    document.getElementById('candidatePhoto').src = 'default.png';
    document.getElementById('candidateName').textContent = '';
    document.getElementById('candidateParty').textContent = '';
}

function clearVote() {
    vote = '';
    document.getElementById('enteredNumber').textContent = '';
    document.getElementById('candidatePhoto').src = 'default.png';
    document.getElementById('candidateName').textContent = 'Aqui aparecerá a foto do candidato';
    document.getElementById('candidateParty').textContent = '';
}

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('category').selectedIndex = 0;
    document.getElementById('enteredNumber').textContent = '';
    document.getElementById('candidatePhoto').src = 'default.png';
    document.getElementById('candidateName').textContent = 'Aqui aparecerá a foto do candidato';
    document.getElementById('candidateParty').textContent = '';
    vote = '';
    document.getElementById('ballotBox').style.display = 'none';
}

function confirmVote() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const category = document.getElementById('category').value;

    if (vote === '') {
        alert('Por favor, insira o número do candidato ou selecione Voto em Branco.');
    } else {
        const candidate = candidates[vote] || { name: 'Branco', photo: '', party: '' };
        const candidateName = candidate.name;
        const candidateParty = candidate.party;

        // URL do Google Apps Script
        const url = 'https://script.google.com/macros/s/AKfycbyEs9lDIBsTTfUPXks29Ou8zeADLwyYJFF36rO1_Cm3OAkCGCkZsL_8vRQ7-CWIQViT/exec';

        // Dados que serão enviados
        const data = {
            name: name,
            email: email,
            category: category,
            vote: vote,
            candidateName: candidateName,
            candidateParty: candidateParty
        };

        // Enviando os dados para a planilha Google Sheets
        fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data).toString()
        })
        .then(response => {
            alert('Voto confirmado: ' + candidateName);
            // Limpar os campos do formulário e recarregar a página após a confirmação
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('category').value = '';
            vote = ''; // Limpar o voto
            document.getElementById('enteredNumber').textContent = '';
            document.getElementById('candidatePhoto').src = 'default.png';
            document.getElementById('candidateName').textContent = 'Aqui aparecerá a foto do candidato';
            document.getElementById('candidateParty').textContent = '';
            setTimeout(() => location.reload(), 1000); // Aguarda 1 segundo antes de recarregar
        })
        .catch(error => {
            console.error('Erro ao enviar voto:', error);
        });
    }
}
