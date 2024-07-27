document.addEventListener('DOMContentLoaded', () => {
  let mode = 'meme';

  // Added a toggle to switch from displaying meme pics or normal pics
  // Make sure to press the appropriate arrowkey before clicking on the button
  // console.log(mode);

  const requestButton = document.getElementById('api-request');
  // console.log(requestButton);

  // Press up arrow to get "normal" pics and down arrow to get "meme" pics
  document.querySelector('body').addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
      mode = 'normal';
      console.log(mode);
      document.getElementById('api-request').innerHTML = 'Inspire me?';
    }

    if (e.code === 'ArrowDown') {
      mode = 'meme';
      console.log(mode);
      document.getElementById('api-request').innerHTML = 'MEME ME';
    }
  });

  requestButton.addEventListener('click', (e) => {
    // console.log('Request button clicked');
    e.preventDefault();

    // Made containers for the image box and quotes to more easily style/center them in css
    const imageContainer = document.querySelector('.image-box-container');
    const textContainer = document.querySelector('.text-container');

    let imageBox = document.getElementById('image-box');
    // Checks to see if there is already an image box
    // If there isn't, this will create one and append it to the image container
    // and also create an image element that will change from our fetch
    if (!imageBox) {
      imageBox = document.createElement('div');
      imageBox.setAttribute('id', 'image-box');
      imageContainer.appendChild(imageBox);

      const image = document.createElement('img');
      image.setAttribute('id', 'image');
      imageBox.appendChild(image);
    } else {
      // Otherwise, if there already is one, clears out the image box's inner HTML
      // to delete the image and recreates an image element that will change from our fetch.
      // This was necessary because without this line, clicking the button will keep adding
      // more image elements.
      imageBox.innerHTML = '';

      const image = document.createElement('img');
      image.setAttribute('id', 'image');
      imageBox.appendChild(image);
    }

    // Like the above check for image box, these conditionals for the text will check
    // if there is already a quote. We don't have to reset them since our logic in the fetches
    // simply update the innerHTML versus creating a new image element.
    let quote = document.getElementById('quote');
    if (!quote) {
      quote = document.createElement('div');
      quote.setAttribute('id', 'quote');
      textContainer.appendChild(quote);
    }

    let origin = document.getElementById('originator');
    if (!origin) {
      origin = document.createElement('div');
      origin.setAttribute('id', 'originator');
      textContainer.appendChild(origin);
    }

    //Gets the quote from the api
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
        console.log(data.tags[0]);
        // console.log(data.originator.name);
        // console.log(data.content);
        const split = document.createElement('hr');
        split.setAttribute('id', 'splitline');
        imageBox.appendChild(split);
        quote.innerHTML = `${data.content}`;
        origin.innerHTML = `- ${data.originator.name}`;
        // document.querySelector('#originator').innerHTML = `- ${data.originator.name}`;
      });

    // Depending on the "mode" of the extension, will fetch an image from the apropriate check

    if (mode === 'normal') {
      // Keep this just in case
      fetch('https://picsum.photos/500/500/')
        // .then((data) => data.json())
        .then((data) => {
          console.log(data.url);
          image.setAttribute('src', `${data.url}`);
        });
    }

    if (mode === 'meme') {
      //Finds a random image from given subreddit at end of url
      fetch('https://meme-api.com/gimme/captionthis')
        .then((data) => data.json())
        .then((data) => {
          let myImage = new Image();
          myImage.src = `${data.url}`;
          console.log(data.url);
          console.log(myImage.width);
          image.setAttribute('src', `${data.url}`);
        });
    }
  });
});
