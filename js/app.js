const APP = {
  isOnline: 'onLine' in navigator && navigator.onLine,
  init() {
    APP.registerWorker();
    APP.addListeners();
    APP.getTopScores();
  },
  addListeners() {
    //TODO: display a CURRENTLY OFFLINE message in the header span if the page is loaded offline DONE
    if (navigator.onLine) {
      document.getElementById(`offline`).innerHTML= "Currently Browsing ONLINE";
  console.log('online');
} else {
  document.getElementById(`offline`).innerHTML = `Currently Browsing OFFLINE`;
  console.log('offline')};
  },
  getTopScores() {
    let url = 'https://jsonplaceholder.typicode.com/users';
    fetch(url, {
      method: 'get',
      headers: { accept: 'application/json,text/json' },
    })
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((users) => {
        //add scores to each person
        let scores = users
          .map((user) => {
            let score = Math.floor(Math.random() * 100000) + 100000;
            //only keep the name and id properties plus a random high score
            
            return { name: user.name, id: user.id, score };
          })
          .sort((a, b) => {
            
            return a.score - b.score;
          })
          return scores
        
      })
      .then((scores)=>{
        document.getElementById(`scorelist`).innerHTML = scores.map(score=>{
          return `<li data-id="${score.id}"><h3>${score.name}</h3><p>${score.score}</p></li>`
        }).join('');
      })
      .catch(APP.handleError)
  },
  registerWorker() {
    if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    console.log('Service worker registration succeeded:', registration);
  }, /*catch*/ (error) => {
    console.error(`Service worker registration failed: ${error}`);})
}else{
  alert(`SW not supported`)
}

    
  },
  handleError(err) {
    document.getElementById('footer').innerHTML = `${err.message}`;
  },
};

document.addEventListener('DOMContentLoaded', APP.init);
