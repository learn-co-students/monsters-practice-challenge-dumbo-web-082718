let page = 1;
document.addEventListener('DOMContentLoaded', function(event){
console.log(page)
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(monsters => addMonstersToPage(monsters))
    .then(resp => renderForm())
    .then(resp => findSubmit())
    .then(resp => changePage())
});

function addMonstersToPage(data){
  data.forEach( monster => {
    addSingleMonster(monster);
  });
  return data;
}
function addSingleMonster(monsterObj){
  let monsterContainer = document.querySelector('#monster-container');
  let monsterCard = document.createElement('div');
  monsterCard.className = 'monster-card';
  let h1= document.createElement('h1');
  h1.innerText = monsterObj.name;
  let h2 = document.createElement('h2');
  h2.innerText = monsterObj.age;
  let p = document.createElement('p');
  p.innerText = monsterObj.description;
  monsterCard.append(h1, h2, p);
  monsterContainer.append(monsterCard);
}
function renderForm(){
  let formContainer = document.querySelector('#create-monster');
  let form = document.createElement('form');
  form.className = 'form-class';
  let nameLabel = document.createElement('label');
  nameLabel.for = "name";
  nameLabel.innerText = "Name:"
  let name = document.createElement('input');
  name.type = 'text';
  name.name = 'name';

  let ageLabel = document.createElement('label');
  ageLabel.for = "age";
  ageLabel.innerText = "Age:"
  let age = document.createElement('input');
  age.type = 'text';
  age.name = 'age';

  let descriptionLabel = document.createElement('label');
  descriptionLabel.for = "description";
  descriptionLabel.innerText = "description:"
  let description = document.createElement('textarea');
  description.type = 'text';
  description.name = 'description';

  let submit = document.createElement('input');
  submit.type = "submit";
  submit.className = "submit-btn"
  form.append(nameLabel, name, ageLabel, age, descriptionLabel, description, submit);
  formContainer.append(form);
}
function createMonster(name, age, description){
  const options = {
    method: "POST",
    body: JSON.stringify({
      name: name,
      age: age,
      description: description
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
  return fetch(`http://localhost:3000/monsters`, options)
}
function findSubmit(){
  const form = document.querySelector(".form-class");
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    createMonster(e.target.name.value,e.target.age.value,e.target.description.value)
    .then(res => res.json())
    .then(monster => {
      addSingleMonster(monster);
    });
  });
}

function changePage(){
  document.querySelector('#forward').addEventListener('click', (e)=>{
    page++
    console.log(page);
    return fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
      .then(response=> response.json())
      .then(monsters => {
        let monsterContainer = document.querySelector('#monster-container');
        monsterContainer.innerHTML="";
        addMonstersToPage(monsters);
      })
  })


  document.querySelector('#back').addEventListener('click', (e)=>{
    page--;
    console.log(page);
    return fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
      .then(response=> response.json())
      .then(monsters => {
        let monsterContainer = document.querySelector('#monster-container');
        monsterContainer.innerHTML="";
        addMonstersToPage(monsters);
      })
  })

}
