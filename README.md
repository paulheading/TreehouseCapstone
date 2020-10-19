# Welcome to Movie Tunes!

## Introduction

<br>

Movietunes is a full stack website that includes

- React front-end
- React Bootstrap styling
- Express back-end
- MySQL database
- Sequelize ORM
- 1 internal api (between front/back ends)
- 2 external api (omdb & spotify)

<br>

<hr>

<br>

## Features

<br>

1. The user can create an account and

   - save searches for future reference
   - edit search results and the results will be automatically saved
   - access a personalised dashboard, with saved/edited results

2. Each result displays a relevant album, featuring a list of artists related to that album.

3. The hero card displays a search result from the OMDB database.

4. On desktop, the user receives a greeting message after sign up

5. On desktop, the login button will display a personal greeting

<br>

<hr>

<br>

## Bugs

<br>

1. The list of related artists renders unpredictably. Often you will need to repeat a search to see it.

2. The list of saved searches (in the account area) renders unpredictably. Often you will need to refresh the page to update it.

3. If the user searches for a film => then logs in and already has an edited saved version => the search results do not immediately update. The user must click search again to see their edited results.
