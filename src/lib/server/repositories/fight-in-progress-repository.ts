import type { FightInProgress } from '../models/fight-in-progress';

export class FightInProgressRepository {
    private static storage: Map<string, FightInProgress> = new Map<string, FightInProgress>();

    async get(id: string): Promise<FightInProgress | null> {
        return FightInProgressRepository.storage.get(id) ?? null;
    }

    async save(fightInProgress: FightInProgress): Promise<void> {
        FightInProgressRepository.storage.set(fightInProgress.id, fightInProgress);
    }

    async delete(fightInProgress: FightInProgress): Promise<void> {
        FightInProgressRepository.storage.delete(fightInProgress.id);
    }
}
