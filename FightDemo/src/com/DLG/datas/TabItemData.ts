
module DLG {
	export class TabItemData {
		public label: string;
		public color: string;
		public strokeColor: string;
		public stroke: number;
		public data: any;

		public onDestroy(): void {
			this.label = null;
			this.color = null;
			this.strokeColor = null;
			this.data = null;
		}
	}
}