import RBNavLink from 'react-bootstrap/NavLink';
import { useRouter } from 'next/router';
import NLink from 'next/link';

import { buildClassNames } from 'utils/classnames';

export const getPaths = (asPath) => {
  const [slashPath, query] = decodeURIComponent(asPath).split('?');
  const pathname = slashPath.replace(/\/$/, '');
  const href = query ? [pathname, query].join('?') : pathname;

  return [href, pathname, query];
};

export const Link = ({ children, className, ...props }) => {
  return (
    <NLink {...props}>
      <a className={className}>{children}</a>
    </NLink>
  );
};

export const NavLink = ({ children, className, activeClassName, ...props }) => {
  const { asPath } = useRouter();
  // this is to check that paths match based on the trailing slash config
  const [href] = getPaths(asPath);

  const classes =
    href === props.href || href === props.as
      ? buildClassNames(className, activeClassName) || 'active'
      : className;

  return (
    <NLink {...props} passHref>
      <RBNavLink className={classes}>{children}</RBNavLink>
    </NLink>
  );
};
