export interface PokemonType {
    type: {
        name: string;
    };
}

export interface PokemonDetail {
    id: number;
    name: string;
    types: PokemonType[];
    url: string;
}

export class Pokemon {
    id: number;
    number: string;
    name: string;
    type: string;
    types: string[] = [];
}
