import React from 'react';

import styles from './index.module.scss';

function ErrorPage(props: {
  children?:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  return (
    <div>
      {props?.children ? (
        props.children
      ) : (
        <div className={styles.errorPage}>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>{props?.children}</p>
        </div>
      )}
    </div>
  );
}

export default ErrorPage;
