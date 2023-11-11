
type Pair<T> = [T, T];

export type FightInProgressDTO = {
    pokemons: Pair<{
        name: string,
        currentHp: number,
        attack: number
    }>
    turns: Pair<number|null>
}
