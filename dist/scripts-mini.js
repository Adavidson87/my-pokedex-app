/* eslint-env jquery *//* eslint no-console: ["error", { allow: ["warn", "error"] }] */let pokemonRepository=function(){let t=[],e='https://pokeapi.co/api/v2/pokemon/?limit=150';function n(t){return Number((t/10).toFixed(2))}return{getAll:function(){return t},addListItem:function(t){let e=document.querySelector('.list-group'),i=document.createElement('li');i.classList.add('list-group-item');let o=document.createElement('button');o.innerText=t.name,o.classList.add('btn-info'),o.setAttribute('data-target','#pokemonModal'),o.setAttribute('data-toggle','modal'),i.appendChild(o),e.appendChild(i),o.addEventListener('click',function(){!function(t){(function(t){let e=t.detailsUrl;return fetch(e).then(function(t){return t.json()}).then(function(e){t.name=e.name,t.imageUrl=e.sprites.front_default,t.height=e.height,t.weight=e.weight,t.types=[];for(var n=0;n<e.types.length;n++)t.types.push(e.types[n].type.name);t.abilities=[];for(var i=0;i<e.abilities.length;i++)t.abilities.push(e.abilities[i].ability.name)}).catch(function(t){console.error(t)})})(t).then(function(){!function(t){let e=$('.modal-title'),i=$('.modal-body');e.empty(),i.empty();let o=$('<h1>'+t.name+'</h1>'),a=$('<p>Height: '+n(t.height)+'m</p>'),l=$('<p>Weight: '+n(t.weight)+'kg</p>'),r=$('<p>Abilities: '+t.abilities+'</p>'),s=$('<p>Types: '+t.types+'</p>'),p=$('<img class="modal-img" style="width:50%">');p.attr('src',t.imageUrl),e.append(o),i.append(a),i.append(l),i.append(s),i.append(r),i.append(p)}(t)})}(t)})},loadList:function(){return fetch(e).then(function(t){return t.json()}).then(function(e){e.results.forEach(function(e){!function(e){if(!('object'==typeof e&&'name'in e&&'detailsUrl'in e))return document.write('Not correct information');t.push(e)}({name:e.name,detailsUrl:e.url})})}).catch(function(t){console.error(t)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})}),document.getElementById('searchBar').addEventListener('input',t=>{let e=t.target.value,n=document.getElementsByClassName('btn-info');for(let t=0;t<n.length;t++){n[t].innerText.toLowerCase().includes(e.toLowerCase())?n[t].parentNode.style.display='block':n[t].parentNode.style.display='none'}});
