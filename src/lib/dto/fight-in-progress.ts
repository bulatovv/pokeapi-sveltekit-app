
type Pair<T> = [T, T];

export type FightInProgressDTO = {
    id: string,
    pokemons: Pair<{
        id: number,
        name: string,
        attack: number,
        currentHp: number,
    }>,
    move: Pair<number|null>,
    winner: 0 | 1 | null,
}
