import React, { AnchorHTMLAttributes, MouseEvent, forwardRef, startTransition } from 'react';

interface TransitionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  replace?: boolean;
  state?: Record<string, unknown>;
  reloadDocument?: boolean;
}

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(function TransitionLink(
  { onClick, reloadDocument, replace, state, target, to, ...rest },
  ref,
) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      reloadDocument ||
      event.button !== 0 ||
      isModifiedEvent(event) ||
      (target && target !== '_self')
    ) {
      return;
    }

    event.preventDefault();
    startTransition(() => {
      if (typeof window === 'undefined') {
        return;
      }

      const nextUrl = new URL(to, window.location.href);
      const historyState = state ? { ...window.history.state, usr: state, key: Date.now().toString(36) } : window.history.state;

      if (replace) {
        window.history.replaceState(historyState, '', nextUrl);
      } else {
        window.history.pushState(historyState, '', nextUrl);
      }

      window.dispatchEvent(new PopStateEvent('popstate', { state: historyState }));
    });
  };

  return (
    <a
      {...rest}
      ref={ref}
      href={to}
      target={target}
      onClick={handleClick}
    />
  );
});

export default TransitionLink;
