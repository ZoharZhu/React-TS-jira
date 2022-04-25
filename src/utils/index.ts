import { useState, useEffect, useRef } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    if (isVoid(result[key])) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加上callback会造成无限循环 这个和useCallback以及useMemo有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// export const debounce = (func, delay) => {
//   let timer;
//   return function (...args) {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       func.apply(this, args);
//     }, delay);
//   };
// }

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后 设置一个定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 每次在上一个useEffect处理完以后再下一个useEffect中运行（做一些清理工作）
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(array: T[]) => {
  // hello，请把作业写在这里吧，写完记得再对照作业要求检查一下
  const [value, setValue] = useState(array);
  const add = (item: T) => {
    setValue([...value, item]);
  };
  const removeIndex = (idx: number) => {
    const copy = [...value];
    copy.splice(idx, 1);
    setValue(copy);
  };
  const clear = () => {
    setValue([]);
  };
  return { value, setValue, add, removeIndex, clear };
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
