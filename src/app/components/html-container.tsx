'use client';
import {Title} from "./title";
import { CodeXml } from "lucide-react";
import {CodeEditor} from "./code-editor";
import { globalStore } from "@/store/global";

const HtmlContainer = () => {
    const html = globalStore(state=>state.html)
const updateHtml = globalStore(state=>state.updateHtml)

  return <div className="w-full h-full ">
    <Title icon={<CodeXml/>} color="text-red-400">HTML</Title>
    <CodeEditor value={html} onChangeHandler={updateHtml} language="html"/>

  </div>;
};

export default HtmlContainer;
