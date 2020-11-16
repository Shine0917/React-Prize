import React, { useState, useEffect, useRef } from "react";

import "./App.css";

const RowItem = (props) => {
  const { content, activedId } = props;
  return (
    <div
      className={
        activedId === content ? "row__item row__item-active" : "row__item"
      }
      id={`row_item_${content}`}
    >
      {content}
    </div>
  );
};

export default function App() {
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  // 被选中的格子的ID
  // activedId: '',
  // // 中奖ID
  // prizeId: null,
  // // 获得prizeId之后计算出的动画次数
  // times: 0,
  // // 当前动画次数
  // actTimes: 0,
  // // 是否正在抽奖
  // isRolling: false
  const [prizelist, setPrizeList] = useState(list);
  const [activedId, setActivedId] = useState("");
  const [prizeId, setPrizeId] = useState(null);
  const [isRolling, setRolling] = useState(false);
  useEffect(() => {
    if (prizeId == null) return;
    let num = 0;
    let actTimes = 0;
    let times = prizelist.length * Math.floor(Math.random() * 5 + 4);
    let timer = setInterval(() => {
      if (num === prizeId && actTimes > times) {
        // 符合上述所有条件时才是中奖的时候，两个ID相同并且动画执行的次数大于(或等于也行)设定的最小次数
        setRolling(false);
        clearInterval(timer);
        timer = null;
        return;
      }
      if (num === 11) {
        num = 0;
        setActivedId(0);
      } else {
        num += 1;
        setActivedId(num);
      }
      actTimes += 1;
    }, 40);
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, [prizeId, prizelist]);

  const handlePlay = () => {
    let prize = Math.floor(Math.random() * 12);
    setActivedId(0);
    setPrizeId(prize);
    console.log(prize);
    // 抽奖正式开始↓↓

    // timeRef.current = setInterval(() => {
    //   let num;

    //   // if (activedId === prizeId && actTimes > times) {
    //   //   // 符合上述所有条件时才是中奖的时候，两个ID相同并且动画执行的次数大于(或等于也行)设定的最小次数
    //   //   clearInterval(timeRef.current);
    //   //   // this.setState({
    //   //   //   isRolling: false
    //   //   // });
    //   //   setRolling(false);
    //   //   return;
    //   // }

    //   // 以下是动画执行时对id的判断
    //   if (activedId === "") {
    //     // num = 0;
    //     // this.setState({
    //     //   activedId: num
    //     // });
    //     setActivedId(0);
    //   } else {
    //     num = activedId;
    //     if (num === 11) {
    //       num = 0;
    //       // this.setState({
    //       //   activedId: num
    //       // });
    //       setActivedId(num);
    //     } else {
    //       num = num + 1;
    //       setActivedId(num);
    //       // this.setState({
    //       //   activedId: num
    //       // });
    //     }
    //   }

    //   setActTimes(actTimes + 1);
    //   // this.setState({
    //   //   actTimes: this.state.actTimes + 1
    //   // });
    // }, 40);
  };
  const handleBegin = () => {
    if (!isRolling) {
      // 点击抽奖之后，我个人做法是将于九宫格有关的状态都还原默认
      // this.setState({
      //   activedId: '',
      //   prizeId: null,
      //   times: 0,
      //   actTimes: 0,
      //   isRolling: true
      // }, () => {
      //   // 状态还原之后才能开始真正的抽奖
      //   this.handlePlay()
      // })

      setActivedId("");
      setPrizeId(null);
      setRolling(true);
      setTimeout(() => {
        handlePlay();
      }, 300);
    }
  };
  return (
    <div className="App">
      <div className="prize">
        <div className="prize__container">
          <div className="container__area">
            <div className="begin__btn" onClick={handleBegin}>
              点击开始
            </div>
            <div className="area__row">
              <RowItem content={list[0]} activedId={activedId} />
              <RowItem content={list[1]} activedId={activedId} />
              <RowItem content={list[2]} activedId={activedId} />
            </div>
            <div className="area__row">
              <RowItem content={list[11]} activedId={activedId} />
              <RowItem content={list[4]} activedId={activedId} />
            </div>
            <div className="area__row">
              <RowItem content={list[10]} activedId={activedId} />
              <RowItem content={list[5]} activedId={activedId} />
            </div>
            <div className="area__row">
              <RowItem content={list[9]} activedId={activedId} />
              <RowItem content={list[8]} activedId={activedId} />
              <RowItem content={list[7]} activedId={activedId} />
              <RowItem content={list[6]} activedId={activedId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
