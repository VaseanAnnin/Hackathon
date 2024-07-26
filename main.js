document.addEventListener('DOMContentLoaded', () => {});

const requestButton = document.getElementById('apiRequest');
console.log(requestButton);
requestButton.addEventListener('click', (e) => {
  const body = document.querySelector('body');
  const imageBox = document.createElement('div');
  const image = document.createElement('img');
  imageBox.setAttribute('id', 'image-box');
  body.appendChild(imageBox);
  console.log('Request button clicked');
  e.preventDefault();

  //Gets the quote.
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '5ea25c0685msh5e3bc76ff5effeap143cb9jsn15bd73f6e2df',
      'x-rapidapi-host': 'quotes15.p.rapidapi.com',
    },
  };

  fetch(
    'https://quotes15.p.rapidapi.com/quotes/random/?language_code=en',
    options
  )
    .then((data) => data.json())
    .then((data) => {
      //   data.forEach((element) => {
      //     console.log(element);
      //   });

      console.log(data);
      console.log(data.originator.name);
      console.log(data.content);

      const quote = document.createElement('div');
      quote.innerHTML = `${data.content}`;
      body.appendChild(quote);

      const origin = document.createElement('div');
      origin.innerHTML = `- ${data.originator.name}`;
      body.appendChild(origin);
    });

  // Keep this just in case
  // fetch('https://picsum.photos/720/1080/')
  //   // .then((data) => data.json())
  //   .then((data) => {
  //     console.log(data.url);
  //   });

  //Finds a random image from caption this
  fetch('https://meme-api.com/gimme/captionthis')
    .then((data) => data.json())
    .then((data) => {
      console.log(data.url);
      image.setAttribute('id', 'image');
      image.setAttribute('src', `${data.url}`);
      imageBox.appendChild(image);
      // imageBox.style.backgroundImage = `url(${data.url})`;
    });
});
