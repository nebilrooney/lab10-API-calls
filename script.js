const fetchBtn = document.getElementById('fetchBtn');
const xhrBtn = document.getElementById('xhrBtn');
const postForm = document.getElementById('postForm');
const putForm = document.getElementById('putForm');
const output = document.getElementById('output');

function getPostWithFetch() {
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => res.json())
    .then(data => {
      displayOutput(`Title: ${data.title}<br>Body: ${data.body}`);
    })
    .catch(error => {
      displayOutput(`Error: ${error.message}`);
    });
}

function getPostWithXHR() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2');
  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      displayOutput(`Title: ${data.title}<br>Body: ${data.body}`);
    } else {
      displayOutput(`Error: ${xhr.status}`);
    }
  };
  xhr.onerror = () => displayOutput('Network error');
  xhr.send();
}

function createPost(e) {
  e.preventDefault();
  const title = document.getElementById('postTitle').value;
  const body = document.getElementById('postBody').value;

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body })
  })
    .then(res => res.json())
    .then(data => {
      displayOutput(`Post Created:<br>${JSON.stringify(data, null, 2)}`);
    })
    .catch(error => {
      displayOutput(`Error: ${error.message}`);
    });
}

function updatePost(e) {
  e.preventDefault();
  const id = document.getElementById('postId').value;
  const title = document.getElementById('putTitle').value;
  const body = document.getElementById('putBody').value;

  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = () => {
    if (xhr.status === 200) {
      displayOutput(`Post Updated:<br>${xhr.responseText}`);
    } else {
      displayOutput(`Error: ${xhr.status}`);
    }
  };
  xhr.onerror = () => displayOutput('Network error');
  xhr.send(JSON.stringify({ title, body }));
}

function displayOutput(content) {
  output.innerHTML = content;
}

fetchBtn.addEventListener('click', getPostWithFetch);
xhrBtn.addEventListener('click', getPostWithXHR);
postForm.addEventListener('submit', createPost);
putForm.addEventListener('submit', updatePost);
