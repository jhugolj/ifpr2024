let vote = '';
const candidates = {
  '12': { name: 'Candidato A', photo: 'fotoA.jpg', party: 'Partido A' },
  '34': { name: 'Candidato Honesto', photo: 'fotoB.jpg', party: 'Partido B' },
  '56': { name: 'Candidato C', photo: 'fotoC.jpg', party: 'Partido C' }
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
    document.getElementById('candidatePhoto').src = 'default.jpg';
    document.getElementById('candidateName').textContent = 'Candidato não encontrado';
    document.getElementById('candidateParty').textContent = '';
  }
}

function blankVote() {
  vote = 'Branco';
  document.getElementById('enteredNumber').textContent = vote;
  document.getElementById('candidatePhoto').src = 'default.jpg';
  document.getElementById('candidateName').textContent = 'Voto em Branco';
  document.getElementById('candidateParty').textContent = '';
}

function clearVote() {
  vote = '';
  document.getElementById('enteredNumber').textContent = '';
  document.getElementById('candidatePhoto').src = 'default.jpg';
  document.getElementById('candidateName').textContent = 'Aqui aparecerá a foto do candidato';
  document.getElementById('candidateParty').textContent = '';
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

    const url = 'https://script.google.com/macros/s/AKfycbyEs9lDIBsTTfUPXks29Ou8zeADLwyYJFF36rO1_Cm3OAkCGCkZsL_8vRQ7-CWIQViT/exec';

    const data = {
      name: name,
      email: email,
      category: category,
      vote: vote,
      candidateName: candidateName,
      candidateParty: candidateParty
    };

    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(data).toString()
    })
    .then(response => {
      alert('Voto confirmado: ' + vote);
      clearVote();
    })
    .catch(error => {
      console.error('Erro ao enviar voto:', error);
    });
  }
}
