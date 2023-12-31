import { GetPokemonByIds } from '../../queries/get-pokemon-by-ids';
import type { PokemonWithStats } from '../../dto/pokemon-with-stats';
import { FightInProgress } from '../models/fight-in-progress';
import { FightRound } from '../models/fight-round';
import { PokemonInFight } from '../models/pokemon-in-fight';
import type { NegativeMaxHpError, NegativeAttackError } from '../models/pokemon-in-fight';
import type { 
    PlayerAlreadyRolledError, 
    MoveNotProvidedError
} from '../models/fight-in-progress';
import type { Result } from '../models/result';
import type { Pair } from '../models/pair';
import type { FightInProgressRepository } from '../repositories/fight-in-progress-repository';

export type FightInProgressNotFoundError = {
    tag: 'FightInProgressNotFoundError',
}


export class FightService {
    
    constructor(
        protected readonly fightInProgressRepository: FightInProgressRepository,
    ) {}


    protected async createGame(
        pokemons: Pair<number>, 
        autoplay: Pair<boolean>
    ): Promise<
        Result<FightInProgress, NegativeMaxHpError | NegativeAttackError>
    > {
        const pokemonsWithStats: PokemonWithStats[] = await (new GetPokemonByIds(pokemons)).execute();
       
        const firstPokemon = PokemonInFight.create(
            pokemonsWithStats[0].stats.hp,
            pokemonsWithStats[0].stats.attack,
        );
        if (!firstPokemon.success) {
            return firstPokemon;
        }

        const secondPokemon = PokemonInFight.create(
            pokemonsWithStats[1].stats.hp,
            pokemonsWithStats[1].stats.attack,
        );

        if (!secondPokemon.success) {
            return secondPokemon;
        }


        const initialRound = FightRound.create([firstPokemon.value, secondPokemon.value]);

        const id = 'current';
        
        return {
            success: true,
            value: FightInProgress.create(id, autoplay, pokemons, [initialRound])
        };
    }


    async start(
        pokemons: Pair<number>, 
        autoplay: Pair<boolean>
    ): Promise<
        Result<void, NegativeMaxHpError | NegativeAttackError> 
    > {
        const fight = await this.createGame(pokemons, autoplay);
        if (!fight.success) {
            return fight;
        }

        await this.fightInProgressRepository.save(fight.value);

        return { success: true, value: undefined };
    }

    async progress(
        gameId: string,
        turn: 0 = 0, 
        turnNumber: number
    ): Promise<
        Result<
            void, 
            | PlayerAlreadyRolledError 
            | FightInProgressNotFoundError
            | MoveNotProvidedError 
        >
    > {
        const fight = await this.fightInProgressRepository.get(gameId);

        if (fight === null) {
            return { success: false, error: { tag: 'FightInProgressNotFoundError' } };
        }

        const result = fight.progress(turn, turnNumber);
        
        if (result.success) {
            await this.fightInProgressRepository.save(fight);
        }

        return result;
    }

    async quick(pokemons: Pair<number>): Promise<
        Result<
            void, 
            | NegativeMaxHpError 
            | NegativeAttackError
        >
    > {
        const fight = await this.createGame(pokemons, [true, true]);
        if (!fight.success) {
            return fight;
        }
        
        return { success: true, value: undefined };
    }
}
