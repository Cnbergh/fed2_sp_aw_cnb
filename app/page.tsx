"use client"

import { Nav } from "./components";

export default function App() {
  return (
    <main>
      <div data-router-wrapper>
        <div data-router-view>
          <Nav />
{/*           <Component {...pageProps} /> */}
        </div>
      </div>
    </main>
  );
}