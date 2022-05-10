import React from "react";
import  {Routes, Route } from 'react-router-dom';
import { LoginProvider } from "./context/LoginProvider";
import { EditPreferences, FilmSwipe, Filters, Home, HowItWorks,
         Login, Randomiser, RandomMatch, Register, StreamingService, 
         UsedPreferences, UserAccount, UserMatch, WaitingRoom, HostWaitingRoom } from './pages';


function App() {

    return (
        <>
        <LoginProvider>
        <div id='app'>
            <main>
            <h1>Just Pick One</h1>
                <Routes>

                    <Route path="/EditPreferences" element={<EditPreferences />}/>
                    <Route path="/FilmSwipe" element={<FilmSwipe />}/>
                    <Route path="/Filters" element={<Filters />}/>
                    <Route path="/" element={<Home />}/>
                    <Route path="/HostWaitingRoom" element={<HostWaitingRoom />}/>
                    <Route path="/HowItWorks" element={<HowItWorks />}/>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Randomiser" element={<Randomiser />}/>
                    <Route path="/RandomMatch" element={<RandomMatch />}/>
                    <Route path="/Register" element={<Register />} />
                    <Route path="/StreamingService" element={<StreamingService />}/>
                    <Route path="/UsedPreferences" element={<UsedPreferences />}/>
                    <Route path="/UserAccount" element={<UserAccount />}/>
                    <Route path="/UserMatch" element={<UserMatch />}/>
                    <Route path="/WaitingRoom" element={<WaitingRoom />}/>

                </Routes>
            </main>
        </div>
        </LoginProvider>
        </>
    )
};

export default App;