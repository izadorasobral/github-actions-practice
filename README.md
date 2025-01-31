#GitHub Actions Practice

##This project is a practice setup for GitHub Actions to automate testing and deployment. We use Node.js and Express to create a simple server and configure GitHub Actions workflows for Continuous Integration (CI), caching, and testing across multiple Node.js versions.

Description

This project serves as an example of how to set up and use GitHub Actions in a Node.js development environment. We implemented a basic server with Express and added automated tests using Jest and Supertest. Additionally, we configured GitHub Actions workflows to automate CI, caching, and testing across different Node.js versions.

Project Structure

server.js: Basic server code using Node.js and Express.

server.test.js: Automated tests using Jest and Supertest.

package.json: Node.js project configuration file.

.github/workflows: Contains the GitHub Actions workflows.

Installation

To install and run the project locally, follow these steps:

Clone the repository:

git clone https://github.com/izadorasobral/github-actions-practice.git
cd github-actions-practice

Install dependencies:

npm install

Usage

To start the server, run the following command:

node server.js

The server will be running at http://localhost:3000, displaying the message "Hello World, Izadora HERE!".

Testing

To run the tests, use the following command:

npm test

GitHub Actions Workflows

CI Pipeline

The basic CI workflow is configured in .github/workflows/ci.yml:

name: CI Pipeline

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Run a script
      run: echo "Hello, GitHub Actions!"

Caching

The caching workflow is configured in .github/workflows/cache.yml:

name: Cache Example

on:
  push:
    branches:
      - main

jobs:
  cache:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Cache Node.js modules
      uses: actions/cache@v3
      with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          ${{ runner.os }}-node-

    - name: Debug Cache
      run: |
        ls -la ~/.npm
        npm install

Matrix Testing

The matrix workflow for testing across different Node.js versions is configured in .github/workflows/matrix.yml:

name: Matrix Testing

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Run a script
      run: echo "Testing on Node.js ${{ matrix.node-version }}"

Contribution

If you would like to contribute to this project, follow these steps:

Fork the repository.

Create a new branch:

git checkout -b my-new-feature

Make your changes and commit:

git commit -m "Add my new feature"

Push to your branch:

git push origin my-new-feature

Open a Pull Request for review.

License

This project is licensed under the ISC License. See the LICENSE file for more details.
