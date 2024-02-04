import { Routes, Route, Navigate} from 'react-router-dom';

import {New} from '../pages/New';
import{Home} from '../pages/Detail/Home'
import { Profile } from '../pages/Profile';
import{Details}  from '../pages/Detail';

export function AppRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details/:id" element={<Details />} />

        <Route path = "*" element={<Navigate to="/"/>}/>
      </Routes>
    )
  }