const populateList = (list) => {
  list.sort((a, b) => b.score - a.score);

  document.querySelector('.scor-list').innerHTML = '';
  list.forEach((item) => {
    document.querySelector('.scor-list').innerHTML += `<li><div>${item.user}</div> <div>${item.score}</div></li>`;
  });
};

export default populateList;
