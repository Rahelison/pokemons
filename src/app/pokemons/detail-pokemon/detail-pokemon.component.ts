import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../donnee-pokemons/pokemon';
//import { POKEMONS } from '../donnee-pokemons/mock-pokemons';

import { ActivatedRoute, Router } from '@angular/router';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'detail-pokemon',
  templateUrl: './detail-pokemon.component.html'
})
export class DetailPokemonComponent implements OnInit{

  //pokemons: Pokemon[];
  pokemon: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private pokemonsService: PokemonsService){
    //this.pokemons = [];
  }

  ngOnInit(): void {

    //this.pokemons = POKEMONS;
    let id = +this.route.snapshot.params['id'];
    this.pokemonsService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon );
 

  }

  goEdit(pokemon: Pokemon):void{
    let link = ['pokemon/edit', pokemon.id];
    this.router.navigate(link);
  }

  goBack(){
    this.router.navigate(['/pokemon/all']);
  }

  delete(pokemon: Pokemon):void{
    this.pokemonsService.deletePokemon(pokemon).subscribe(() => this.goBack());
  }
}