import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';

type LanguageType = 'html' | 'css' | 'javascript';

export const CodeEditor = ({ value, onChangeHandler, language }: {value:string, onChangeHandler: (e: string) => void, language: LanguageType}) => {
  return (
    <div className="w-full h-full">
      <Editor
      className='w-full h-full'
      value={ value}
      onValueChange={code => onChangeHandler(code)}
      highlight={code => highlight(code, languages[language], language)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
    </div>
  );
};