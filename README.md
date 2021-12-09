# Bingle Highlight Search Engine

### Demo: https://www.youtube.com/watch?v=7Xv4ZQc5zuk

Bingle is a Google Chrome extension that allows users to quickly access relevant information about some word(s) on a webpage without having to open another browser tab to search for the query. This is done by highlighting the candidate word(s) to search for, right-clicking on the highlighted word(s), and then selecting 'Search on Bingle'.

The highlighted words act as a query that will be fed into a BM25 retrieval algorithm. After the retrieval completes, Bingle will select from these results the 3 most relevant Wikipedia articles and their corresponding summaries and display them to the user in a mini-card overlay located at the top right corner of the page.

This project was developed jointly by Gene Horecka, Mony Chhen, Shubha Sundar, and Sushma Ponna for the University of Illinois at Urbana-Champaign's CS410 Course: Text Information Systems (Fall 2021).

---

## Usage

1. Install Bingle using the instructions below.
2. Highlight some words(s) on a webpage. This will act as the search query.
3. Right click on the highlighted word(s) and select 'Search on Bingle' from the dropdown list.
4. Bingle will return the 3 most relevant search results based on the search query. The results will be displayed in a mini dropdown list at the top right corner of your Chrome web browser.
5. Each dropdown card will contain a summary of the most relevant search results, along with a link to the corresponding Wikipedia page for that result.

---

## Installation

    $ git clone git@github.com:genefever/bingle.git
    $ cd bingle

## Requirements

To run, you will need to have Python version 3.5 and the latest Node.js version installed. In addition, you will need to have the necessary Python libraries.

- ### Node.js

  Visit the [official Node.js Downloads website](https://nodejs.org/en/download/) and download the installer for your corresponding platform. Be sure to have `git` available in your PATH, since `npm` might need it (you can find git [here](https://git-scm.com/)).

  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

  If the installation was successful, you should be able to run the following commands:

        $ node --version
        v14.16.1                    # Your version might differ.

        $ npm --version
        7.17.0                      # Your version might differ.

- ### Python version 3.5

  This project needs to run in Python version 3.5 environment because of the requirements from the [metapy library](https://github.com/meta-toolkit/metapy). If you don't have `python3.5` installed, one easy way to install it is to use [pyenv](https://github.com/pyenv/pyenv). For Windows, use [pyenv-win](https://github.com/pyenv/pyenv-installer).

  `pyenv` is a tool for managing Python versions. You can use `pyenv` to install different Python versions and easily switch between them without interfering with the system Python version installed on your computer.

  Once you have pyenv installed, run:

        $ pyenv install 3.5.10
        $ pyenv local 3.5.10

- ### pip install

  After you have your Python environment set up, then from the `bingle/` project root directory, run:

        $ pip install -r requirements.txt

  to install all the necessary Python packages for this project.

---

## Configure the app to run locally

### API server

The project's backend API server is built to run locally and receives HTTP GET requests on the `http://localhost:4000/api` endpoint. There is currently no backend API server hosted online for this project. However, if you would like to host this API server online, please fork and do so!

1.  #### Configure the backend server.

    From the `bingle/` project root directory, run:

        $ npm install

2.  #### Download and add the necessary index folder and files to the corresponding directories.

    Within `bingle/python/`, you will need to add:

    - [`idx/`](https://drive.google.com/drive/folders/1LxOiHrWWlzrxMpOgy5QrllapuGNqYWYy?usp=sharing) folder (including all its contents)
    - [`final_compact_df.csv`](https://drive.google.com/file/d/1nWawg9RCxungWdR6_JdqmTwfC4xoju-p/view?usp=sharing)

    And within the `bingle/python/wikipidia/`, you will also need to add:

    - [`wikipedia.dat`](https://drive.google.com/file/d/1GxQFsFEWKTvtRqqV8TObkmJ4cixf23lN/view?usp=sharing)

### Chrome extension

For the Chrome extension client, you have 2 options:

- #### Option 1:
  Download and install the deployed Bingle Chrome extension from the Google Chrome Web Store.
- #### Option 2:

  Build and run the Chrome extension locally on your computer. This option allows you to modify and test the Chrome extension as you want.

  ##### Build instructions

  From the `bingle/` project root
  directory, run:

        $ cd chrome_extension
        $ npm install

  After `npm install` completes, build the Chrome extension by running:

        $ npm start

  This will invoke webpack to generate a `dist` folder within `bingle/chrome_extension/`, which contains all the necessary build files for the Chrome extension.

  Then, go to your Chrome web browser and enter [chrome://extensions/](chrome://extensions/) in the URL. In the top right corner of this page, turn on the `Developer mode` switch.

  Finally, click the `Load unpacked` button on the top left corner of this page and select and import the newly generated `dist` folder.

  You have now successfully installed a local version of the Chrome extension on your browser!

  <b>Note:</b> After installation, if you don't see the extension pop up after clicking "Search on Bingle", refresh the page and try again.

## Running the project

In order for the Chrome extension to work properly, you must be running the local API server on your computer so that it can receive the requests from the extension.

Open up a new terminal shell, enter the `bingle/` project root directory, then run:

    $ npm start

Alternatively, you can use `nodemon` to run the server. [Nodemon](https://www.npmjs.com/package/nodemon) is a Node.js tool that monitors for any changes in the server source code and automatically restarts the server. To use, make sure you have `nodemon` installed globally on your computer.

    $ npm install -g nodemon

Then run:

    $ nodemon start

The server is now running.

Keep the server running for the duration that you are using the app (i.e. don't terminate the server process in the terminal while using the extension).

You are now ready to use the extension!

## Chrome extension minimized production build

If you want a minimized build version of the Chrome extension, then from within `bingle/chrome_extension`, run:

    $ npm run build

This will generate a minimized build within the `dist` folder. This is mainly for deployment purposes (for example when uploading to the Google Chrome Web Store) so that the extension is as compact as possible.
