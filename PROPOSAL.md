####Ryan Edwards 9/11/17

##READ/WRITE

###What is Read/Write?

Following up on the smashing success that was The Reading List, the developers (developer) have (has) opted to expand on the premise of enabling those with a passion for the written word. As with The Reading List, users will be able to maintain a list of books they would like to read (obtained either through an API search or created themselves), as well as a lit of books they have read and what they thought about them. In addition to that, the user will now be able to express themselves further by writing their own stories.

That's the "write" in Read/Write.

Users will be able to create any number of projects, within which they can write chapters and maintain lists of characters & locations.

Following that, it might even be possible to head into a forum to discuss project ideas and bounce ideas back and forth.

###Wireframes

(pending)

###Initial thoughts on app structure

The app will largely be divided as the name indicates, between Read and Write functions. It will largely require a user to be logged into use the bulk of its features. A few features, like the book search, will be accessible without loggin in, as with The Reading List (Project 2). I have not decided yet whether the store lookup will make a return, as I question the usefulness of it with regard to the core purpose of the app, but perhaps it can be reimplemented post-MVP.

The Read functionality will be a fairly simple database of user books. User will create, view, update, and delete books as they see fit. They will also be able to update books by marking them as read and giving them a rating and commentary.

The Write functionality will allow the user to create and delete writing Projects. These Projects will have three components: Chapters, Characters, and Locations. The Chapters and Locations will have name and description. The Chapters will have a number, a name, and CONTENT. The Content will be where the user writes their stories. I have not yet decided if content will be saved in Firebase, saving as the user types (a good idea), or if I will implement a Save button to update the chapter or have it update automatically or both.

####Tables

Initial thoughts on database table organization:

**Users** `has_many :books, :projects`
username | password_digest | first_name | last_name | session_token
--- | --- | --- | --- | ---
string | string | string | string | string

**Books** `belongs_to :user`
title | author | year | genre | description | image_url | user_id | user_comment
--- | --- | --- | --- | --- | --- | --- | ---
string | string | number | string | text | string | integer | string

**Projects** `belongs_to :user` `has_many :chapters, :characters, :locations`
title | subtitle
--- | ---
string | string

**Chapters** `belongs_to :project`
number | title | content
--- | --- | ---
string | string | text

**Characters** `belongs_to :project`
name | description
--- | ---
string | text

**Locations** `belongs_to :project`
name | description
--- | ---
string | text

###Phases

####Phase -5
1. Wireframes
2. User stories
3. Timeline
4. Create Rails app
5. Create React client

####Phase -4
1. Set up database
2. Set up migration tables

####Phase -3
1. Set up authentication

####Phase -2
1. Set up Book CRUD functionality
  * Create book
  * View book
  * Edit book
  * Delete Book
2. Set up user rating & feedback functionality
3. Set up API search
  * Allow users to add books from search

####Phase -1
1. Set up Project Create/Delete functionality
2. Set up Character CRUD
3. Set up Location CRUD
4. Set up Chapter Create/View/Delete functionality

####Phase 0 (MVP)
1. Set up Chapter Update functionality (chiefly, the ability to write large paragraphs with proper formatting)

####Phase 1
1. CSS it up real good like.

####Phase 2+
These are just possible avenues to take from this point
1. User can change text formatting like in Dom's app.
2. Create a forum for users to exchange ideas.
3. Another chatroom!!!
3. ...?

###Tech Stack
* React.js
* Rails
* Ruby
* POSTGRES
* possibly Firebase for the chapter content.
* possibly ActiveCable for chatroom functionality
* possibly Redux (need to attend that lecture)

###Links and Resources
[Google Books API](https://developers.google.com/books/)
[Google Locations API](https://developers.google.com/maps/)


