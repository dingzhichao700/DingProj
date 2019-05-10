class LoaderManager {

	private static _ins:LoaderManager;
	public static get ins():LoaderManager {
		if(!LoaderManager._ins){
			LoaderManager._ins = new LoaderManager();
		}
		return LoaderManager._ins;
	}

	public constructor() {
	}

}