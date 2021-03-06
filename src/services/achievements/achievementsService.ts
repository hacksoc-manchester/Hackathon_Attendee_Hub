import { Achievement, LocalAchievementsRepository } from '../../util/achievements';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';

export interface AchievementsServiceInterface {
	getAchievements: () => Promise<Achievement[]>;
	getAchievementWithId: (id: number) => Promise<Achievement>;
}

@injectable()
export class AchievementsService implements AchievementsServiceInterface {
	private readonly _achievementsRepository: LocalAchievementsRepository;

	public constructor(@inject(TYPES.LocalAchievementsRepository) achievementsRepository: LocalAchievementsRepository) {
		this._achievementsRepository = achievementsRepository;
	}

	/**
   * Returns all achievements
   */
	public getAchievements = (): Promise<Achievement[]> => this._achievementsRepository.getAll();

	/**
   * Returns an achievement with the given id.
   * Throws error if no achievement with given id can be found
   * @param id The id of the achievement to search for
   */
	public getAchievementWithId = (id: number): Promise<Achievement> => this._achievementsRepository.findOne(id);
}
