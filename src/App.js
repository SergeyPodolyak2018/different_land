import React, {useState, useEffect} from 'react';
import {Route, useLocation} from "react-router-dom";
import {translate} from "react-i18next";
import i18n from "./i18n"
import MetaTags from 'react-meta-tags';

import getWindowMode from "./utils/windowMode";
import getLanguage from "./utils/getLanguage";
import './App.css';
import ScrollToTop from "./components/scrollToTop/scrollToTop";

import {
    Explanation,
    Author,
    Projects,
    Activity,
    Footer,
    AboutUsArchive,
    AboutUsContacts,
    AboutUsFounder,
    AboutUsOnMap,
    AboutUsPreview,
    AboutUsWhoWeAre,
    Share,
    Slider,
    EventsCardContainer,
    EventsMain,
    OnlineProjects,
    Zaglushka,
    Delimiter,
    Header,
    MainIdea,
    FadeInSection
} from './components'

import {
    mainData,
    header,
    seoData,
    zaglushka,
    onlineProjects,
    eventsPastMain,
    eventsPast,
    eventsFutureMain,
    share,
    slider,
    aboutUsArchive,
    aboutUsContacts,
    aboutUsFounder,
    aboutUsOnMap,
    aboutUsWhoWeAre,
    aboutUsPreview,
    explanation,
    author,
    projects,
    activity,
    footer
} from './data/index'

function App({t}) {
    const location = useLocation();
    const mode = useWindowSize().mode;
    const language = getLanguage();

    useEffect(() => {
        let lng = getLanguage();
        i18n.changeLanguage(lng);
    }, [location]);

    function getMeetaTags(data) {
        return (
            <MetaTags>
                <title>{t(data.title)}</title>
                <meta name="description" content={t(data.description)}/>
                <meta name="keywords" content={t(data.keywords)}/>
            </MetaTags>
        )
    }

    return (
        <div className="App">
            <Header menuButtons={header} pathname={location.pathname} language={getLanguage()} mode={mode}/>
            <Share mode={mode} content={share} language={getLanguage()} pathname={location.pathname}/>
            <ScrollToTop location={location}>
                <Route exact path="/">
                    {getMeetaTags(seoData.mainPage)}
                    <MainIdea data={mainData} mode={mode}/>
                    <FadeInSection><Explanation mode={mode} content={explanation}/></FadeInSection>
                    <FadeInSection><Author mode={mode} content={author}/></FadeInSection>
                    <FadeInSection><Projects mode={mode} content={projects}/></FadeInSection>
                    <FadeInSection><Activity mode={mode} content={activity}/></FadeInSection>
                </Route>
                <Route exact path="/about">
                    {getMeetaTags(seoData.aboutUsPage)}
                    <AboutUsPreview mode={mode} data={aboutUsPreview}/>
                    <FadeInSection><AboutUsWhoWeAre mode={mode} content={aboutUsWhoWeAre}/></FadeInSection>
                    <FadeInSection><AboutUsOnMap mode={mode} content={aboutUsOnMap}/></FadeInSection>
                    <FadeInSection><AboutUsArchive mode={mode} content={aboutUsArchive}/></FadeInSection>
                    <FadeInSection><AboutUsFounder mode={mode} content={aboutUsFounder}/></FadeInSection>
                    <FadeInSection><AboutUsContacts mode={mode} content={aboutUsContacts}/></FadeInSection>
                </Route>
                <Route strict path="/events/">
                    {getMeetaTags(seoData.eventsPage)}
                    <Slider pathname={location.pathname} mode={mode} data={slider}/>
                    <Route strict path="/events/past">
                        <EventsMain mode={mode} content={eventsPastMain} language={language}/>
                        <Delimiter/>
                        <FadeInSection><EventsCardContainer mode={mode} content={eventsPast}/></FadeInSection>
                    </Route>
                    <Route strict path="/events/future">
                        <EventsMain mode={mode} content={eventsFutureMain} language={language}/>
                    </Route>
                </Route>
                <Route exact path="/online_project">
                    {getMeetaTags(seoData.onlineProjectsPage)}
                    <OnlineProjects mode={mode} data={onlineProjects}/>
                </Route>
                <Route exact path="/podcast">
                    {getMeetaTags(seoData.podcastPage)}
                    <Zaglushka mode={mode} data={zaglushka} language={language}/>
                </Route>
            </ScrollToTop>
            <Footer mode={mode} menu={header} contacts={footer} language={language}/>
        </div>
    );
}

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        mode: getWindowMode()
    });

    useEffect(() => {
        let lastMode;

        // Handler to call on window resize
        function handleResize() {
            const mode = getWindowMode();
            if (mode !== lastMode) {
                lastMode = mode;
                setWindowSize({mode});
            }
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}

export default translate("translation")(App);
