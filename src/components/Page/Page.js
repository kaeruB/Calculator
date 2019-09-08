import React from 'react';
import Calculator from '../Calculator/Calculator';
import RotationCounter from "../Rotation/RotationCounter";

function Page() {
    return (
        <div className='page__container flex-column-center'>
            <div className='page__header flex-column-center'>
                <h1>南国ソフト</h1>
                <h2>課題の成果物</h2>
                <span>作者：Agata Bogacz</span>
            </div>
            <div className='page__calculator-section flex-column-center'>
                <h2 className='secondary-heading'>課題1</h2>
                <span className='tertiary-heading'>電卓</span>
                <Calculator/>
            </div>
            <div className='page__rotate-section flex-column-center'>
                <h2 className='secondary-heading'>課題2</h2>
                <span className='tertiary-heading'>関数 rotate()</span>
                <RotationCounter/>
            </div>
            <div className='page__test-section flex-column-center'>
                <h2 className='secondary-heading'>課題3</h2>
                <span className='tertiary-heading'>電卓の確認する方法</span>
                <div className='test-section flex-column-center'>
                    <h3>方法１</h3>
                    <span>サーバにアップロードして、URLを知って、インターネットに繋がっている端末で簡単に確認ができます。無料にサイトをアップロードするサービスがあります。</span>
                    <h3>方法2</h3>
                    <span>早くサイトのレイアウトや全体的な恰好を見たいなら、Google ChromeのDevToolsは十分です。あそこに携帯電話やタブレットなど、色々な画面に設定することが可能でございます。それで、Media Queryも簡単に入られます。</span>
                </div>
            </div>
            <div className='page__footer'>ありがとうございました</div>
        </div>
    );
}

export default Page;
