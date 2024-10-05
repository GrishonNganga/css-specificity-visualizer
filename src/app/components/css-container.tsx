'use client';
import { Asterisk } from "lucide-react";
import {Title} from "./title";
import {CodeEditor} from "./code-editor";
import { globalStore } from "@/store/global";

const CSSContainer = () => {

  const css = globalStore(state=>state.css)
const updateCss = globalStore(state=>state.updateCss)

  return <div className="w-full h-full ">
    <Title icon={<Asterisk/>} color="text-blue-500">CSS</Title>
    <CodeEditor value={css} onChangeHandler={updateCss} language="css"/>
  </div>;
};

export default CSSContainer;
