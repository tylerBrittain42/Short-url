# Outline
Design docs for short url project
# Model(s)
## URL
- Shortened URL
- Original URL
- \# of times clicked (use static number for now)
# Routes
## Index
- **GET** - Home page
- **POST** - Create shortURL 
</br></br>
## URL
### View All
- **GET** - All Page
### SpecificURL
- **GET** - Redirect to URL
# Site Pages
## Home
- Default page that shortens the url
- Transitions into Result on successful shortening
## Result
- Rendered upon successful shortening
- Displays both shortened url and original url
## All
- Uses dataTables.js to display a list of all shortened urls
- Entire table is stored as links to allow easy access
## About
- Need to complete
- Will consist of essentially same information as read me
# Need to complete
1. About page (static html)
1. Write code to double check if a url has already been saved

