import type { FightRequest } from '../domain/fight-request';

// simple in-memory map


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
