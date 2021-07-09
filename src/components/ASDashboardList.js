import React from 'react';

import './css/ASDashboardList.css';

function ASDashboardList(props) {
  const {headers, setSorter} = props;

  return (
    <div className="dashboard-list">
      <table>
        <thead>
          <tr className="table-header">
            {headers.map((header, idx) => {
              return (
                <th key={idx}>
                  <span>
                    {setSorter ? (
                      header.length > 0 ? (
                        <>
                          <button
                            className={'arrow up'}
                            onClick={(event) => {
                              setSorter(['up', header]);
                            }}
                          >
                            <div></div>
                          </button>
                          {header}
                          <button
                            className={'arrow down'}
                            onClick={(event) => {
                              setSorter(['down', header]);
                            }}
                          >
                            <div></div>
                          </button>
                        </>
                      ) : (
                        <>{header}</>
                      )
                    ) : (
                      <>{header}</>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
}

export default ASDashboardList;
