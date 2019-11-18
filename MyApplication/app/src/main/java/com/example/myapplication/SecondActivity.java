package com.example.myapplication;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.widget.ImageView;

import honghuangyishoulu.R;

import java.util.Timer;

public class SecondActivity extends Activity{

    private ImageView bgWarning;
    private Timer timer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // TODO Auto-generated method stub
        super.onCreate(savedInstanceState);
        setContentView(R.layout.second);
        System.out.println("SecondActivity-onCreate");
        findView();
    }

    private void findView() {
        bgWarning = findViewById(R.id.bgWarning);
        showWarning();
    }

    public void showWarning(){
        /**
         * @param fromAlpha 开始的透明度，取值是0.0f~1.0f，0.0f表示完全透明， 1.0f表示和原来一样
         * @param toAlpha 结束的透明度，同上
         */
        AlphaAnimation anime = new AlphaAnimation(0.0f, 1.0f);
        //设置动画持续时长
        anime.setDuration(3000);
        //设置动画结束之后的状态是否是动画的最终状态，true，表示是保持动画结束时的最终状态
        anime.setFillAfter(true);
        //设置动画结束之后的状态是否是动画开始时的状态，true，表示是保持动画开始时的状态
        anime.setFillBefore(false);
        anime.setAnimationListener(new Animation.AnimationListener() {
               @Override
               public void onAnimationStart(Animation animation) {
               }

               @Override
               public void onAnimationEnd(Animation animation) {
                   hideWarning();
               }

               @Override
               public void onAnimationRepeat(Animation animation) {
               }
           }
        );
        bgWarning.startAnimation(anime);
    }


    public void hideWarning(){
        /**
         * @param fromAlpha 开始的透明度，取值是0.0f~1.0f，0.0f表示完全透明， 1.0f表示和原来一样
         * @param toAlpha 结束的透明度，同上
         */
        AlphaAnimation anime = new AlphaAnimation(1.0f, 0.0f);
        //设置动画持续时长
        anime.setDuration(3000);
        //设置动画结束之后的状态是否是动画的最终状态，true，表示是保持动画结束时的最终状态
        anime.setFillAfter(true);
        //设置动画结束之后的状态是否是动画开始时的状态，true，表示是保持动画开始时的状态
        anime.setFillBefore(false);
        anime.setAnimationListener(new Animation.AnimationListener() {
               @Override
               public void onAnimationStart(Animation animation) {
               }

               @Override
               public void onAnimationEnd(Animation animation) {
                   gotoMainActivity();
               }

               @Override
               public void onAnimationRepeat(Animation animation) {
               }
           }
        );
        //设置动画的重复模式：反转REVERSE和重新开始RESTART
//        alphaAnimation.setRepeatMode(AlphaAnimation.REVERSE);
        //设置动画播放次数
//        alphaAnimation.setRepeatCount(AlphaAnimation.INFINITE);
        //开始动画
        bgWarning.startAnimation(anime);
        //清除动画
//        mIvImg.clearAnimation();
        //同样cancel()也能取消掉动画
//        alphaAnimation.cancel();
    }

    @Override
    protected void onStart() {
        super.onStart();
        System.out.println("SecondActivity-onStart");
    }

    @Override
    protected void onResume() {
        super.onResume();
        System.out.println("SecondActivity-onResume");
    }

    @Override
    protected void onPause() {
        super.onPause();
        System.out.println("SecondActivity-onPause");
    }

    @Override
    protected void onStop() {
        super.onStop();
        System.out.println("SecondActivity-onStop");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        System.out.println("SecondActivity-onRestart");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        System.out.println("SecondActivity-onDestroy");
    }

    /*通过这个方法跳转到SecondActivity界面 */
    public void gotoMainActivity(){
        //创建一个意图
        Intent intent = new Intent(SecondActivity.this,MainActivity.class);
        startActivity(intent);
        finish();//结束当前的Activity
        //如果没有上面的finish()，那么当跳转到MainActivity之后，SecondActivity只会onStop,不会ondestroy。即仍然还在栈中
        //需要注意的是，当它跳到MainActivity时，会去重新创建一个新的MainActivity，即执行MainActivity中的onCreate()方法;
    }

}
