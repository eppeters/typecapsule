[![Build Status](https://travis-ci.org/eppeters/typecapsule.svg?branch=master)](https://travis-ci.org/eppeters/typecapsule)

Overview
========
A web app that mixes free speech and time-release. type-Capsule is little more than a text box that sends its content to a database to be stored without any user details. After a user-given time delay for the message, the post will available to the public for reading.

Purpose
========
I created type-Capsule just to learn the Node.js Express framework and, primarily, Redis's data structures. This isn't the perfect use case for Redis because everything the app does could be done in one simple table and a couple of extremely simple SQL queries, but that's not the point. Learning is fun!

Development Status
========
A while back, typeCapsule underwent a total rewrite (like all 200 lines of it), and currently it is possible to submit and view the 100 most recently released capsules.

Demo
========
There is a demo available at [http://typecapsule-peteredw.rhcloud.com/](http://typecapsule-peteredw.rhcloud.com/)
