# File Folder Cleaner

This Node.js script is designed to help you clean up files and folders on your machine. It will recursively search through a specified folder (defined in a `.env` file) and prompt you to delete any file extensions that are not in your keep list. It will also delete any files with extensions that are in your delete list.

## Installation

1. Clone this repository to your local machine
2. Install Node.js on your machine
3. Navigate to the project folder in your terminal
4. Install the project dependencies by running `npm install`
5. Create a `.env` file in the root directory with the following contents:

`SEARCH_PATH=/path/to/folder/to/clean`

Replace `/path/to/folder/to/clean` with the absolute path to the folder you want to clean up.

## Usage

To run the script, navigate to the project folder in your terminal and run:

`node file-folder-cleaner.js`

The script will prompt you to delete any file extensions that are not in your keep list. If you choose to delete a file extension, it will be added to your delete list, and any files with that extension will be deleted. Empty folders will also be deleted automatically.

## Example

Suppose you want to clean up a folder called `~/Documents`. You would perform the following steps:

1. Clone this repository to your local machine
2. Install Node.js on your machine
3. Navigate to the project folder in your terminal
4. Install the project dependencies by running `npm install`
5. Create a `.env` file in the root directory with the following contents:

`SEARCH_PATH=~/Documents`

6. Run the script by running `node file-folder-cleaner.js`
7.  Follow the prompts to delete any file extensions and files you no longer need.
