import { useEffect, useState } from "react";
import { useMount } from "../utils";

// react hook 与 闭包 经典的坑
export const Test = () => {
  const [num, setNum] = useState(0);
  const add = () => setNum(num + 1);

  // useMount(() => {
  //   setInterval(() => {
  //     console.log('num in setInterval', num);  // 不管怎么加 打印都是0
  //   }, 1000)
  // })

  // useEffect(() => {
  //   return () => {
  //     console.log(num);  // 不管怎么加 打印都是0
  //   }
  // }, [])

  useEffect(() => {
    const id = setInterval(() => {
      console.log("num in setInterval", num);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [num]);

  useEffect(() => {
    return () => {
      console.log(num);
    };
  }, [num]);

  return (
    <div>
      <button onClick={add}>add</button>
      <p>number: {num}</p>
    </div>
  );
};
