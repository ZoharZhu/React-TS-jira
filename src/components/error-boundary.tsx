import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// React.Component<P, S> {}
// export class ErrorBoundary extends React.Component<{children: ReactNode, fallBackRender: FallBackRender}, ...> {}
// 带有children的建议写法 用Ultility Type：
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 当子组件抛出异常 这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return <div>{children}</div>;
  }
}
