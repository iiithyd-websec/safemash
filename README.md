SafeMash
========

SafeMash is a JavaScript library to create safer mashups. This repo contains source code of a mashup developed in NodeJS. It has 2 versions - One built without any privilege separation (traditional approach, embedding third party JS) and the other built using SafeMash (uses HTML5 security APIs).

## Getting Started

1. [Install NodeJS](http://nodejs.org/)

1. Clone the project and run the server

	``` bash
	git clone https://github.com/iiithyd-websec/safemash.git
	cd safemash
	npm install
	node app.js
	```

1. [Open http://localhost:3000/](http://localhost:3000/)

## View demo: [http://safemash.herokuapp.com](http://safemash.herokuapp.com)
The homepage shows a mashup built without any privilege separation. Clicking the link "SafeMash" in the top menu takes to the mashup rebuilt using SafeMash.
