const API_URL = "https://64f4e6af932537f4051ac718.mockapi.io/Week_12_Project_API/:movie"//url for crud//

function createMovie(createMovie){ //created movie//
    console.log("createMovie Movie", createMovie);
}

class Movie{ //movie//
    constructor(name){
        this.name=name;
        this.genre=[];
    }
    addMovie(name,year){//add movie//
        this.genre.push(new Movie(name,year));
    }
}
class Genre{
    constructor(name){
        this.name=name;
    }
}
class MovieService{//service for movie //
    static url ='https://64f4e6af932537f4051ac718.mockapi.io/Week_12_Project_API/:movie'

    static getAllMovies(){//method for calling movies//
        return $.get(this.url);
    }
    static getMovie(id){
        return $.get(this.url + `/${id}`);//create//
    }
    static createMovie(movie){//post//
        return $.post(this.url,movie);
    }
    static updateMovie(movie){//update//
        return $.ajax({
            url:this.url + `/${movie.id}`,
            dataType:'json',
            data:JSON.stringify(movie),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deleteMovie(id){//delete//
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
    }

    class DOMManager {
        static movies;
        
        static getAllMovies(){
            MovieService.getAllMovies().then(movies =>this.render(movies));
        }
        static createMovie(name){
            MovieService.createMovie(new Movie(name))
        }

        static deleteMovie(id){
            MovieService.deleteMovie(id)
            .then(() =>{
                return MovieService.getAllMovies();
            })
            .then((movies) => this.render(movies));
        
        
    }
    static render(movies){
        this.movies= movies;
        $('#app').empty();
        for (let movie of movies){
            $('#app').prepend(
                `<div id="${movie._id}" class="card">
                <div class="card-header">
                <h2>${movie.name}</h2>
                <button class="btn btn-danger" onclick="DOMManager.deleteMovie('${movie._id}')">Delete</button>
                </div>
                <div class="card-body">
                <div class="card">`
            )
        }
    }

}
