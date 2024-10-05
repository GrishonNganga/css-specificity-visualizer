'use client';
import { Braces } from "lucide-react";
import { Title } from "./title";
import {CodeEditor} from "./code-editor";
import { globalStore } from "@/store/global";

const JavascriptContainer = () => {
  const js = globalStore(state=>state.js)
  const updateJs = globalStore(state=>state.updateJs)

  return <div className="w-full h-full ">
        <Title icon={<Braces/>} color="text-yellow-400">Javascript</Title>
    <CodeEditor value={js} onChangeHandler={updateJs} language="javascript"/>

  </div>;
};

export default JavascriptContainer;
