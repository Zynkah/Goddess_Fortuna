import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ContextProvider } from "./contexts/ContextProvider";
import { AppBar } from "./components/AppBar";
import { ContentContainer } from "./components/AppBar/ContentContainer";
import { Footer } from "./components/Footer";
import NotificationList from "./components/Notification";

// Import views
import { FortuneView } from "./views/fortune";
import { ParticlesBackground } from "./components/ParticlesBackground";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"


function App() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Helmet>
        <title>Goddess Fortuna</title>
        <meta
          name="description"
          content="Ask the Goddess a question and let her flip a coin for your fate"
        />
      </Helmet>

      <ContextProvider>
        <div className="flex flex-col page">
          <ParticlesBackground />
          <NotificationList />
          <AppBar />
          <ContentContainer>
            <Routes>
              <Route path="/" element={<FortuneView />} />
              <Route path="/fortune" element={<FortuneView />} />
            </Routes>
          </ContentContainer>
          <Footer />
        </div>
      </ContextProvider>
    </>
  );
}

export default App;
