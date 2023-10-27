import type { FightRequest } from '../models/fight-request';

export class FightRequestRepository {
    private static data: Record<string, FightRequest>;

    getById(id: string): FightRequest | null {
        return FightRequestRepository.data[id] ?? null;
    }

    save(fightRequest: FightRequest): void {
        FightRequestRepository.data[fightRequest.id] = fightRequest;

    }

    delete(id: string): void {
        delete FightRequestRepository.data[id];
    }
}
