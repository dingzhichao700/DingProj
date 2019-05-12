module DLG {
    export class DLGConfig {

        public static grayMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        //灰色特效
        public static grayColorFlilter = new egret.ColorMatrixFilter(DLGConfig.grayMatrix);
        private static lightmat = [ 1,0,0,0,150,
                  0,1,0,0,150,
                  0,0,1,0,150,
            0, 0, 0, 1, 0];
        //白色变亮特效
		public static lightColorFlilter:egret.ColorMatrixFilter = new egret.ColorMatrixFilter(DLGConfig.lightmat);
    }
}