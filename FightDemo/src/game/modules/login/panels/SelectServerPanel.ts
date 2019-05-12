module game {
	export class SelectServerPanel extends DLG.VPanel {
		protected main: SelectServerView;
		public serverArr: Array<any> = [];
		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}
		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new SelectServerView();
			self.addChild(self.main);
			self.main.onLoadCallBack = self.initView;
			self.main.onLoadCallTarget = self;
		}
		protected initView(): void {
			super.initView();
			let self = this;
			SelectBtnItem.onCallTarget = self;
			SelectBtnItem.onCallBack = self.onSelectClick;
			self.serverArr = LoginManager.getInstance().getServerData();
			self.setCloseBtn(self.main.btn_close);
			self.main.serverList.itemRenderer = SelectServerItem;
			self.main.selectList.itemRenderer = SelectBtnItem;
			self.main.selectList.selectedIndex = 0;
			self.onSelectClick();
		}

		// public onRefresh(): void {
			// super.onRefresh();
		public renderViews():void{
			let self = this;
			let serverArray: Array<string> = ["最近登录", "火爆新区"];
			let len: number = Math.ceil(self.serverArr.length / 10);
			for (var i = 0; i < len; i++) {
				serverArray.push(i + "1" + "-" + ((i + 1) * 10) + "区");
			}
			self.main.selectList.dataProvider = new eui.ArrayCollection(serverArray);
		}


		/**选区按钮的回调 */
		protected onSelectClick(): void {
			let self = this;
			let svrList: any[] = [];
			switch (self.main.selectList.selectedIndex) {
				case 0:

					break;
				case 1:
					if (self.serverArr.length <= 4) {
						svrList = self.serverArr;
					} else {
						svrList = self.serverArr.slice(self.serverArr.length - 3, self.serverArr.length);
					}
					break;
				default:
					let len = self.serverArr.length;
					let starNum = (self.main.selectList.selectedIndex - 2) * 10;
					let endNum;
					if (len > starNum + 10) {
						endNum = starNum + 10;
					} else {
						endNum = len;
					}
					svrList = self.serverArr.slice(starNum, endNum);
					break;
			}
			self.main.serverList.dataProvider = new eui.ArrayCollection(svrList);
		}

		public onDestroy(): void {
			super.onDestroy();
			let self = this;
			if (self.main) {
				self.main.onLoadCallBack = undefined;
				self.main.onLoadCallTarget = undefined;
				self.main.onDestroy();
			}
			self.main = undefined;
		}
	}
}