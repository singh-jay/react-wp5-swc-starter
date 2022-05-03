import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
// import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.scss';
import App from './App';
const Lazy = React.lazy(() => import('./components/Lazy'));

// React 17

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="Lazy"
          element={
            <Suspense fallback={<>...</>}>
              <Lazy />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// React 18

// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route
//         path="Lazy"
//         element={
//           <Suspense fallback={<>...</>}>
//             <Lazy />
//           </Suspense>
//         }
//       />
//     </Routes>
//   </BrowserRouter>
// );
