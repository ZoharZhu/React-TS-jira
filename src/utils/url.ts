import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from ".";

// 返回页面url中，指定键的参数值
export const useURLQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    // 使用subset的写法：
    // useMemo(
    //   () =>
    //     subset(Object.fromEntries(searchParams), stateKeys) as {
    //       [key in K]: string;
    //     },
    //   [searchParams, stateKeys]
    // ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const;
};
