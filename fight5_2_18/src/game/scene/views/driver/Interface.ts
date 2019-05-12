module game {
	export
		interface IDriver {

		x: number;
		y: number;
		visible: boolean;
		touchEnabled: boolean;
		stage: egret.Stage;
		readonly parent: egret.DisplayObjectContainer;

		// init(id:number): void;
		// setBodySkin(movieName: string): void
		nextFrame(): void
		stand(): void;
		attack(skillId: number, px: number, py: number,monsterNotHit?:number): void;
		isAttack(): boolean;
		run(): void;
		move(): void;
		getData(): DriverData
		setData(value: DriverData): void;
		update(): void;

		clear(): void;
	}
}