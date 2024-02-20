import React, { Fragment } from 'react';
import JsonView from '@uiw/react-json-view';
import { darkTheme } from '@uiw/react-json-view/dark';
import { githubDarkTheme } from '@uiw/react-json-view/githubDark';
import { vscodeTheme } from '@uiw/react-json-view/vscode';
import { basicTheme } from '@uiw/react-json-view/basic';

const JSONViewer = (props) => {
    const { data } = props

    console.log(data)
    return (
        <Fragment>
            {data &&
                <div className="">
                    <JsonView value={data} keyName="root" style={githubDarkTheme} />
                </div>
            }
            {!data &&
                <div className="d-flex justify-content-center mt-4">
                    <span className="empty-text text-shade700">No JSON data found</span>
                </div>
            }
        </Fragment>
    )
}

export default JSONViewer;