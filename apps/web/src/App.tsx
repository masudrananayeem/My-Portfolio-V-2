import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { initSmoothScroll, destroySmoothScroll } from "./lib/lenis";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Experience } from "./pages/Experience";
import { Skills } from "./pages/Skills";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Research } from "./pages/Research";
import { Articles } from "./pages/Articles";
import { ArticleDetail } from "./pages/ArticleDetail";
import { Github } from "./pages/Github";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
export function App(){const[loading,setLoading]=useState(true);useEffect(()=>{initSmoothScroll();return()=>destroySmoothScroll()},[]);return <>{loading&&<LoadingScreen onDone={()=>setLoading(false)}/>}<Routes><Route element={<Layout/>}><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/experience" element={<Experience/>}/><Route path="/skills" element={<Skills/>}/><Route path="/projects" element={<Projects/>}/><Route path="/projects/:slug" element={<ProjectDetail/>}/><Route path="/research" element={<Research/>}/><Route path="/articles" element={<Articles/>}/><Route path="/articles/:slug" element={<ArticleDetail/>}/><Route path="/github" element={<Github/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Route></Routes></>}
