import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminLayout } from "./components/layout/AdminLayout";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ProjectsAdmin } from "./pages/Projects";
import { MessagesAdmin } from "./pages/Messages";
import { ProfileAdmin } from "./pages/Profile";
import { AboutAdmin } from "./pages/About";
import { SkillsAdmin } from "./pages/Skills";
import { TechStackAdmin } from "./pages/TechStack";
import { ExperienceAdmin } from "./pages/Experience";
import { ResearchAdmin } from "./pages/Research";
import { ArticlesAdmin } from "./pages/Articles";
import { GithubSettingsAdmin } from "./pages/GithubSettings";
import { MediaAdmin } from "./pages/Media";
import { ResumeAdmin } from "./pages/Resume";
import { SettingsAdmin } from "./pages/Settings";

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<ProfileAdmin />} />
            <Route path="/about" element={<AboutAdmin />} />
            <Route path="/skills" element={<SkillsAdmin />} />
            <Route path="/tech-stack" element={<TechStackAdmin />} />
            <Route path="/experience" element={<ExperienceAdmin />} />
            <Route path="/projects" element={<ProjectsAdmin />} />
            <Route path="/research" element={<ResearchAdmin />} />
            <Route path="/articles" element={<ArticlesAdmin />} />
            <Route path="/github" element={<GithubSettingsAdmin />} />
            <Route path="/messages" element={<MessagesAdmin />} />
            <Route path="/media" element={<MediaAdmin />} />
            <Route path="/resume" element={<ResumeAdmin />} />
            <Route path="/settings" element={<SettingsAdmin />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
