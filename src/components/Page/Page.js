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
                    <h3>方法</h3>
                    <span>サーバにアップロードして、URLを知って、インターネットに繋がっている端末で簡単に確認ができます。無料にサイトをアップロードするサービスがあります。</span>
                </div>
            </div>
            <div className='page__footer'>ありがとうございました</div>
        </div>
    );
}

export default Page;
