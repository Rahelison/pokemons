import { Injectable } from "@angular/core";
import { POKEMONS } from "./donnee-pokemons/mock-pokemons";
import { Pokemon } from "./donnee-pokemons/pokemon";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import { Observable } from "rxjs";
import { of } from "rxjs";

@Injectable()
export class PokemonsService{

  constructor(private http: HttpClient){}

  private pokemonsUrl = 'api/pokemons';

    private log(log:string){
      console.info(log);
    }

    private handleError<T>(operation='operation', result?: T){
      return (error: any): Observable<T> => {
        console.log(error);
        console.log(`${operation} failed: ${error.message}`);

        return of(result as T);
      };
    }

    // Le pipe asynchrone est un pipe capable de consommer des Observables en appelant implicitement la méthode subscribe afin de "binder" les valeurs contenus dans l'observable
    //Retourne tous les pokémons
    getPokemons(): Observable<Pokemon[]>{
      return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
        tap(_ => this.log(`fetched pokemons`)),
        catchError(this.handleError(`getPokemons`, []))
      );
    }

    // Retourne le pokémon avec l'identifiant passé en paramètre
    getPokemon(id:number): Observable<Pokemon> {
      const url = `${this.pokemonsUrl}/${id}`;
      return this.http.get<Pokemon>(url).pipe(
        tap(_ => this.log(`fetched pokemon id=${id}`)),
        catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
      ); 
    }


    updatePokemon(pokemon: Pokemon): Observable<Pokemon>{
      const httpOptions = {
        headers: new HttpHeaders({'content-type' : 'application/json'})
      };
      
      return this.http.put<Pokemon>(this.pokemonsUrl, pokemon, httpOptions).pipe(
        tap(_ => this.log(`updated pokemon id=${pokemon.id}`)),
        catchError(this.handleError<any>('updatePokemon failed'))
      );

    }


    deletePokemon(pokemon: Pokemon): Observable<Pokemon>{
      const url = `${this.pokemonsUrl}/${pokemon.id}`;
      const httpOptions = {
        headers: new HttpHeaders({'content-type' : 'application/json'})
      };
      
      return this.http.delete<Pokemon>(url, httpOptions).pipe(
        tap(_ => this.log(`delete pokemon id=${pokemon.id}`)),
        catchError(this.handleError<any>('deletePokemon failed'))
      );
    }

    getPokemonTypes(): string[]{
      return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol'];
    }

}