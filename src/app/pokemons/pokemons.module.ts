import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsComponent } from './list-pokemons/pokemons.component';
import { BorderCardDirective } from './directives/border-card.directive';
import { PokemonTypeColor } from './pipes/pokemon-type-color.pipe';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { FormPokemonComponent } from './edit-pokemon/form-pokemon.component';
import { FormsModule } from '@angular/forms';

import { PokemonsService } from './pokemons.service';
import { PokemonRoutingModule } from './pokemons-routing.module';

@NgModule({
  declarations: [
    DetailPokemonComponent,
    EditPokemonComponent,
    FormPokemonComponent,
    PokemonsComponent,
    BorderCardDirective,
    PokemonTypeColor
  ],
  imports: [
    CommonModule,
    FormsModule,
    PokemonRoutingModule
  ],
  providers: [PokemonsService],
  bootstrap: []
})
export class PokemonsModule { }
