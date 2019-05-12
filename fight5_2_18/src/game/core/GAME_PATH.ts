module game {
	export class GAME_PATH {
		public static TYPE_JPG: String = '.jpg';
		public static TYPE_PNG: string = '.png';
		public static TYPE_JSON: string = '.json';
	
		protected static BASE_PATH: string = 'resource/';
		// public static ZIP: string = GAME_PATH.BASE_PATH + 'config.zip';
		public static CONFIG: string = GAME_PATH.BASE_PATH + 'config/';
		public static MAP_PATH: string = GAME_PATH.BASE_PATH + 'map/';
		public static WALL_PATH: string = GAME_PATH.BASE_PATH + 'wall/';
		public static MOVIE_PLAYER_PATH: string = GAME_PATH.BASE_PATH + 'movie/player/';
		public static MOVIE_MONSTER_PATH: string = GAME_PATH.BASE_PATH + 'movie/monster/';
		public static MOVIE_BULLET_PATH: string = GAME_PATH.BASE_PATH + 'movie/bullet/';
		public static MOVIE_EFFECT_PATH: string = GAME_PATH.BASE_PATH + 'movie/effect/';  
	}
}