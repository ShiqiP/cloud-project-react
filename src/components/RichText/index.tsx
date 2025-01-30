import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { i18nChangeLanguage } from '@wangeditor/editor'

i18nChangeLanguage('en')

function RichText({ onChange }: { onChange: Function }) {
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // 

    const [html, setHtml] = useState('')


    const toolbarConfig: Partial<IToolbarConfig> = {}

    const editorConfig: Partial<IEditorConfig> = {
        placeholder: 'please...',
    }

    const handleOnChange = (editor) => {
        onChange(editor)
        setHtml(editor.getHtml())
    }

    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={handleOnChange}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
        </>
    )
}

export default RichText