<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="https://user-images.githubusercontent.com/46714781/221361044-c1b0d871-95ef-49d2-bbf3-bb1fe084753c.png" alt="Logo" width="400" height="300">
  </a>

<h3 align="center">Stockr.io</h3>

  <p align="center">
    Stockr.io is an application that allows new traders to make informed decision about stock trading through Sentimental Analysis using Natural Language Processing. 
    This was a submission for iNTUITION v9.0 Hackathon 2023 (https://intuition.ieeentu.com), but contributors are welcomed to continue developing this project.
    <br />
    <a href="https://github.com/raihahahan/intuition-hackathon-helloWorld"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/raihahahan/intuition-hackathon-helloWorld">View Demo</a>
    ·
    <a href="https://github.com/raihahahan/intuition-hackathon-helloWorld/issues">Report Bug</a>
    ·
    <a href="https://github.com/raihahahan/intuition-hackathon-helloWorld/issues">Request Feature</a>
  </p>
</div>

# Stockr.io

Stockr.io is an application that allows new traders to make informed decision about stock trading through Sentimental Analysis using Natural Language Processing.



<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- TABLE OF CONTENTS 
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>
-->


<!-- ABOUT THE PROJECT -->
## About The Project
![demo-main](https://github.com/raihahahan/intuition-hackathon-helloWorld/blob/main/repo-assets/demo-main.PNG)

### Purpose

It is not uncommon for common folks like you and I to be interested in dabbling in the stock market, eager to flip a profit. But for most of us, we do not know where to begin. With that in mind, the team at Stockr.io decided to implement an interactive application that allows users to input a ticker symbol of their choice and obtain relevant data about how valuable the stock is perceived through various news sources.


### Implementation

This project hacks various libraries and frameworks together in order to create a functioning application that is user-friendly. Read below for an explanation for an explanation of the overarching system behind this project:

1. User visits web client, enters their input and clicks the "Submit" button.
2. This sends a `POST` request to the backend web API.
3. The web API routes this data into a message queue.
4. The Python NLP project listens to this queue, and removes the first item of the queue to process it.
5. Once done processing, the Python program sends the output to the result queue.
6. A web socket connected to both the web client and the result queue listens to this queue, and broadcasts the output back to the web client.

![diagram](https://github.com/raihahahan/intuition-hackathon-helloWorld/blob/main/repo-assets/diagram-light.png?raw=true)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* Backend: C# .NET 6
* Frontend: React Nextjs
* Database: SQL Server (SQLEXPRESS)
* NLP: Python
* Message Queue: RabbitMQ

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started
There is a total of four programs to be run in the CLI at the same time for this project to work properly. They may however run independently on its own:

1. Web API: `Server/WebAPI`
2. Web socket: `Server/WebSocket`
3. Web client: `Client/helloworld-client`
4. Python NLP project: `sentiment-analyser/`

You may also run the telegram bot (`telegram/`), but this runs independently on its own.

### Prerequisites

* .Net 6: https://dotnet.microsoft.com/en-us/download
* npm
  ```sh
  npm install npm@latest -g
  ```
* RabbitMQ: https://www.rabbitmq.com/download.html
* SQL Server (Community): https://www.microsoft.com/en-sg/sql-server/sql-server-downloads
* Python3: https://www.python.org/downloads/

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/raihahahan/intuition-hackathon-helloWorld.git
   cd intuition-hackathon-helloWorld
   ```
   
2. C# dotnet server
```sh
cd Server
dotnet restore
```

3. Nextjs Web client
```sh
cd Client
npm install
```
* Get your rapidapi keys from https://rapidapi.com/twelvedata/api/twelve-data1/. This is for the list of stock tickers.
* Create `.env.local` to the root of the WebClient folder and add the following lines:
```sh
NEXT_PUBLIC_RAPID_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_RAPID_API_HOST=YOUR_API_HOST
```

4. Python NLP project
```sh
cd sentiment-analyser
pip install -r requirements.txt
```
* Get your newsapi API keys from https://newsapi.org/register. This is to retrieve the news sources to be added as arguments to the NLP model.
* Add a `.env` file to the root of this Python project and add the following lines:
```sh
apiKey=YOUR_NEWSAPI_KEY
```

5. Telegram bot
```sh
cd telegram
pip install -r requirements.txt
```
* Get your Telegram API key from https://core.telegram.org/api/obtaining_api_id.
* Add a `.env` file to the root of this Python project and add the following lines:
```sh
API_KEY=YOUR_TELE_API_KEY
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

* Open four terminals (5 if with Telegram bot. We will improve this as part of the roadmap using docker compose) and run the following commands for each:
1. .Net Web API
```sh
cd Server/WebAPI
dotnet run
```

2. .Net Web Socket
```sh
cd Server/WebSocket
dotnet run
```

3. React Nextjs
```sh
cd Client/helloworld-client
npm run dev
```

4. Python NLP project
```sh
cd sentiment-analyser
python3 src/main.py
```

5. Python Telegram bot
```sh
cd telegram
python3 main.py
```

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] Fix dockerization (issues with CORS)
- [ ] Fix non-deterministic behaviour of state in Web Client (loading state sometimes doesn't change upon receiving message from RabbitMQ via SignalR)
- [ ] Tidy up Models in backend so that we can wire up to a database (most likely SQL Server (Community)). We are currently using in-memory database.
- [ ] Authentication (OAuth2)
- [ ] Improve message queue implementation.

See the [open issues](https://github.com/raihahahan/intuition-hackathon-helloWorld/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
