﻿module egret{
    /**
     * 战斗数据层
     */
    export class FightData{
        //伤害数据数组缓存
        private _damageCache:Array<any> = [];
        //伤害数据对象缓存
        private _damageItemCache:Array<DamageDataItem> = [];

        public constructor(){

        }
        //
        /**
         * 回收伤害数据对象缓存
         * @param damageValues 伤害数据
         */
        public recoverDamage(damageValues:Array<DamageDataItem>):void{
            for(var i in damageValues){
                this._damageItemCache.push(damageValues[i]);
            }
            this._damageCache.push(damageValues);
        }
        //
        /**
         * 获取伤害数据数组缓存
         * @returns {Array<DamageDataItem>}
         */
        public getDamageCache():Array<DamageDataItem>{
            var array:Array<DamageDataItem> = this._damageCache.pop();
            if(array)
                array.length = 0;
            else
                array = [];

            return array;
        }
        //
        /**
         * 获取伤害数据对象缓存
         * @returns {DamageDataItem}
         */
        public getDamageItemCache():DamageDataItem{
            var item:DamageDataItem = this._damageItemCache.pop();
            if(item)
                item.clear();
            else
                item = new egret.DamageDataItem();
            return item;
        }
        //
        /**
         * 计算伤害数据
         * @param target 技能释放者数据
         * @param skillType 技能类型
         * @param armies 敌人数据
         * @returns {Object}
         */
        public damage(target:SceneElementDataItem,skillType:number,armies:Array<SceneElementDataItem>):Array<DamageDataItem>{
            var damageValues:Array<DamageDataItem> = this.getDamageBySkillType(target,skillType,armies);
            this.addHp(armies,damageValues);

            return damageValues;
        }
        //
        /**
         * 根据技能获取伤害值
         * @param target 技能释放者数据
         * @param skillType 技能类型
         * @param armies 敌人数据
         * @returns {Array<DamageDataItem>}
         */
        public getDamageBySkillType(target:SceneElementDataItem,skillType:number,armies:Array<SceneElementDataItem>):Array<DamageDataItem>{
            var damageValues:Array<DamageDataItem> = this.getDamageCache();

            switch (skillType){
                //普攻
                case SkillType.WARRIOR_NORMAL:
                case SkillType.MAGE_NORMAL:
                case SkillType.BOWMAN_NORMAL:
                    for(var i  in armies){
                        var item:DamageDataItem = this.getDamageItemCache();
                        item.value = -200;
                        item.isCritical = Math.random() > 0.5;
                        if(item.isCritical)
                            item.value *= 2;

                        item.isDodge = Math.random() > 0.9;

                        damageValues.push(item);
                    }
                    break;
                //战士
                case SkillType.WARRIOR_CISHA:
                    for(var i  in armies){
                        var item:DamageDataItem = this.getDamageItemCache();
                        item.value = -300;
                        item.isCritical = Math.random() > 0.5;
                        if(item.isCritical)
                            item.value *= 1.38;

                        item.value = Math.floor(item.value);

                        item.isDodge = Math.random() > 0.9;

                        damageValues.push(item);
                    }
                    break;
                case SkillType.WARRIOR_ZHANHUN:
                    for(var i  in armies){
                        var item:DamageDataItem = this.getDamageItemCache();
                        item.value = -300;
                        item.isCritical = Math.random() > 0.5;
                        if(item.isCritical)
                            item.value *= 0.77;

                        item.value = Math.floor(item.value);

                        item.isDodge = Math.random() > 0.9;

                        damageValues.push(item);
                    }
                    break;
                case SkillType.WARRIOR_COLLIDE:
                    for(var i  in armies){
                        var item:DamageDataItem = this.getDamageItemCache();
                        item.value = -300;
                        item.isCritical = Math.random() > 0.5;
                        if(item.isCritical)
                            item.value *= 3.8;

                        item.value = Math.floor(item.value);

                        item.isDodge = Math.random() > 0.9;

                        damageValues.push(item);
                    }
                    break;
                case SkillType.WARRIOR_LIEHUO:
                    for(var i  in armies){
                        var item:DamageDataItem = this.getDamageItemCache();
                        item.value = -300;
                        item.isCritical = Math.random() > 0.5;
                        if(item.isCritical)
                            item.value *= 5.84;

                        item.value = Math.floor(item.value);

                        item.isDodge = Math.random() > 0.9;

                        damageValues.push(item);
                    }
                    break;
                //法师
                case SkillType.MAGE_THUNDER:
                    for(var i  in armies){
                        var item:DamageDataItem = this.getDamageItemCache();
                        item.value = -300;
                        item.isCritical = Math.random() > 0.5;
                        if(item.isCritical)
                            item.value *= 1.38;

                        item.value = Math.floor(item.value);

                        item.isDodge = Math.random() > 0.9;

                        damageValues.push(item);
                    }
                case SkillType.MAGE_THUNDER_BACK:
                    for(var i  in armies){
                        var item:DamageDataItem = this.getDamageItemCache();
                        item.value = -300;
                        item.isCritical = Math.random() > 0.5;
                        if(item.isCritical)
                            item.value *= 0.7;

                        item.value = Math.floor(item.value);

                        item.isDodge = Math.random() > 0.9;

                        damageValues.push(item);
                    }
                case SkillType.MAGE_XUANBING:
                    for(var i  in armies){
                        var item:DamageDataItem = this.getDamageItemCache();
                        item.value = -300;
                        item.isCritical = Math.random() > 0.5;
                        if(item.isCritical)
                            item.value *= 0.8;

                        item.value = Math.floor(item.value);

                        item.isDodge = Math.random() > 0.9;

                        damageValues.push(item);
                    }
                    break;
                //无技能，或者怪物普攻
                default :
                    for(var i  in armies){
                        var item:DamageDataItem = this.getDamageItemCache();
                        item.value = -100;
                        item.isCritical = Math.random() > 0.5;
                        if(item.isCritical)
                            item.value *= 2;

                        item.isDodge = Math.random() > 0.9;

                        damageValues.push(item);
                    }
                    break;
            }

            return damageValues;
        }
        //
        /**
         * 增加或减少血量
         * @param armies  敌人数据
         * @param damageValues 伤害数据
         * @returns {any}
         */
        public addHp(armies:Array<SceneElementDataItem>,damageValues:Array<DamageDataItem>):void{
            for(var i in armies){
                var vo:SceneDriverVo = <SceneDriverVo>armies[i].vo;
                if(vo){
                    vo.hp += damageValues[i].value;

                    if(vo.hp < 0) {
                        damageValues[i].value -= vo.hp;

                        vo.hp = 0;
                    }
                }
            }
        }
        //
        /**
         * 获取技能释放间隔时间(单位ms)
         * @param skillType 技能类型
         * @returns {number}
         */
        public getSkillIntervalTime(skillType:number):number{
            switch (skillType){
                //战士
                case SkillType.WARRIOR_CISHA:
                    return 2000;
                    break;
                case SkillType.WARRIOR_ZHANHUN:
                    return 4000;
                    break;
                case SkillType.WARRIOR_COLLIDE:
                    return 6000;
                    break;
                case SkillType.WARRIOR_LIEHUO:
                    return 8000;
                    break;
                //法师
                case SkillType.MAGE_THUNDER:
                    return 2000;
                    break;
                case SkillType.MAGE_THUNDER_BACK:
                    return 8000;
                    break;
                case SkillType.MAGE_JINGAN:
                    return 6000;
                    break;
                case SkillType.MAGE_XUANBING:
                    return 8000;
                    break;
                //射手
                case SkillType.BOWMAN_CALL:
                    return 8000;
                    break;
            }

            return 1;
        }
    }
}