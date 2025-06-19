let approval = 50;
let reputation = 50;
let term = 1;
let currentStep = 'start';

const story = document.getElementById('story');
const approvalSpan = document.getElementById('approval');
const choicesDiv = document.getElementById('choices');
const repSpan = document.getElementById('reputation');
const termSpan = document.getElementById('term');

function updateApproval(change) {
  approval = Math.max(0, Math.min(100, approval + change));
  approvalSpan.textContent = approval;
}

function updateReputation(change) {
  reputation = Math.max(0, Math.min(100, reputation + change));
  repSpan.textContent = reputation;
}

function addChoice(text, callback) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.onclick = callback;
  choicesDiv.appendChild(btn);
}

function randomEvent() {
  const events = ['pandemic', 'disaster', 'none'];
  const selected = events[Math.floor(Math.random() * events.length)];
  if (selected === 'pandemic') {
    story.textContent = "A new pandemic is spreading. What do you do?";
    choicesDiv.innerHTML = '';
    addChoice("Shut down the country", () => {
      updateApproval(-10);
      updateReputation(10);
      setScene('foreign_policy');
    });
    addChoice("Downplay it", () => {
      updateApproval(5);
      updateReputation(-15);
      setScene('foreign_policy');
    });
  } else if (selected === 'disaster') {
    story.textContent = "A major natural disaster hits a coastal city.";
    choicesDiv.innerHTML = '';
    addChoice("Send emergency aid", () => {
      updateApproval(10);
      updateReputation(5);
      setScene('foreign_policy');
    });
    addChoice("Ignore it", () => {
      updateApproval(-20);
      setScene('foreign_policy');
    });
  } else {
    setScene('foreign_policy');
  }
}

function setScene(step) {
  currentStep = step;
  choicesDiv.innerHTML = '';
  switch(step) {
    case 'start':
      story.textContent = "You are the newly elected President. What will you do first?";
      addChoice("Pass a major healthcare law", () => {
        updateApproval(10);
        setScene('healthcare');
      });
      addChoice("Resign immediately", () => {
        updateApproval(-50);
        setScene('resigned');
      });
      break;
    case 'healthcare':
      story.textContent = "Your healthcare law passes. The nation is divided. What now?";
      addChoice("Push climate change reforms", () => {
        updateApproval(5);
        setScene('climate');
      });
      addChoice("Launch military operation abroad", () => {
        updateApproval(-10);
        updateReputation(-10);
        setScene('military');
      });
      break;
    case 'climate':
    case 'military':
      randomEvent();
      break;
    case 'foreign_policy':
      story.textContent = "World leaders challenge your policies. How do you respond?";
      addChoice("Negotiate peace", () => {
        updateReputation(15);
        setScene('reelection');
      });
      addChoice("Threaten military action", () => {
        updateReputation(-10);
        updateApproval(5);
        setScene('reelection');
      });
      break;
    case 'reelection':
      story.textContent = "Your first term is ending. Time for reelection.";
      addChoice("Run for a second term", () => {
        if (approval >= 50 && reputation >= 50) {
          term++;
          termSpan.textContent = term;
          story.textContent = `You are reelected! Term ${term} begins.`;
          addChoice("Start second term", () => {
            setScene('start');
          });
        } else {
          setScene('gameover');
        }
      });
      addChoice("Retire", () => {
        story.textContent = "You step down with dignity.";
      });
      break;
    case 'resigned':
      story.textContent = "You resigned. The nation is confused. You fade from public memory.";
      break;
    case 'gameover':
      story.textContent = "You lost the election due to poor approval or reputation.";
      break;
  }
}

function saveGame() {
  localStorage.setItem('approval', approval);
  localStorage.setItem('reputation', reputation);
  localStorage.setItem('term', term);
  localStorage.setItem('step', currentStep);
  alert('Game saved!');
}

function loadGame() {
  const savedApproval = parseInt(localStorage.getItem('approval'));
  const savedReputation = parseInt(localStorage.getItem('reputation'));
  const savedTerm = parseInt(localStorage.getItem('term'));
  const savedStep = localStorage.getItem('step');
  if (!isNaN(savedApproval) && !isNaN(savedReputation) && !isNaN(savedTerm) && savedStep) {
    approval = savedApproval;
    reputation = savedReputation;
    term = savedTerm;
    approvalSpan.textContent = approval;
    repSpan.textContent = reputation;
    termSpan.textContent = term;
    setScene(savedStep);
  } else {
    alert('No saved game found.');
  }
}

setScene('start');


let cabinet = [
  { name: "Sec. of Defense", loyalty: 70 },
  { name: "Sec. of State", loyalty: 60 },
  { name: "Sec. of Treasury", loyalty: 65 }
];

function showCabinet() {
  story.textContent = "Here is your current cabinet and their loyalty levels:";
  choicesDiv.innerHTML = '';
  cabinet.forEach(member => {
    const p = document.createElement('p');
    p.textContent = `${member.name}: Loyalty ${member.loyalty}%`;
    choicesDiv.appendChild(p);
  });
  addChoice("Return to game", () => setScene(currentStep));
}

function unNatoVote() {
  story.textContent = "A UN vote is scheduled on military aid. What do you decide?";
  choicesDiv.innerHTML = '';
  addChoice("Vote YES", () => {
    updateReputation(10);
    updateApproval(-5);
    setScene('reelection');
  });
  addChoice("Vote NO", () => {
    updateReputation(-10);
    updateApproval(5);
    setScene('reelection');
  });
  addChoice("Abstain", () => {
    updateReputation(-5);
    setScene('reelection');
  });
}

function economicPolicy() {
  story.textContent = "Adjust your economic policy:";
  choicesDiv.innerHTML = '';
  addChoice("Raise taxes on wealthy", () => {
    updateApproval(-5);
    updateReputation(10);
    setScene('foreign_policy');
  });
  addChoice("Lower corporate taxes", () => {
    updateApproval(5);
    updateReputation(-10);
    setScene('foreign_policy');
  });
  addChoice("Stimulus for middle class", () => {
    updateApproval(10);
    updateReputation(5);
    setScene('foreign_policy');
  });
}


let mediaPressure = 0;
let scandalLevel = 0;
let warReadiness = 50;

function mediaScandalCycle() {
  story.textContent = "Media uncovers a potential scandal involving your administration.";
  choicesDiv.innerHTML = '';
  addChoice("Deny and discredit media", () => {
    updateApproval(5);
    mediaPressure += 10;
    scandalLevel += 5;
    setScene('foreign_policy');
  });
  addChoice("Apologize and cooperate with investigation", () => {
    updateApproval(-10);
    scandalLevel -= 10;
    setScene('foreign_policy');
  });
  addChoice("Ignore it", () => {
    scandalLevel += 20;
    mediaPressure += 20;
    setScene('foreign_policy');
  });
}

function prepareForWar() {
  story.textContent = "A hostile nation is mobilizing. How do you respond?";
  choicesDiv.innerHTML = '';
  addChoice("Increase defense spending", () => {
    warReadiness += 20;
    updateApproval(-5);
    updateReputation(5);
    setScene('foreign_policy');
  });
  addChoice("Engage in diplomacy", () => {
    warReadiness -= 10;
    updateReputation(10);
    setScene('foreign_policy');
  });
  addChoice("Do nothing", () => {
    warReadiness -= 15;
    updateApproval(-10);
    setScene('foreign_policy');
  });
}

function showStatus() {
  story.textContent = "Your current administration status:";
  choicesDiv.innerHTML = '';
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const p3 = document.createElement('p');
  p1.textContent = `Media Pressure: ${mediaPressure}%`;
  p2.textContent = `Scandal Level: ${scandalLevel}%`;
  p3.textContent = `War Readiness: ${warReadiness}%`;
  choicesDiv.appendChild(p1);
  choicesDiv.appendChild(p2);
  choicesDiv.appendChild(p3);
  addChoice("Return to game", () => setScene(currentStep));
}


function aiAdvisor(topic) {
  let response = "";
  switch (topic) {
    case 'economy':
      response = "AI Advisor: Historical data suggests middle-class stimulus improves approval by 10-15% over 6 months.";
      break;
    case 'scandal':
      response = "AI Advisor: Transparency tends to restore trust faster than denial. Recommend cooperation.";
      break;
    case 'war':
      response = "AI Advisor: Diplomacy reduces global risk short-term. Military buildup raises approval domestically.";
      break;
    default:
      response = "AI Advisor: Insufficient data. Please specify a known topic.";
  }
  alert(response);
}

function generateHeadline() {
  const headlines = [
    "BREAKING: President Faces Backlash Over Climate Bill",
    "Global Leaders Applaud President's Peace Initiative",
    "Markets Rally After Economic Stimulus Passes",
    "Scandal Brews Inside the White House?",
    "Nation Divided as Military Budget Skyrockets",
    "Approval Surges After Emergency Relief Efforts"
  ];
  const headline = headlines[Math.floor(Math.random() * headlines.length)];
  alert("News Flash: " + headline);
}
